import { blur, fade, type TransitionConfig } from 'svelte/transition'

export const mountTransition = (
  node: Element,
  params: Parameters<typeof fade>[1],
) => fade(node, { duration: 200, ...params })

export const customTransition = (
  node: Element,
  params?: unknown,
): TransitionConfig => {
  const css = `
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  `

  return {
    duration: 3000,
    css: (t, u) => {
      console.log(t, u)
      return css
    },
  }
}

export const tickTransition = (node: Element, params: unknown) =>
  fade(node, { duration: 750 })
