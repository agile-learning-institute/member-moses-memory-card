import { describe, expect, it } from 'vitest'
import ReactDOM from 'react-dom/client'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    const container = document.createElement('div')
    const root = ReactDOM.createRoot(container)

    root.render(<App />)

    expect(container.innerHTML).toBeTypeOf('string')

    root.unmount()
  })
})
