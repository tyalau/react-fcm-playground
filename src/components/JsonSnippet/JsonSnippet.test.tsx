import { render } from '@testing-library/react'
import JsonSnippet from './index'

describe('JsonSnippet', () => {
  it('renders formatted JSON', () => {
    const data = { foo: 'bar', num: 42 }
    const { container } = render(<JsonSnippet code={data} />)
    expect(container).toHaveTextContent('{ "foo": "bar", "num": 42 }')
  })

  it('renders empty object for undefined code', () => {
    const { container } = render(<JsonSnippet code={undefined} />)
    expect(container).toHaveTextContent('{}')
  })

  it('renders empty object for null code', () => {
    const { container } = render(<JsonSnippet code={null} />)
    expect(container).toHaveTextContent('{}')
  })

  it('renders empty object for empty object code', () => {
    const { container } = render(<JsonSnippet code={{}} />)
    expect(container).toHaveTextContent('{}')
  })
})
