import { screen, act, fireEvent, waitFor } from '@testing-library/react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import render from '@/test-utils/render'
import ToggleTip from './index'

describe('ToggleTip', async () => {
  it('renders icon and shows popover content on click', async () => {
    const contentText = 'This is a tooltip'
    await act(async () => {
      render(<ToggleTip icon={<FaRegQuestionCircle data-testid="tip-icon" />} content={<p>{contentText}</p>} />)
    })

    const icon = screen.getByTestId('tip-icon')
    expect(icon).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-state', 'closed')
    fireEvent.click(button)
    await waitFor(() => {
      expect(button).toHaveAttribute('data-state', 'open')
    })
    expect(screen.getByText(contentText)).toBeInTheDocument()
  })
})
