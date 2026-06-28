import type { Conversation } from '../../types'

export const mockMessages: Conversation[] = [
  {
    id: 1,
    customerName: 'Анна, «Новый курс»',
    jobTitle: 'Дизайн лендинга для онлайн-школы',
    unread: 1,
    messages: [
      { id: 1, author: 'customer', text: 'Здравствуйте! Спасибо за отклик. Покажете похожие работы?', time: '10:32' },
      { id: 2, author: 'user', text: 'Здравствуйте! Да, сейчас отправлю ссылку на портфолио.', time: '10:36' },
      { id: 3, author: 'customer', text: 'Отлично, буду ждать.', time: '10:37' },
    ],
  },
  {
    id: 2,
    customerName: 'Михаил Орлов',
    jobTitle: 'Расшифровка серии интервью',
    unread: 0,
    messages: [
      { id: 1, author: 'user', text: 'Добрый день! Уточните, пожалуйста, качество записей.', time: 'Вчера, 17:20' },
      { id: 2, author: 'customer', text: 'Добрый день. Записи чистые, без фонового шума.', time: 'Вчера, 17:42' },
    ],
  },
]
