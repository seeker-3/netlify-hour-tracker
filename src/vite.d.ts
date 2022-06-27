/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module 'virtual:pwa-register/svelte' {
  // @ts-expect-error ignore when svelte is not installed
  import type { Writable } from 'svelte/store'

  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
    onRegisterError?: (error: any) => void
  }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: Writable<boolean>
    offlineReady: Writable<boolean>
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>
  }
}
