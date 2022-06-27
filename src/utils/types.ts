export type ExtractCallbackParameters<
  F extends (...args: any[]) => any,
  N extends number,
> = Parameters<F>[N] extends Function ? Parameters<Parameters<F>[N]> : never
