import { DataMessage } from '@/types/notification'

// Modify this function to match your data message structure
export const composeNotification = (data: DataMessage): { title: string; body?: string } => {
  return {
    title: `[custom] ${data.title}`,
    body: data.body,
  }
}
