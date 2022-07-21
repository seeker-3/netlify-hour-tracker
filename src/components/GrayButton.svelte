<script lang="ts">
  export let disabled = false
</script>

<button
  class="
    rounded-sm bg-neutral-500 px-4 text-sm font-medium transition
    hover:bg-neutral-400 hover:text-neutral-50
    active:scale-[.98] active:outline-neutral-300 active:transition-none
    disabled:bg-neutral-600 disabled:text-neutral-400 disabled:hover:bg-neutral-600
    disabled:hover:text-neutral-400
    disabled:active:scale-100
  "
  {disabled}
  on:click><slot /></button
>
