import { act, screen, fireEvent } from '@testing-library/react'
import render from '@/test-utils/render'
import RadioCard from './index'

describe('RadioCard', () => {
  const items = [
    { value: 'a', title: 'Option A', description: <div>Desc A</div> },
    { value: 'b', title: 'Option B' },
  ]

  it('renders label and all items', async () => {
    await act(async () => {
      render(<RadioCard label="Choose one" items={items} value="a" onChange={() => {}} />)
    })
    expect(screen.getByText('Choose one')).toBeInTheDocument()
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
    expect(screen.getByText('Desc A')).toBeInTheDocument()
  })

  it('calls onChange when an item is clicked', async () => {
    const handleChange = vi.fn()
    await act(async () => {
      render(<RadioCard label="Choose one" items={items} value="a" onChange={handleChange} />)
    })
    fireEvent.click(screen.getByText('Option B'))
    expect(handleChange).toHaveBeenCalled()
  })

  it('shows the correct item as checked', async () => {
    await act(async () => {
      render(<RadioCard label="Choose one" items={items} value="b" onChange={() => {}} />)
    })
    const inputs = screen.getAllByRole('radio')
    expect(inputs[1]).toBeChecked()
  })
})
