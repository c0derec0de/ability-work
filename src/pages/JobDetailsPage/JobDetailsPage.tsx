import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { $jobs, $jobsLoading, jobSelected } from '../../entities/job/model/jobsModel'
import { conversationSelected } from '../../entities/message/model/messagesModel'
import { $appliedJobIds, jobApplied } from '../../features/applyJob/model/applyJobModel'

export function JobDetailsPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [jobs, loading, appliedIds, apply] = useUnit([$jobs, $jobsLoading, $appliedJobIds, jobApplied])
  const job = jobs.find((item) => item.id === Number(jobId))

  useEffect(() => {
    jobSelected(job ?? null)
  }, [job])

  if (loading) return <p className="loadingText" aria-live="polite">Загрузка заказа...</p>
  if (!job) {
    return (
      <section className="emptyState">
        <h1>Заказ не найден</h1>
        <Link className="secondaryButton" to="/jobs">Вернуться к заказам</Link>
      </section>
    )
  }

  const isApplied = appliedIds.includes(job.id)
  const openMessages = () => {
    conversationSelected(job.id === 2 ? 2 : 1)
    navigate('/messages')
  }

  return (
    <>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link to="/jobs">Заказы</Link><span aria-hidden="true">/</span><span aria-current="page">Детали заказа</span>
      </nav>
      <article className="detailsLayout">
        <div className="detailsMain">
          <header className="detailsHeader">
            <p className="eyebrow">{job.category}</p>
            <h1>{job.title}</h1>
            <ul className="metaList">
              <li>{job.format}</li><li>{job.city}</li><li>{job.publishedAt}</li>
            </ul>
          </header>
          <section className="contentSection" aria-labelledby="description-title">
            <h2 id="description-title">Описание заказа</h2>
            <p>{job.description}</p>
          </section>
          <section className="contentSection" aria-labelledby="requirements-title">
            <h2 id="requirements-title">Требования</h2>
            <ul className="checkList">
              {job.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
            </ul>
          </section>
          <section className="contentSection" aria-labelledby="customer-title">
            <h2 id="customer-title">О заказчике</h2>
            <div className="customerProfile">
              <div className="smallAvatar" aria-hidden="true">{job.customer.name.slice(0, 1)}</div>
              <div>
                <strong>{job.customer.name}</strong>
                <p><span aria-hidden="true">★</span> {job.customer.rating} · {job.customer.completedJobs} заказов завершено</p>
                {job.customer.verified && <span className="verified">Личность подтверждена</span>}
              </div>
            </div>
          </section>
        </div>
        <aside className="orderSummary" aria-label="Условия и действия">
          <p className="summaryLabel">Бюджет</p>
          <p className="summaryBudget">{job.budget}</p>
          <dl className="summaryList">
            <div><dt>Срок выполнения</dt><dd>{job.deadline}</dd></div>
            <div><dt>Формат</dt><dd>{job.format}</dd></div>
            <div><dt>Место</dt><dd>{job.city}</dd></div>
          </dl>
          <button
            className={isApplied ? 'button buttonSuccess fullButton' : 'button fullButton'}
            type="button"
            disabled={isApplied}
            onClick={() => apply(job.id)}
          >
            {isApplied ? 'Отклик отправлен' : 'Откликнуться'}
          </button>
          <button className="secondaryButton fullButton" type="button" onClick={openMessages}>
            Написать заказчику
          </button>
          <p className="safeNote">Не переводите деньги заказчику. Безопасное общение проходит внутри платформы.</p>
        </aside>
      </article>
    </>
  )
}
