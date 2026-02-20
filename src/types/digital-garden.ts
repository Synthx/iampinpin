import { z } from "astro/zod";

const nodeTypes = ["project", "talk", "hobby"] as const;
export const NodeType = z.enum(nodeTypes);
export type NodeType = z.infer<typeof NodeType>;
