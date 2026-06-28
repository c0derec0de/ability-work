import { useUnit } from 'effector-react'
import { $profile } from '../../entities/user/model/profileModel'
import {
  $contrastMode,
  $largeTextMode,
  contrastToggled,
  largeTextToggled,
} from '../../features/accessibilitySettings/model/accessibilityModel'

export function ProfilePage() {
  const [profile, contrast, largeText] = useUnit([$profile, $contrastMode, $largeTextMode])

  return (
    <>
      <header className="profileHeader">
        <div className="avatar" role="img" aria-label={`Заглушка фотографии пользователя ${profile.name}`}>
          {profile.name.split(' ').map((part) => part[0]).join('')}
        </div>
        <div className="profileIdentity">
          <p className="eyebrow">Личный кабинет</p>
          <h1>{profile.name}</h1>
          <p className="lead">{profile.profession}</p>
          <p className="ratingLine" aria-label={`Рейтинг ${profile.rating} из 5`}>
            <span aria-hidden="true">★★★★★</span> <strong>{profile.rating}</strong> · 12 выполненных заказов
          </p>
        </div>
      </header>
      <div className="profileGrid">
        <div className="profileMain">
          <section className="contentCard" aria-labelledby="about-title">
            <h2 id="about-title">О себе</h2><p>{profile.about}</p>
          </section>
          <section className="contentCard" aria-labelledby="skills-title">
            <h2 id="skills-title">Навыки</h2>
            <ul className="skillList">{profile.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </section>
          <section className="contentCard" aria-labelledby="history-title">
            <div className="sectionTitleRow"><h2 id="history-title">История заказов</h2><span>{profile.orders.length}</span></div>
            <div className="historyList">
              {profile.orders.map((order) => (
                <article className="historyItem" key={order.id}>
                  <div><h3>{order.title}</h3><p>{order.date}</p></div>
                  <div className="historyMeta"><span className={`status ${order.status === 'В работе' ? 'statusWork' : ''}`}>{order.status}</span><strong>{order.payment}</strong></div>
                </article>
              ))}
            </div>
          </section>
          <section className="contentCard" aria-labelledby="reviews-title">
            <div className="sectionTitleRow"><h2 id="reviews-title">Отзывы</h2><span>{profile.reviews.length}</span></div>
            {profile.reviews.map((review) => (
              <blockquote className="review" key={review.id}>
                <div className="reviewTop"><strong>{review.author}</strong><span aria-label={`Оценка ${review.rating} из 5`}><span aria-hidden="true">★★★★★</span></span></div>
                <p>{review.text}</p><footer>{review.date}</footer>
              </blockquote>
            ))}
          </section>
        </div>
        <aside className="accessibilityCard" aria-labelledby="accessibility-title">
          <p className="eyebrow">Интерфейс</p>
          <h2 id="accessibility-title">Настройки доступности</h2>
          <p>Выберите подходящий вариант отображения.</p>
          <label className="toggleRow">
            <span><strong>Максимальный контраст</strong><small>Чистый чёрный фон и яркий текст</small></span>
            <input type="checkbox" role="switch" checked={contrast} onChange={() => contrastToggled()} />
          </label>
          <label className="toggleRow">
            <span><strong>Увеличенный шрифт</strong><small>Текст и элементы станут крупнее</small></span>
            <input type="checkbox" role="switch" checked={largeText} onChange={() => largeTextToggled()} />
          </label>
          <div className="keyboardTip">
            <strong>Навигация с клавиатуры</strong>
            <p>Нажимайте Tab для перехода между элементами и Enter для выбора.</p>
          </div>
        </aside>
      </div>
    </>
  )
}
