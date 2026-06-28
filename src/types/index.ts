export type WorkFormat = 'Удалённо' | 'В офисе' | 'Гибрид'

export interface Customer {
  name: string
  rating: number
  completedJobs: number
  verified: boolean
}

export interface Job {
  id: number
  title: string
  category: string
  city: string
  format: WorkFormat
  budget: string
  shortDescription: string
  description: string
  requirements: string[]
  deadline: string
  publishedAt: string
  customer: Customer
}

export interface ChatMessage {
  id: number
  author: 'user' | 'customer'
  text: string
  time: string
}

export interface Conversation {
  id: number
  customerName: string
  jobTitle: string
  unread: number
  messages: ChatMessage[]
}

export interface OrderHistory {
  id: number
  title: string
  status: 'Выполнен' | 'В работе'
  date: string
  payment: string
}

export interface Review {
  id: number
  author: string
  rating: number
  text: string
  date: string
}

export interface Profile {
  name: string
  profession: string
  rating: number
  about: string
  skills: string[]
  orders: OrderHistory[]
  reviews: Review[]
}
