import '@testing-library/jest-dom/vitest'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'
import 'vitest-axe/extend-expect'

const { window } = new JSDOM()

// ResizeObserver mock
vi.stubGlobal('ResizeObserver', ResizeObserver)
window.ResizeObserver = ResizeObserver

// IntersectionObserver mock
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
window.IntersectionObserver = IntersectionObserverMock

// Scroll Methods mock
window.Element.prototype.scrollTo = () => {}
window.Element.prototype.scrollIntoView = () => {}

// requestAnimationFrame mock
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)

// URL object mock
window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
window.URL.revokeObjectURL = () => {}

// navigator mock
Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
})

// matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() })),
})

// Override globalThis
Object.assign(global, { window, document: window.document })
