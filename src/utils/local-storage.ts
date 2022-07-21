export const getStoredClockNames = (): string[] => {
  const storedClocksNames = localStorage.clockNames
  return storedClocksNames ? JSON.parse(storedClocksNames) : []
}

export const getStoredClockValues = () => {
  const clockNames = getStoredClockNames()

  return Object.fromEntries(
    clockNames.map(clockName => {
      const storage = localStorage.getItem(clockName)

      if (storage === null) throw new Error(`No clock found for ${clockName}`)

      const value = parseInt(storage)

      if (isNaN(value))
        throw Error(`Failed to parse clock value for clock name: ${clockName}`)

      return [clockName, { value }]
    }),
  )
}

export const getStoredClocks = (): Record<string, number> =>
  localStorage.clocks ? JSON.parse(localStorage.clocks) : {}
