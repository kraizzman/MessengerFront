import type { Message } from '@/models/message'
import type { User } from './user'

export type Conversation = {
  _id: string
  participants: User[]
  messages: Message[]
  title: string|null
  lastUpdate: Date
  seen: Record<string, string>
}
