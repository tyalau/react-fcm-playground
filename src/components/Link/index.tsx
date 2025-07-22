import { Link as CuiLink, LinkProps as CuiLinkProps } from '@chakra-ui/react'
import { LuExternalLink } from 'react-icons/lu'

type LinkProps = CuiLinkProps & {
  isExternal?: boolean
}

export default function Link({ children, isExternal, ...props }: LinkProps) {
  return (
    <CuiLink variant="underline" target={isExternal ? '_blank' : undefined} {...props}>
      {children}
      {isExternal && (
        <>
          {' '}
          <LuExternalLink />
        </>
      )}
    </CuiLink>
  )
}
