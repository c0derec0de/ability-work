import { createEvent, createStore } from 'effector'
import { mockMessages } from '../../../shared/mock/mockMessages'
import type { Conversation } from '../../../types'

export const conversationSelected = createEvent<number>()
export const conversationClosed = createEvent()
export const messageSent = createEvent<string>()
export const customerReported = createEvent<number>()
export const reportDismissed = createEvent()

export const $conversations = createStore<Conversation[]>(mockMessages)
  .on(conversationSelected, (items, id) =>
    items.map((item) => (item.id === id ? { ...item, unread: 0 } : item)),
  )
  .on(messageSent, (items, text) => {
    const activeId = $activeConversationId.getState()
    const cleanText = text.trim()
    if (!activeId || !cleanText) return items
    return items.map((item) =>
      item.id === activeId
        ? {
            ...item,
            messages: [
              ...item.messages,
              {
                id: Date.now(),
                author: 'user' as const,
                text: cleanText,
                time: new Intl.DateTimeFormat('ru', { hour: '2-digit', minute: '2-digit' }).format(new Date()),
              },
            ],
          }
        : item,
    )
  })

export const $activeConversationId = createStore<number | null>(mockMessages[0]?.id ?? null)
  .on(conversationSelected, (_, id) => id)
  .reset(conversationClosed)

export const $reportedConversationId = createStore<number | null>(null)
  .on(customerReported, (_, id) => id)
  .reset(reportDismissed)
