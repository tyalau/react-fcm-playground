// Modify this type with your custom key-value pairs
export type DataMessage = {
  title: string
  body?: string
}

export type NotificationMessage = {
  title: string
  body?: string
}

export type Message = {
  token: string
  notification?: NotificationMessage
  data?: DataMessage
}
