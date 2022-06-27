<script lang="ts">
  import {
    deleteClock,
    modHoursClockTime,
    modifyClockTime,
    setClockTime,
    toggleTimer,
    type Clock,
  } from '../stores/clocks'
  import { mountTransition } from '../utils/transitions'
  import ClockDisplay from './ClockDisplay.svelte'
  import GrayButton from './GrayButton.svelte'
  import NumberInput from './NumberInput.svelte'

  type $$Props = Omit<Clock, 'interval' | 'previousTime'>

  export let name: string
  export let time: number
  export let isRunning: boolean

  const buttons = [
    {
      onclick: modHoursClockTime,
      innerText: 'Mod',
      min: 1,
    },
    {
      onclick: modifyClockTime,
      innerText: 'Add',
      min: 1,
    },
    {
      onclick: setClockTime,
      innerText: 'Set',
      min: 0,
    },
  ]

  let inputValue: number | null = 1
</script>

<div class="grid justify-items-start gap-2" transition:mountTransition>
  <h2 class="mb-2 text-4xl">{name}</h2>
  <ClockDisplay {time} />

  <!-- Controls -->
  <div class="grid auto-rows-fr gap-1">
    <div class="grid grid-flow-col items-stretch gap-1">
      <button
        class="rounded-sm px-4 py-1 text-sm transition duration-300 hover:text-neutral-50 active:scale-[.98] active:outline-neutral-300 {!isRunning
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-red-600 hover:bg-red-700'}"
        on:click={() => toggleTimer(name, isRunning)}
        >{!isRunning ? 'Start' : 'Stop'}</button
      >

      <GrayButton on:click={() => deleteClock(name)}>Delete</GrayButton>
    </div>

    <NumberInput min="0" disabled={isRunning} bind:value={inputValue} />

    <div class="grid grid-flow-col items-stretch gap-1">
      {#each buttons as { onclick, innerText, min }}
        <GrayButton
          disabled={isRunning || inputValue < min || inputValue === null}
          on:click={() => inputValue !== null && onclick(name, inputValue)}
          >{innerText}</GrayButton
        >
      {/each}
    </div>
  </div>
</div>
