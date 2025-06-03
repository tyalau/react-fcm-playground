import { render, screen } from '@testing-library/react'
import App from './App'

beforeAll(() => {
  const MockNotification = vi.fn().mockImplementation((title: string, options?: NotificationOptions) => ({
    title,
    options,
    onclick: null,
    close: vi.fn(),
  }))

  Object.assign(MockNotification, {
    permission: 'default',
    requestPermission: vi.fn().mockResolvedValue('granted'),
    prototype: {},
  })

  globalThis.Notification = MockNotification as unknown as typeof Notification
})

vi.mock('@/lib/firebase', async () => ({
  messaging: vi.fn(),
}))

vi.mock('firebase/messaging', () => ({
  getToken: vi.fn().mockResolvedValue('mocked-token'),
}))

describe('App Component', () => {
  it('renders the Vite and React logos', () => {
    render(<App />)
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument()
    expect(screen.getByAltText('React logo')).toBeInTheDocument()
  })
})
