import { useEffect, useState } from 'react'
import { Button, Clipboard, Container, Field, Flex, Heading, IconButton, Input, InputGroup, Stack, Text } from '@chakra-ui/react'
import { getToken } from 'firebase/messaging'
import { useForm, Controller } from 'react-hook-form'
import { Message } from '@/types/notification'
import { messaging } from '@/lib/firebase'
import useFcm from '@/hooks/useFcm'
import useToaster from '@/hooks/useToaster'
import Dialog from '@/components/Dialog'
import JsonSnippet from '@/components/JsonSnippet'
import Toaster from '@/components/Toaster'
import ColorModeButton from '@/containers/ColorModeButton'

const App = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  )
  const [isOpen, setIsOpen] = useState(permission === 'default')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<Message>({
    defaultValues: {
      token: '',
      notification: {
        title: '',
      },
    },
  })

  const onSubmit = handleSubmit((data) => {
    const formatted = JSON.stringify(formatFormValues(data), null, 2)
    navigator.clipboard.writeText(formatted)
    toaster.create({
      title: 'Success!',
      type: 'success',
      duration: 3000,
      description: 'JSON payload copied to clipboard.',
      closable: true,
    })
  })

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

  const formValues = watch()

  const ClipboardIconButton = () => {
    return (
      <Clipboard.Trigger asChild>
        <IconButton variant="surface" size="xs" me="-2" disabled={!formValues.token} aria-label="Copy to clipboard">
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
          setValue('token', token)
          toaster.create({
            title: 'Registration token generated.',
            type: 'success',
            duration: 5000,
            description: 'Copy to clipboard?',
            action: {
              label: 'Copy',
              onClick: () => {
                navigator.clipboard.writeText(token)
              },
            },
            closable: true,
          })
        } else {
          console.warn('No registration token available. Request permission to generate one.')
          throw new Error('No registration token available')
        }
      } catch (error) {
        console.error('Error when generating token: ', error)
        toaster.create({
          title: 'Error',
          type: 'error',
          duration: 10000,
          description: 'Unable to generate registration token.',
        })
      }
    }
    generateToken()
  }, [permission])

  const formatFormValues = (data: Message) => {
    const result = {
      message: {
        ...data,
        notification: {
          ...data.notification,
          body: data.notification?.body || undefined,
        },
      },
    }
    if (data.notification?.body === '') {
      delete result.message.notification.body
    }
    return result
  }

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
        <Stack gap="4" as="form" onSubmit={onSubmit}>
          <Stack>
            <Controller
              control={control}
              name="token"
              render={({ field: { value } }) => (
                <Clipboard.Root maxW="300px" value={value}>
                  <Clipboard.Label textStyle="label">Registration Token</Clipboard.Label>
                  <InputGroup endElement={<ClipboardIconButton />}>
                    <Clipboard.Input asChild>
                      <Input disabled={!value} />
                    </Clipboard.Input>
                  </InputGroup>
                </Clipboard.Root>
              )}
            />
            <Text fontSize="sm" color="red.500">
              {permission === 'denied'
                ? 'Notification permission denied. Please enable it in your browser / device settings.'
                : ' '}
            </Text>
          </Stack>
          <Field.Root invalid={!!errors.notification?.title} required>
            <Field.Label>
              Title <Field.RequiredIndicator />
            </Field.Label>
            <Input
              {...register('notification.title', {
                required: 'Title is required',
                onChange: () => trigger('notification.title'),
              })}
            />
            <Field.ErrorText>{errors.notification?.title?.message ?? ''}</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Body</Field.Label>
            <Input {...register('notification.body')} />
          </Field.Root>
          <JsonSnippet code={formatFormValues(formValues)} />
          <div>
            <Button type="submit">Copy</Button>
          </div>
        </Stack>
      </Container>
    </>
  )
}

export default App
