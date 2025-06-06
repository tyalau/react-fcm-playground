import { screen } from '@testing-library/react'
import render from '@/test-utils/render'
import Dialog from './index'

describe('Dialog', () => {
  it('renders title, body, and footer when open', () => {
    render(<Dialog open title="Test Title" body={<div>Test Body</div>} footer={<button type="button">Test Footer</button>} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Body')).toBeInTheDocument()
    expect(screen.getByText('Test Footer')).toBeInTheDocument()
  })

  it('does not render content when closed', () => {
    render(
      <Dialog
        open={false}
        title="Hidden Title"
        body={<div>Hidden Body</div>}
        footer={<button type="button">Hidden Button</button>}
      />
    )

    expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Hidden Body')).not.toBeInTheDocument()
    expect(screen.queryByText('Hidden Footer')).not.toBeInTheDocument()
  })
})
