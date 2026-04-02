import { ToastOptions } from '@chakra-ui/react'
import { screen } from '@testing-library/react'
import useToaster from '@/hooks/useToaster'
import render from '@/test-utils/render'
import Toaster from './index'

const TestToaster = ({ config }: { config: ToastOptions }) => {
  const toaster = useToaster()
  return (
    <>
      <Toaster toaster={toaster} />
      <button type="button" onClick={() => toaster.create(config)}>
        Trigger
      </button>
    </>
  )
}

const triggerToast = () => {
  screen.getByRole('button', { name: /trigger/i }).click()
}

describe('Toaster', () => {
  it('renders a success toast with title and description', async () => {
    const config = {
      title: 'Success!',
      description: 'Operation completed successfully.',
      type: 'success',
      duration: 5000,
    }

    render(<TestToaster config={config} />)
    triggerToast()

    expect(await screen.findByText('Success!')).toBeInTheDocument()
    expect(screen.getByText('Operation completed successfully.')).toBeInTheDocument()
  })

  it('renders a loading toast with spinner', async () => {
    const config = {
      title: 'Loading...',
      type: 'loading',
      duration: 5000,
    }

    render(<TestToaster config={config} />)
    triggerToast()

    expect(await screen.findByText('Loading...')).toBeInTheDocument()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders a toast with closable trigger', async () => {
    const config = {
      title: 'Closable Toast',
      type: 'info',
      closable: true,
      duration: 5000,
    }

    render(<TestToaster config={config} />)
    triggerToast()

    expect(await screen.findByRole('button', { name: /Dismiss notification/i })).toBeInTheDocument()
  })

  it('renders a toast with an action button', async () => {
    const config = {
      title: 'With Action',
      action: {
        label: 'Undo',
        onClick: () => {},
      },
      type: 'info',
      duration: 5000,
    }

    render(<TestToaster config={config} />)
    triggerToast()

    expect(await screen.findByRole('button', { name: 'Undo' })).toBeInTheDocument()
  })
})
