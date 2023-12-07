import { io, Socket } from 'socket.io-client'
import type { User } from '@/models/user'
import type { Message } from '@/models/message'
import type { Conversation } from '@/models/conversation'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export type CreateConversationAck = {
  status: number
  message: Conversation | Error
}

const useSocketStore = defineStore('socketStore', () => {
  const state = reactive<{
    socket: Socket | null;
    currentUser: User  | null;
  }>({
    socket: null,
    currentUser: null
  })

  /**
   * Permet d'initialiser la connexion socket.io
   * L'utilisateur connecté est stocké dans ce store car utilisé pour identifié les messages envoyés via socket
   * 
   * @param user l'utilisateur actuellement connecté
   */
  function login(user: User) {
    if (_isLoggedIn()) {
      throw new Error('Can only log in once')
    }
    state.currentUser = user
    if (!state.socket) {
      state.socket = io('http://localhost:5000', {
        query: {
          userId: user._id
        },
        extraHeaders: {
          userId: user._id
        }
      })
    }
  }

  /**
   * Fonction "privée" permettant de connaître l'état du store
   * @returns 
   */
  function _isLoggedIn() {
    return state.currentUser !== null && state.socket !== null
  }

  /*
    Ci dessous on retrouve les évènements nécessaires pour communiquer avec l'application socket.io
    Elle prennent un paramètre cb qui permet de passer le code qui doit être appelé lors de la réception d'un évènement.

    Par exemple, pour watchNewUser, on l'utilise comme ça :

    
    const { watchNewUser } = useSocketStore()
    watchNewUser((user: User) => {
      console.log(user.username + ' vient de se connecter à messenger');
      // TODO: modifier l'état dans le store user pour que la pastille s'affiche
    })

  */

  function watchNewUser(cb: (user: User) => void): void {
    if (!_isLoggedIn()) {
      throw new Error('Cannot call socket without logging in first.');
    }
    state.socket?.on('new_user', cb)
  }

  function watchNewMessage(cb: (conversationId: string, message: Message) => void): void {
    if (!_isLoggedIn()) {
      throw new Error('Cannot call socket without logging in first.');
    }
    state.socket?.on('@newMessage', ({ message }: { message: Message }) => {
      cb(message.conversationId, message)
    })
  }

  function watchNewReact(cb: (conversationId: string, message: Message) => void): void {
    if (!_isLoggedIn()) {
      throw new Error('Cannot call socket without logging in first.');
    }
    state.socket?.on('@reactionAdded', ({ message }: { message: Message }) => {
      cb(message.conversationId, message)
    })
  }

  function watchMessageEdited(cb: (msgId: string, message: Message) => void): void {
    if (!_isLoggedIn()) {
      throw new Error('Cannot call socket without logging in first.');
    }
    state.socket?.on('@messageEdited', ({ message }: { message: Message }) => {
      cb(message._id, message)
    })
  }

  function watchMessageDeleted(cb: (msgId: string, message: Message) => void): void {
    if (!_isLoggedIn()) {
      throw new Error('Cannot call socket without logging in first.');
    }
    state.socket?.on('@messageDeleted', ({ message }: { message: Message }) => {
      cb(message._id, message)
    })
  }

  function watchConversationDeleted(cb: (convId: string) => void): void {
    state.socket?.on('@conversationDeleted', ({ conversation }: { conversation: Conversation }) => {
      if (!_isLoggedIn()) {
        throw new Error('Cannot call socket without logging in first.');
      }
      cb(conversation._id)
    })
  }

  function watchConversationSeen(cb: (convId: string, conversation: Conversation) => void): void {
    if (!_isLoggedIn()) {
      throw new Error('Cannot call socket without logging in first.');
    }
    state.socket?.on('@conversationSeen', ({ conversation }: { conversation: Conversation }) => {
      cb(conversation._id, conversation)
    })
  }

  function watchNewConversation(cb: (convId: string, conversation: Conversation) => void): void {
    if (!_isLoggedIn()) {
      throw new Error('Cannot call socket without logging in first.');
    }
    state.socket?.on('@newConversation', ({ conversation }: { conversation: Conversation }) => {
      cb(conversation._id, conversation)
    })
  }

  return {
    login,
    watchNewUser,
    watchNewMessage,
    watchNewReact,
    watchMessageEdited,
    watchMessageDeleted,
    watchConversationDeleted,
    watchConversationSeen,
    watchNewConversation,
  }
})

export default useSocketStore
