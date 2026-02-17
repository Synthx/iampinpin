import type { Loader } from "astro/loaders";
import fs from "node:fs/promises";
import path from "node:path";

type Options = {
  base: string;
};

export const digitalGardenLoader = (options: Options): Loader => {
  const basePath = path.resolve(options.base);
  let id = 0;

  return {
    name: "digital-garden-loader",
    async load({ store, logger, parseData, generateDigest }): Promise<void> {
      store.clear();

      const files = await fs.readdir(basePath);
      const promises = files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const filePath = path.join(basePath, f);
          const content = await fs.readFile(filePath, "utf-8");
          const rawItems = JSON.parse(content) as Record<string, unknown>[];
          const items = await Promise.all(
            rawItems.map(async (i) => {
              return parseData({
                id: `${i.type}-${++id}`,
                data: i,
              });
            }),
          );

          return items.map((i) => ({
            id: `${i.type}-${++id}`,
            data: i,
          }));
        });

      const entries = (await Promise.all(promises)).flat();
      entries.forEach((e) => {
        store.set({
          id: e.id,
          data: e.data,
          digest: generateDigest(e.data),
        });
      });

      logger.info(`Loaded ${entries.length} items`);
    },
  };
};
