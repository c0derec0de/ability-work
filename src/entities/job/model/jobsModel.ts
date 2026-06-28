import { createEffect, createEvent, createStore } from 'effector'
import { mockJobs } from '../../../shared/mock/mockJobs'
import type { Job } from '../../../types'

export const loadJobsFx = createEffect(async () => {
  await new Promise((resolve) => window.setTimeout(resolve, 450))
  return mockJobs
})

export const jobSelected = createEvent<Job | null>()

export const $jobs = createStore<Job[]>([]).on(loadJobsFx.doneData, (_, jobs) => jobs)
export const $jobsLoading = loadJobsFx.pending
export const $selectedJob = createStore<Job | null>(null).on(jobSelected, (_, job) => job)
