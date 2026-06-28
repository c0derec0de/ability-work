import { createEvent, createStore } from 'effector'

const readSetting = (key: string) => {
  try {
    return localStorage.getItem(key) === 'true'
  } catch {
    return false
  }
}

export const contrastToggled = createEvent()
export const largeTextToggled = createEvent()

export const $contrastMode = createStore(readSetting('contrastMode')).on(contrastToggled, (value) => !value)
export const $largeTextMode = createStore(readSetting('largeTextMode')).on(largeTextToggled, (value) => !value)

$contrastMode.watch((value) => {
  localStorage.setItem('contrastMode', String(value))
})

$largeTextMode.watch((value) => {
  localStorage.setItem('largeTextMode', String(value))
})
