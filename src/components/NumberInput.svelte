<script lang="ts">
  export let value: number | null
  export let min: string
  export let disabled = false
</script>

<input
  class="
    rounded-sm pl-2 text-xs text-neutral-900
    disabled:bg-neutral-500"
  type="number"
  {min}
  {disabled}
  bind:value
/>
