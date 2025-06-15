import { DataMessage } from '@/types/notification'

export const composeNotification = (data: DataMessage): { title: string; body: string } => {
  return {
    title: `[custom] ${data.title}`,
    body: data.body,
  }
}
