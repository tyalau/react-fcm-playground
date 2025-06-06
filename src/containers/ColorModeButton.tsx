import * as React from 'react'
import type { IconButtonProps } from '@chakra-ui/react'
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useColorMode } from '@/hooks/useColorMode'

type ColorModeButtonProps = Omit<IconButtonProps, 'aria-label'>

const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>((props, ref) => {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: '5',
            height: '5',
          },
        }}
      >
        {colorMode === 'dark' ? <LuMoon /> : <LuSun />}
      </IconButton>
    </ClientOnly>
  )
})

ColorModeButton.displayName = 'ColorModeButton'

export default ColorModeButton
