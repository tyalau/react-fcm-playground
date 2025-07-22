// Modify this type with your custom key-value pairs
export type DataMessage = {
  title: string
  body?: string
}

export type NotificationMessage = {
  title: string
  body?: string
}

export type MessageType = 'notification' | 'data'

export type MessageForm = {
  token: string
  notification: NotificationMessage
  data: { key: string; value: string }[]
}
