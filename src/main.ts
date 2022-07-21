import { useRegisterSW } from 'virtual:pwa-register/svelte'
import App from './App.svelte'

useRegisterSW()

const target = document.getElementById('app')

if (!(target instanceof HTMLElement)) throw new Error('No target element found')

const app = new App({
  target,
})

export default app
