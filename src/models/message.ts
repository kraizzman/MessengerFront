export type Message = {
  _id: string
  from: string
  content: string
  postedAt: Date
  conversationId: string
  replyTo: string | null
  edited: boolean
  deleted: boolean
  reactions: Reactions
}

export const ALL_REACTIONS = ['HAPPY', 'SAD', 'THUMBSUP', 'THUMBSDOWN', 'LOVE'] as const
export type ReactionType = (typeof ALL_REACTIONS)[number]

export const REACTION_EMOJI_MAP: Record<ReactionType, string> = {
  THUMBSUP: '👍',
  THUMBSDOWN: '👎',
  LOVE: '❤️',
  HAPPY: '😀',
  SAD: '😢'
}

export type Reactions = Record<string, ReactionType>