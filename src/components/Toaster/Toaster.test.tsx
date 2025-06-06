import { act, screen } from '@testing-library/react'
import useToaster from '@/hooks/useToaster'
import render from '@/test-utils/render'
import Toaster from './index'

describe('Toaster', () => {
  it('renders a success toast with title and description', async () => {
    const toaster = useToaster()

    render(<Toaster toaster={toaster} />)
    // let Toaster mount
    await new Promise((r) => setTimeout(r, 0))
    await act(() => {
      return Promise.resolve(
        toaster.create({
          title: 'Success!',
          description: 'Operation completed successfully.',
          type: 'success',
          duration: 5000,
        })
      )
    })

    expect(screen.getByText('Success!')).toBeInTheDocument()
    expect(screen.getByText('Operation completed successfully.')).toBeInTheDocument()
  })

  it('renders a loading toast with spinner', async () => {
    const toaster = useToaster()

    render(<Toaster toaster={toaster} />)
    // let Toaster mount
    await new Promise((r) => setTimeout(r, 0))
    await act(() => {
      return Promise.resolve(
        toaster.create({
          title: 'Loading...',
          type: 'loading',
          duration: 5000,
        })
      )
    })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders a toast with closable trigger', async () => {
    const toaster = useToaster()

    render(<Toaster toaster={toaster} />)
    // let Toaster mount
    await new Promise((r) => setTimeout(r, 0))
    await act(() => {
      return Promise.resolve(
        toaster.create({
          title: 'Closable Toast',
          type: 'info',
          closable: true,
          duration: 5000,
        })
      )
    })

    expect(screen.getByRole('button', { name: /Dismiss notification/i })).toBeInTheDocument()
  })

  it('renders a toast with an action button', async () => {
    const toaster = useToaster()

    render(<Toaster toaster={toaster} />)
    // let Toaster mount
    await new Promise((r) => setTimeout(r, 0))
    await act(() => {
      return Promise.resolve(
        toaster.create({
          title: 'With Action',
          action: {
            label: 'Undo',
            onClick: () => {},
          },
          type: 'info',
          duration: 5000,
        })
      )
    })

    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
  })
})
