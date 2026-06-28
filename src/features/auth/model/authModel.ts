import { createEvent, createStore } from 'effector'

export const signedIn = createEvent()
export const registered = createEvent()
export const signedOut = createEvent()

export const $isAuthenticated = createStore(false)
  .on(signedIn, () => true)
  .on(registered, () => true)
  .reset(signedOut)
