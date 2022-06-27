<script lang="ts">
  import { getDisplay } from '../utils/time'

  export let time: number

  $: display = getDisplay(time).join(':')
</script>

<p class="text-2xl">
  {display}
</p>
<!-- <p class="text-2xl">
  {#key hours}<span in:tickTransition>{hours}</span>{/key}:{#key minutes}<span
      in:tickTransition>{minutes}</span
    >{/key}:{#key seconds}<span in:tickTransition>{seconds}</span>{/key}
</p> -->
