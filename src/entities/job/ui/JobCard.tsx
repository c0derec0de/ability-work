import { useUnit } from 'effector-react'
import { Link } from 'react-router-dom'
import { $appliedJobIds, jobApplied } from '../../../features/applyJob/model/applyJobModel'
import type { Job } from '../../../types'

export function JobCard({ job }: { job: Job }) {
  const [appliedIds, apply] = useUnit([$appliedJobIds, jobApplied])
  const isApplied = appliedIds.includes(job.id)

  return (
    <article className="jobCard" aria-labelledby={`job-title-${job.id}`}>
      <div className="jobCardTop">
        <div>
          <p className="eyebrow">{job.category}</p>
          <h2 id={`job-title-${job.id}`}>
            <Link className="titleLink" to={`/jobs/${job.id}`}>{job.title}</Link>
          </h2>
        </div>
        <p className="budget" aria-label={`Бюджет: ${job.budget}`}>{job.budget}</p>
      </div>
      <ul className="metaList" aria-label="Условия заказа">
        <li>{job.format}</li>
        <li>{job.city}</li>
        <li>Срок: {job.deadline}</li>
      </ul>
      <p className="jobDescription">{job.shortDescription}</p>
      <div className="customerRow">
        <span>{job.customer.name}</span>
        <span aria-label={`Рейтинг заказчика ${job.customer.rating} из 5`}>
          <span aria-hidden="true">★</span> {job.customer.rating}
        </span>
        {job.customer.verified && <span className="verified">Заказчик проверен</span>}
      </div>
      <div className="cardActions">
        <button
          type="button"
          className={isApplied ? 'button buttonSuccess' : 'button'}
          disabled={isApplied}
          onClick={() => apply(job.id)}
          aria-label={isApplied ? `Отклик на заказ «${job.title}» отправлен` : `Откликнуться на заказ «${job.title}»`}
        >
          {isApplied ? 'Отклик отправлен' : 'Откликнуться'}
        </button>
        <Link className="secondaryButton" to={`/jobs/${job.id}`}>Подробнее</Link>
      </div>
    </article>
  )
}
