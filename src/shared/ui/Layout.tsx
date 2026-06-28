import { useUnit } from 'effector-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signedOut } from '../../features/auth/model/authModel'
import {
  $contrastMode,
  $largeTextMode,
  contrastToggled,
  largeTextToggled,
} from '../../features/accessibilitySettings/model/accessibilityModel'

const navClassName = ({ isActive }: { isActive: boolean }) => (isActive ? 'navLink navLinkActive' : 'navLink')

export function Layout() {
  const navigate = useNavigate()
  const [contrast, largeText, logout] = useUnit([$contrastMode, $largeTextMode, signedOut])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={`app ${contrast ? 'contrastMode' : ''} ${largeText ? 'largeTextMode' : ''}`}>
      <a className="skipLink" href="#main-content">
        Перейти к содержанию
      </a>
      <header className="siteHeader">
        <NavLink className="brand" to="/jobs" aria-label="Равные возможности — на главную">
          <span aria-hidden="true" className="brandMark">РВ</span>
          <span>Равные возможности</span>
        </NavLink>
        <nav className="mainNav" aria-label="Основная навигация">
          <NavLink className={navClassName} to="/jobs">Заказы</NavLink>
          <NavLink className={navClassName} to="/messages">Сообщения</NavLink>
          <NavLink className={navClassName} to="/profile">Профиль</NavLink>
        </nav>
        <div className="headerActions" aria-label="Быстрые настройки">
          <button
            className="textButton compactButton"
            type="button"
            aria-label={contrast ? 'Выключить максимальный контраст' : 'Включить максимальный контраст'}
            aria-pressed={contrast}
            onClick={() => contrastToggled()}
          >
            Контраст
          </button>
          <button
            className="textButton compactButton"
            type="button"
            aria-label={largeText ? 'Выключить крупный шрифт' : 'Включить крупный шрифт'}
            aria-pressed={largeText}
            onClick={() => largeTextToggled()}
          >
            Текст А+
          </button>
          <button className="textButton compactButton" type="button" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </header>
      <main id="main-content" className="pageContainer" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="siteFooter">
        <p>Равные возможности · Доступная работа для каждого</p>
        <a href="mailto:help@example.ru">Нужна помощь?</a>
      </footer>
    </div>
  )
}
