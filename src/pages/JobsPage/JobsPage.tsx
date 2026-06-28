import { useUnit } from 'effector-react'
import { JobCard } from '../../entities/job/ui/JobCard'
import { $jobsLoading } from '../../entities/job/model/jobsModel'
import { $filteredJobs } from '../../features/jobSearch/model/filtersModel'
import { JobFilters } from '../../features/jobSearch/ui/JobFilters'

export function JobsPage() {
  const [jobs, loading] = useUnit([$filteredJobs, $jobsLoading])

  return (
    <>
      <header className="pageHeading">
        <div>
          <p className="eyebrow">Каталог</p>
          <h1>Заказы</h1>
          <p className="lead">Используйте поиск и фильтры, чтобы подобрать подходящую работу.</p>
        </div>
      </header>
      <JobFilters />
      <div className="resultsHeader" aria-live="polite">
        <h2>{loading ? 'Загрузка заказов...' : `Найдено заказов: ${jobs.length}`}</h2>
        <span>Сначала новые</span>
      </div>
      {loading ? (
        <div className="skeletonList" aria-label="Загрузка заказов" aria-busy="true">
          {[1, 2, 3].map((item) => <div className="skeletonCard" key={item} />)}
        </div>
      ) : jobs.length ? (
        <div className="jobsList">{jobs.map((job) => <JobCard job={job} key={job.id} />)}</div>
      ) : (
        <section className="emptyState">
          <h2>Заказы не найдены</h2>
          <p>Попробуйте изменить поисковый запрос или сбросить фильтры.</p>
        </section>
      )}
    </>
  )
}
