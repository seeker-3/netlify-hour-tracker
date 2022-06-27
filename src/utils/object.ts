import type { ExtractCallbackParameters } from './types'

export const mapFromEntries = <TElement, TResult>(
  array: TElement[],
  callbackfn: (
    // ...args: Parameters<Parameters<typeof array.map>[0]>
    ...args: ExtractCallbackParameters<typeof array.map, 0>
  ) => [string, TResult],
) => Object.fromEntries(array.map(callbackfn))
