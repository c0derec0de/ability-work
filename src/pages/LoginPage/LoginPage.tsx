import { type FormEvent, useState } from 'react'
import { useUnit } from 'effector-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { $isAuthenticated, registered, signedIn } from '../../features/auth/model/authModel'

export function LoginPage() {
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ credential?: string; password?: string }>({})
  const [isAuthenticated, login, register] = useUnit([$isAuthenticated, signedIn, registered])
  const navigate = useNavigate()

  if (isAuthenticated) return <Navigate to="/jobs" replace />

  const validate = () => {
    const nextErrors: typeof errors = {}
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential)
    const isPhone = /^\+?[\d\s()-]{10,}$/.test(credential)
    if (!isEmail && !isPhone) nextErrors.credential = 'Введите корректный email или номер телефона'
    if (password.length < 6) nextErrors.password = 'Пароль должен содержать не менее 6 символов'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submit = (event: FormEvent, mode: 'login' | 'register') => {
    event.preventDefault()
    if (!validate()) return
    if (mode === 'login') login()
    else register()
    navigate('/jobs')
  }

  return (
    <main className="loginPage">
      <section className="loginIntro" aria-labelledby="welcome-title">
        <div className="brand brandLarge">
          <span aria-hidden="true" className="brandMark">РВ</span>
          <span>Равные возможности</span>
        </div>
        <div>
          <p className="eyebrow">Сервис поиска работы</p>
          <h1 id="welcome-title">Работа и заказы в удобном формате</h1>
          <p className="lead">Здесь можно найти заказ, связаться с заказчиком и сохранить информацию о выполненной работе.</p>
        </div>
        <ul className="benefitsList">
          <li><strong>Поиск заказов</strong><span>Фильтры по городу, категории и формату</span></li>
          <li><strong>Сообщения</strong><span>Переписка с заказчиком внутри сервиса</span></li>
          <li><strong>Доступность</strong><span>Контрастная тема и увеличенный текст</span></li>
        </ul>
      </section>
      <section className="loginPanel" aria-labelledby="login-title">
        <div className="loginCard">
          <p className="eyebrow">Личный кабинет</p>
          <h2 id="login-title">Войти в аккаунт</h2>
          <p className="muted">Укажите email или телефон и пароль</p>
          <form noValidate onSubmit={(event) => submit(event, 'login')}>
            <div className="field">
              <label htmlFor="credential">Email или телефон</label>
              <input
                id="credential"
                autoComplete="username"
                value={credential}
                onChange={(event) => setCredential(event.target.value)}
                aria-describedby={errors.credential ? 'credential-error' : undefined}
                aria-invalid={Boolean(errors.credential)}
                placeholder="name@example.ru"
              />
              {errors.credential && <p className="fieldError" id="credential-error" role="alert">{errors.credential}</p>}
            </div>
            <div className="field">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                aria-invalid={Boolean(errors.password)}
                placeholder="Не менее 6 символов"
              />
              {errors.password && <p className="fieldError" id="password-error" role="alert">{errors.password}</p>}
            </div>
            <button className="button fullButton" type="submit">Войти</button>
            <div className="divider"><span>или</span></div>
            <button className="secondaryButton fullButton" type="button" onClick={(event) => submit(event, 'register')}>
              Зарегистрироваться
            </button>
          </form>
          <p className="privacyNote">В учебной версии данные для входа не отправляются на сервер.</p>
        </div>
      </section>
    </main>
  )
}
