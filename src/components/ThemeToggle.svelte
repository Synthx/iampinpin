<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '@/stores/theme';
  import Sun from '@/assets/icons/sun.svelte';
  import Moon from '@/assets/icons/moon.svelte';

  onMount(() => {
    theme.init();
  });

  const Icon = $derived($theme === 'dark' ? Sun : Moon);
</script>

<button
  type="button"
  class="text-body hover:text-heading text-base"
  aria-label="Toggle website theme mode"
  onclick={theme.toggle}
>
  <Icon />
</button>
