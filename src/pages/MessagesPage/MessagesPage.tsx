import { type FormEvent, useState } from 'react'
import { useUnit } from 'effector-react'
import {
  $activeConversationId,
  $conversations,
  $reportedConversationId,
  conversationClosed,
  conversationSelected,
  customerReported,
  messageSent,
  reportDismissed,
} from '../../entities/message/model/messagesModel'

export function MessagesPage() {
  const [message, setMessage] = useState('')
  const [conversations, activeId, reportedId] = useUnit([
    $conversations,
    $activeConversationId,
    $reportedConversationId,
  ])
  const active = conversations.find((item) => item.id === activeId)

  const submitMessage = (event: FormEvent) => {
    event.preventDefault()
    if (!message.trim()) return
    messageSent(message)
    setMessage('')
  }

  return (
    <>
      <header className="pageHeading simpleHeading">
        <div><p className="eyebrow">Личный кабинет</p><h1>Сообщения</h1></div>
      </header>
      <div className="messagesLayout">
        <aside className="dialogsPanel" aria-label="Список диалогов">
          <div className="dialogsTitle">
            <h2>Диалоги</h2>
            <span>{conversations.length}</span>
          </div>
          {conversations.length ? (
            <ul className="dialogList">
              {conversations.map((conversation) => {
                const lastMessage = conversation.messages.at(-1)
                return (
                  <li key={conversation.id}>
                    <button
                      className={`dialogButton ${activeId === conversation.id ? 'dialogButtonActive' : ''}`}
                      type="button"
                      onClick={() => conversationSelected(conversation.id)}
                      aria-current={activeId === conversation.id ? 'true' : undefined}
                    >
                      <span className="smallAvatar" aria-hidden="true">{conversation.customerName.slice(0, 1)}</span>
                      <span className="dialogText">
                        <strong>{conversation.customerName}</strong>
                        <span className="dialogJob">{conversation.jobTitle}</span>
                        <span className="dialogPreview">{lastMessage?.text}</span>
                      </span>
                      {conversation.unread > 0 && <span className="unreadBadge" aria-label={`${conversation.unread} непрочитанное сообщение`}>{conversation.unread}</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : <p className="emptyCompact">Сообщений пока нет</p>}
        </aside>
        <section className="chatPanel" aria-label="Переписка">
          {active ? (
            <>
              <header className="chatHeader">
                <div>
                  <h2>{active.customerName}</h2>
                  <p>{active.jobTitle}</p>
                </div>
                <div className="chatActions">
                  <button className="linkButton dangerText" type="button" onClick={() => customerReported(active.id)}>
                    Пожаловаться
                  </button>
                  <button className="textButton compactButton" type="button" onClick={() => conversationClosed()}>
                    Закрыть переписку
                  </button>
                </div>
              </header>
              <div className="messageStream" aria-live="polite" aria-label="Сообщения в диалоге">
                <p className="dateDivider"><span>Сегодня</span></p>
                {active.messages.map((item) => (
                  <div className={`messageBubble ${item.author === 'user' ? 'ownMessage' : ''}`} key={item.id}>
                    <span className="visuallyHidden">{item.author === 'user' ? 'Вы' : active.customerName}:</span>
                    <p>{item.text}</p><time>{item.time}</time>
                  </div>
                ))}
              </div>
              <form className="messageForm" onSubmit={submitMessage}>
                <label className="visuallyHidden" htmlFor="new-message">Введите сообщение</label>
                <textarea
                  id="new-message"
                  rows={2}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Напишите сообщение..."
                />
                <button className="button" type="submit" disabled={!message.trim()}>Отправить</button>
              </form>
            </>
          ) : (
            <div className="emptyState chatEmpty">
              <h2>Переписка закрыта</h2>
              <p>Выберите другой диалог слева, чтобы открыть сообщения.</p>
            </div>
          )}
        </section>
      </div>
      {reportedId && (
        <div className="modalBackdrop" role="presentation">
          <section className="modal" role="alertdialog" aria-modal="true" aria-labelledby="report-title" aria-describedby="report-description">
            <p className="eyebrow">Обращение</p>
            <h2 id="report-title">Жалоба принята</h2>
            <p id="report-description">Информация о переписке сохранена для проверки.</p>
            <button className="button fullButton" type="button" onClick={() => reportDismissed()} autoFocus>Понятно</button>
          </section>
        </div>
      )}
    </>
  )
}
