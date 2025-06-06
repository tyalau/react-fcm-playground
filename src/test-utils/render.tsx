import { render as rtlRender } from '@testing-library/react'
import { Provider } from '@/containers/Provider'

export default function render(ui: React.ReactNode) {
  return rtlRender(ui, {
    wrapper: (props: React.PropsWithChildren) => <Provider>{props.children}</Provider>,
  })
}
