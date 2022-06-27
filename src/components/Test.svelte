<script lang="ts">
  import { onDestroy } from 'svelte'

  let interval: number | null = null

  const beginTest = () => {
    const startTime = Date.now()
    let previousTime = startTime
    let totalTime = 0

    interval = setInterval(() => {
      const nextTime = Date.now()
      const deltaStart = nextTime - startTime
      const deltaStep = nextTime - previousTime
      previousTime = nextTime
      totalTime += deltaStep
      if (deltaStart === totalTime) {
        console.info('ok')
        return
      }
      console.error('Values did not equal. Difference:', deltaStart, totalTime)
    }, 50)
  }

  const endTest = () => {
    clearInterval(interval)
    interval = null
  }

  onDestroy(() => clearInterval(interval))
</script>

{#if interval === null}
  <button on:click={beginTest}>Begin test</button>
{:else}
  <button on:click={endTest}>End test</button>
{/if}
