<script lang="ts">
    import { formatTime } from "@/functions/date";

    let now = $state(new Date());

    $effect(() => {
        const interval = setInterval(() => {
            now = new Date();
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<time datetime={now.toISOString()}>{formatTime(now)}</time>
