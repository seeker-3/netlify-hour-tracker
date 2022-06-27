<script lang="ts">
  import '@unocss/reset/tailwind.css'
  import 'uno.css'
  import Clock from './components/Clock.svelte'
  import GrayButton from './components/GrayButton.svelte'
  import {
    clockValues,
    createClock,
    updateLocalStorageClocks,
  } from './stores/clocks'
  import { capitalizeString } from './utils/strings'

  let clockName = ''

  const handleCreateNew = () => {
    const capitalizedClockName = capitalizeString(clockName)

    const clockNameAlreadyExists = $clockValues.some(
      ({ name }) => name === capitalizedClockName,
    )

    if (clockNameAlreadyExists) {
      alert('A clock with that name already exists')
      return
    }

    clockName = ''
    createClock(capitalizedClockName)
  }

  $updateLocalStorageClocks

  $: createNewGrayButtonDisabled = clockName === ''
</script>

<main class="mx-auto grid max-w-[60ch] gap-8 p-2">
  <div class="flex items-stretch gap-1">
    <input
      class="grow rounded-sm p-1 text-neutral-900"
      placeholder="Enter a clock name"
      bind:value={clockName}
    />
    <GrayButton
      disabled={createNewGrayButtonDisabled}
      on:click={handleCreateNew}>Create new</GrayButton
    >
  </div>

  <div class="grid gap-8">
    {#each $clockValues as { name, time, isRunning }}
      <Clock {name} {time} {isRunning} />
    {/each}
  </div>
</main>
