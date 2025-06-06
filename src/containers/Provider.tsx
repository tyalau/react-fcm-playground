import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider, ColorModeProviderProps } from '@/containers/ColorModeProvider'

export const Provider = (props: ColorModeProviderProps) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
