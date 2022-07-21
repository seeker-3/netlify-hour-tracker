import { derived, writable } from 'svelte/store'
import { MILLISECONDS_PER_HOUR } from '../utils/time'

const UPDATE_INTERVAL = 500

interface StoredClock {
  name: string
  time: number
}

export interface ClockValues extends StoredClock {}

export interface Clock extends StoredClock {
  interval: number | null
  previousTime?: number
  isRunning: boolean
}

type Clocks = Record<string, Clock>
type StoredClocks = Record<string, Clock>

const clockToStoredClock = ({ name, time }: Clock): StoredClock => ({
  name,
  time,
})

const storedClockToClock = (storedClock: StoredClock): Clock => ({
  ...storedClock,
  interval: null,
  isRunning: false,
})

const defaultValue: StoredClocks = {}

const getInitialValue = () => {
  if (!localStorage.clocks) return defaultValue

  const storedClocks: StoredClocks = JSON.parse(localStorage.clocks)
  const clocks: Clocks = Object.fromEntries(
    Object.values(storedClocks).map(storedClock => [
      storedClock.name,
      storedClockToClock(storedClock),
    ]),
  )

  return clocks
}

const { update, set: _, ...clocks } = writable<Clocks>(getInitialValue())

export default clocks

export const clockValues = derived(
  clocks,
  $clocks => Object.values($clocks), //.map(({ name, time }) => ({ name, time })),
)

const updateClock = (name: string, updater: (clock: Clock) => Clock | void) =>
  update($clocks => {
    const update = updater($clocks[name])
    if (update) $clocks[name] = update
    return $clocks
  })

export const createClock = (name: string) =>
  update($clocks => {
    const newClock = {
      name,
      time: 0,
      interval: null,
      isRunning: false,
    }
    $clocks[name] = newClock
    return $clocks
  })

export const deleteClock = (name: string) => {
  if (window.confirm(`Are you sure you want to delete "${name}"?`))
    update($clocks => {
      delete $clocks[name]
      return $clocks
    })
}

export const modHoursClockTime = (name: string, hours: number) => {
  updateClock(name, clock => {
    clock.time %= MILLISECONDS_PER_HOUR * hours
  })
}

export const setClockTime = (name: string, milliseconds: number) => {
  updateClock(name, clock => {
    clock.time = milliseconds
  })
}

export const modifyClockTime = (name: string, milliseconds: number) => {
  updateClock(name, clock => {
    clock.time += milliseconds
  })
}

export const updateTimer = (name: string) =>
  updateClock(name, clock => {
    if (typeof clock.previousTime !== 'number')
      throw new Error('Clock has no previous time')

    const nextTime = Date.now()
    const deltaTime = nextTime - clock.previousTime
    clock.time += deltaTime

    clock.previousTime = nextTime
  })

export const setTimer = (name: string) =>
  updateClock(name, clock => {
    clock.previousTime = Date.now()
    clock.interval = setInterval(() => updateTimer(name), UPDATE_INTERVAL)
    clock.isRunning = true
  })

export const clearTimer = (name: string) =>
  updateClock(name, clock => {
    const nextTime = Date.now()

    if (typeof clock.interval === 'number') clearInterval(clock.interval)
    if (typeof clock.previousTime !== 'number')
      throw new Error('Clock has no previous time')

    clock.interval = null
    clock.isRunning = false

    const deltaTime = nextTime - clock.previousTime
    clock.time += deltaTime

    delete clock.previousTime
  })

export const toggleTimer = (name: string, isRunning: boolean) => {
  if (isRunning) clearTimer(name)
  else setTimer(name)
}

export const updateLocalStorageClocks = derived(clockValues, $clockValues => {
  const clockStorageEntries = $clockValues.map(clock => [
    clock.name,
    clockToStoredClock(clock),
  ])

  localStorage.clocks = JSON.stringify(Object.fromEntries(clockStorageEntries))
})
