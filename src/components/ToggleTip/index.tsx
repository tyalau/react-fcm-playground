import { IconButton, Popover, Portal } from '@chakra-ui/react'

type ToggleTipProps = Omit<Popover.RootProps, 'children'> & {
  icon: React.ReactNode
  content: React.ReactNode
}

export default function ToggleTip({ content, icon, ...props }: ToggleTipProps) {
  return (
    <Popover.Root size="xs" {...props}>
      <Popover.Trigger asChild>
        <IconButton size="xs" variant="ghost">
          {icon}
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>{content}</Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
