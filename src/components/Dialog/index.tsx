import { Dialog as ChakraDialog, Portal } from '@chakra-ui/react'

type DialogProps = {
  open: boolean
  title: string
  body: React.ReactNode
  footer: React.ReactNode
}

export default function Dialog({ open, title, body, footer }: DialogProps) {
  return (
    <ChakraDialog.Root open={open}>
      <Portal>
        <ChakraDialog.Backdrop />
        <ChakraDialog.Positioner>
          <ChakraDialog.Content>
            <ChakraDialog.Header>
              <ChakraDialog.Title>{title}</ChakraDialog.Title>
            </ChakraDialog.Header>
            <ChakraDialog.Body>{body}</ChakraDialog.Body>
            <ChakraDialog.Footer>{footer}</ChakraDialog.Footer>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </ChakraDialog.Root>
  )
}
