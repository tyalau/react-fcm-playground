import { HStack, RadioCard as CuiRadioCard } from '@chakra-ui/react'

type RadioCardProps = CuiRadioCard.RootProps & {
  label: string
  items: {
    value: string
    title: React.ReactNode
    description?: React.ReactNode
  }[]
}

export default function RadioCard({ label, items, ...props }: RadioCardProps) {
  return (
    <CuiRadioCard.Root {...props}>
      <CuiRadioCard.Label>{label}</CuiRadioCard.Label>
      <HStack align="stretch">
        {items.map(({ value, title, description }) => (
          <CuiRadioCard.Item value={value} key={value}>
            <CuiRadioCard.ItemHiddenInput />
            <CuiRadioCard.ItemControl>
              <CuiRadioCard.ItemContent>
                <CuiRadioCard.ItemText>{title}</CuiRadioCard.ItemText>
                {description && <CuiRadioCard.ItemDescription>{description}</CuiRadioCard.ItemDescription>}
              </CuiRadioCard.ItemContent>
              <CuiRadioCard.ItemIndicator />
            </CuiRadioCard.ItemControl>
          </CuiRadioCard.Item>
        ))}
      </HStack>
    </CuiRadioCard.Root>
  )
}
