let interval: number | null = null

export const runTest = () => {
  const startTime = Date.now()
  let previousTime = startTime
  let totalTime = 0

  interval = setInterval(() => {
    const nextTime = Date.now()
    const deltaStart = nextTime - startTime
    const deltaStep = nextTime - previousTime
    totalTime += deltaStep
    console.assert(deltaStart === deltaStep, 'Times did not equal')
  })
}

export const stopTest = () => {
  if (interval !== null) clearInterval(interval)
}
