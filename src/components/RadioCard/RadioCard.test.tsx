import { screen, fireEvent } from '@testing-library/react'
import render from '@/test-utils/render'
import RadioCard from './index'

describe('RadioCard', () => {
  const items = [
    { value: 'a', title: 'Option A', description: <div>Desc A</div> },
    { value: 'b', title: 'Option B' },
  ]

  it('renders label and all items', async () => {
    render(<RadioCard label="Choose one" items={items} value="a" onChange={() => {}} />)
    const label = await screen.findByText('Choose one')
    expect(label).toBeInTheDocument()
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
    expect(screen.getByText('Desc A')).toBeInTheDocument()
  })

  it('calls onChange when an item is clicked', async () => {
    const handleChange = vi.fn()
    render(<RadioCard label="Choose one" items={items} value="a" onChange={handleChange} />)
    const option = await screen.findByText('Option B')
    fireEvent.click(option)
    expect(handleChange).toHaveBeenCalled()
  })

  it('shows the correct item as checked', async () => {
    render(<RadioCard label="Choose one" items={items} value="b" onChange={() => {}} />)
    const inputs = await screen.findAllByRole('radio')
    expect(inputs[1]).toBeChecked()
  })
})
