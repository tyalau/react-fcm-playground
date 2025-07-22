import { screen } from '@testing-library/react'
import render from '@/test-utils/render'
import Link from './index'

describe('Link', () => {
  it('renders with target _blank when specified', () => {
    render(<Link href="https://example.com">External</Link>)
    const link = screen.getByText('External')
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('renders an SVG icon when isExternal is true', () => {
    render(
      <Link href="https://example.com" isExternal>
        External Link
      </Link>
    )
    const link = screen.getByText('External Link')
    expect(link).toHaveAttribute('target', '_blank')
    const svg = link.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
