import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function JsonSnippet({ code }: { code: unknown }) {
  let formatted = '{}'
  if (code) {
    try {
      formatted = JSON.stringify(code, null, 2)
    } catch (error) {
      console.error('Error formatting JSON code:', error)
    }
  }

  return (
    <SyntaxHighlighter language="json" style={atomDark}>
      {formatted}
    </SyntaxHighlighter>
  )
}
