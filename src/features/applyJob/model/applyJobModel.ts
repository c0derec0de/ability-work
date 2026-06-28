import { createEvent, createStore } from 'effector'

export const jobApplied = createEvent<number>()

export const $appliedJobIds = createStore<number[]>([]).on(jobApplied, (ids, id) =>
  ids.includes(id) ? ids : [...ids, id],
)
