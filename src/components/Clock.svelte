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

  const MIN_INPUT = 0

  $: inputValue = time as number | null
  $: inputDisabled = isRunning || inputValue === null || inputValue < MIN_INPUT
</script>

<div class="grid justify-items-start gap-2" transition:mountTransition>
  <h2 class="mb-2 text-4xl">{name}</h2>
  <ClockDisplay {time} />

  <!-- Controls -->
  <div class="grid auto-rows-fr gap-1">
    <div class="grid grid-flow-col items-stretch gap-1">
      <button
        class="
          rounded-sm px-4 py-1 text-sm font-medium transition duration-300
          hover:text-neutral-50
          active:scale-[.98] active:outline-neutral-300 active:transition-none
          {!isRunning
          ? 'bg-green-600 hover:bg-green-500'
          : 'bg-red-700 hover:bg-red-600'}"
        on:click={() => toggleTimer(name, isRunning)}
        >{!isRunning ? 'Start' : 'Stop'}</button
      >

      <GrayButton on:click={() => deleteClock(name)}>Delete</GrayButton>
    </div>

    <NumberInput
      min={MIN_INPUT.toString()}
      disabled={isRunning}
      bind:value={inputValue}
    />

    <div class="grid grid-flow-col items-stretch gap-1">
      <GrayButton
        disabled={isRunning}
        on:click={() => modHoursClockTime(name, 1)}>Mod</GrayButton
      >
      <GrayButton
        disabled={inputDisabled}
        on:click={() => {
          if (inputValue !== null) modifyClockTime(name, inputValue)
        }}>Add</GrayButton
      >
      <GrayButton
        disabled={isRunning || inputValue < 0 || inputValue === null}
        on:click={() => {
          if (inputValue !== null) setClockTime(name, inputValue)
        }}>Set</GrayButton
      >
    </div>
  </div>
</div>
