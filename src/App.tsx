import { useEffect, useState } from 'react'
import { Button, Clipboard, Container, Flex, Heading, IconButton, Input, InputGroup, Stack, Text } from '@chakra-ui/react'
import { getToken } from 'firebase/messaging'
import { messaging } from '@/lib/firebase'
import useFcm from '@/hooks/useFcm'
import useToaster from '@/hooks/useToaster'
import Dialog from '@/components/Dialog'
import Toaster from '@/components/Toaster'
import ColorModeButton from '@/containers/ColorModeButton'

const App = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  )
  const [token, setToken] = useState<string>('')
  const [isOpen, setIsOpen] = useState(permission === 'default')

  const toaster = useToaster()

  const requestNotificationPermission = async () => {
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      setIsOpen(false)
    } catch (error) {
      console.error('Error getting notification permission: ', error)
    }
  }

  const ClipboardIconButton = () => {
    return (
      <Clipboard.Trigger asChild>
        <IconButton variant="surface" size="xs" me="-2" disabled={!token} aria-label="Copy to clipboard">
          <Clipboard.Indicator />
        </IconButton>
      </Clipboard.Trigger>
    )
  }
  useFcm()

  useEffect(() => {
    if (permission === 'default') {
      setIsOpen(true)
    }
  }, [permission])

  useEffect(() => {
    if (permission !== 'granted') return
    const generateToken = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        })
        if (token) {
          setToken(token)
          toaster.create({
            title: 'Registration token generated.',
            type: 'success',
            duration: 10000,
            description: 'Copy to clipboard?',
            action: {
              label: 'Copy',
              onClick: () => {
                navigator.clipboard.writeText(token)
              },
            },
          })
        } else {
          console.warn('No registration token available. Request permission to generate one.')
        }
      } catch (error) {
        console.error('Error when generating token: ', error)
      }
    }
    generateToken()
  }, [permission])

  return (
    <>
      <Dialog
        open={isOpen}
        title="Enable Notification"
        body={<p>{"We'd like to send you notifications. Tap 'Enable' to continue."}</p>}
        footer={<Button onClick={requestNotificationPermission}>Enable</Button>}
      />
      <Toaster toaster={toaster} />
      <Container>
        <Flex justifyContent="space-between" alignItems="center" py="2">
          <Heading>Firebase Cloud Messaging Playground</Heading>
          <ColorModeButton />
        </Flex>
        <Stack>
          <Clipboard.Root maxW="300px" value={token}>
            <Clipboard.Label textStyle="label">Registration Token</Clipboard.Label>
            <InputGroup endElement={<ClipboardIconButton />}>
              <Clipboard.Input asChild>
                <Input disabled={!token} />
              </Clipboard.Input>
            </InputGroup>
          </Clipboard.Root>
          {permission === 'denied' && (
            <Text fontSize="sm" color="red.500">
              Notification permission denied. Please enable it in your browser / device settings.
            </Text>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default App
