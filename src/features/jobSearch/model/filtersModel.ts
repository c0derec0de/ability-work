import { combine, createEvent, createStore } from 'effector'
import { $jobs } from '../../../entities/job/model/jobsModel'

export const searchChanged = createEvent<string>()
export const categoryChanged = createEvent<string>()
export const formatChanged = createEvent<string>()
export const cityChanged = createEvent<string>()
export const filtersReset = createEvent()

export const $search = createStore('').on(searchChanged, (_, value) => value).reset(filtersReset)
export const $category = createStore('Все категории').on(categoryChanged, (_, value) => value).reset(filtersReset)
export const $format = createStore('Любой формат').on(formatChanged, (_, value) => value).reset(filtersReset)
export const $city = createStore('Любой город').on(cityChanged, (_, value) => value).reset(filtersReset)

export const $filteredJobs = combine(
  { jobs: $jobs, search: $search, category: $category, format: $format, city: $city },
  ({ jobs, search, category, format, city }) => {
    const query = search.trim().toLocaleLowerCase('ru')

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.title.toLocaleLowerCase('ru').includes(query) ||
        job.shortDescription.toLocaleLowerCase('ru').includes(query) ||
        job.category.toLocaleLowerCase('ru').includes(query)
      const matchesCategory = category === 'Все категории' || job.category === category
      const matchesFormat = format === 'Любой формат' || job.format === format
      const matchesCity = city === 'Любой город' || job.city === city
      return matchesSearch && matchesCategory && matchesFormat && matchesCity
    })
  },
)
