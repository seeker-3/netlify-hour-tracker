export const MILLISECONDS_PER_HOUR = 3600000
export const MILLISECONDS_PER_MINUTE = 60000
export const MILLISECONDS_PER_SECOND = 1000

export const getDisplay = (time: number, _showMilliseconds = false) => {
  const hours = Math.floor(time / MILLISECONDS_PER_HOUR)
  time %= MILLISECONDS_PER_HOUR

  const minutes = Math.floor(time / MILLISECONDS_PER_MINUTE)
  time %= MILLISECONDS_PER_MINUTE

  const seconds = Math.floor(time / MILLISECONDS_PER_SECOND)
  time %= MILLISECONDS_PER_SECOND

  const units = [
    hours,
    minutes,
    seconds,
    // showMilliseconds ? Math.floor(time / 10) : 0,
  ]

  return units.map(time => time.toString().padStart(2, '0')) as [
    string,
    string,
    string,
    string,
  ]
}
