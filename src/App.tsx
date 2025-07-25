import { useEffect, useState } from 'react'
import {
  Button,
  Clipboard,
  Container,
  Field,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getToken } from 'firebase/messaging'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { IoIosAdd } from 'react-icons/io'
import { LuExternalLink, LuInfo } from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'
import { MessageForm, MessageType, NotificationMessage } from '@/types/notification'
import { messaging } from '@/lib/firebase'
import useFcm from '@/hooks/useFcm'
import useToaster from '@/hooks/useToaster'
import Dialog from '@/components/Dialog'
import JsonSnippet from '@/components/JsonSnippet'
import Link from '@/components/Link'
import RadioCard from '@/components/RadioCard'
import Toaster from '@/components/Toaster'
import ColorModeButton from '@/containers/ColorModeButton'
import ToggleTip from './components/ToggleTip'

const App = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  )
  const [isOpen, setIsOpen] = useState(permission === 'default')
  const [messageType, setMessageType] = useState<MessageType>('notification')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm<MessageForm>({
    defaultValues: {
      token: '',
      notification: {
        title: '',
      },
      data: [
        {
          key: '',
          value: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
  })

  const onSubmit = handleSubmit((data) => {
    const formatted = JSON.stringify(getMessagePayload(data), null, 2)
    navigator.clipboard.writeText(formatted)
    toaster.create({
      title: 'Success!',
      type: 'success',
      duration: 5000,
      description: 'JSON payload copied to clipboard.',
      closable: true,
    })
  })

  const toaster = useToaster()

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
      return
    }

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
          duration: 5000,
          description: 'Unable to generate registration token.',
          closable: true,
        })
      }
    }
    generateToken()
  }, [permission])

  const requestNotificationPermission = async () => {
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      setIsOpen(false)
    } catch (error) {
      console.error('Error getting notification permission: ', error)
    }
  }

  const getMessagePayload = (formData: MessageForm) => {
    let message: { data?: unknown } | { notification?: NotificationMessage } = {}
    if (messageType === 'notification') {
      message = {
        notification: {
          title: formData.notification.title,
          body: formData.notification.body,
        },
      }
      if (formData.notification.body === '') {
        delete message.notification?.body
      }
    } else if (messageType === 'data') {
      message = {
        data: formData.data.reduce(
          (result, item) => {
            if (item.key !== '') {
              result[item.key] = item.value
            }
            return result
          },
          {} as Record<string, string>
        ),
      }
    }
    return {
      message: {
        token: formData.token,
        ...message,
      },
    }
  }

  const openApiExplorerUrl = () => {
    try {
      // unlikely to happen
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
      if (!projectId) throw new Error('Missing FIREBASE_PROJECT_ID')

      const payload = getMessagePayload(formValues)
      if (!payload) throw new Error('Invalid message payload')

      const params = {
        parent: `projects/${projectId}`,
        resource: payload,
      }

      const encodedParams = encodeURIComponent(JSON.stringify(params))
      const url = `https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages/send?apix_params=${encodedParams}`

      window.open(url, '_blank')
    } catch (error) {
      console.error('Failed to open API Explorer:', error)
      toaster.create({
        title: 'Failed to open API Explorer',
        type: 'error',
        duration: 5000,
        description: 'Please check your configuration.',
        closable: true,
      })
    }
  }

  // get the latest error message for data fields
  const dataMessageError = Array.isArray(errors.data)
    ? errors.data.reverse().find((field) => field?.key?.message)?.key?.message
    : undefined

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
          <RadioCard
            label={
              <HStack alignItems="center" gap="1">
                Message Type
                <ToggleTip
                  icon={<LuInfo />}
                  content={
                    <Text>
                      FCM offers a broad range of messaging options and capabilities.{' '}
                      <Link
                        href="https://firebase.google.com/docs/cloud-messaging/concept-options#notifications_and_data_messages"
                        isExternal
                      >
                        Read more
                      </Link>
                    </Text>
                  }
                  positioning={{ placement: 'right-start' }}
                />
              </HStack>
            }
            value={messageType}
            onValueChange={(e) => setMessageType(e.value as MessageType)}
            items={[
              {
                value: 'notification',
                title: 'Notification',
                description: 'Handled by the FCM SDK automatically',
              },
              {
                value: 'data',
                title: 'Data',
                description: 'Handled by the client app',
              },
            ]}
          />
          {messageType === 'notification' && (
            <>
              <Field.Root invalid={!!errors.notification?.title} required={messageType === 'notification'}>
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
            </>
          )}
          {messageType === 'data' && (
            <>
              <Stack gap="2">
                <HStack justifyContent="space-between" alignItems="center">
                  <Heading size="sm">Payload</Heading>
                  <Button
                    type="button"
                    variant="surface"
                    size="xs"
                    onClick={() => {
                      append({ key: '', value: '' })
                    }}
                  >
                    <IoIosAdd />
                    Key-Value Pair
                  </Button>
                </HStack>
                {fields.map((field, index) => {
                  return (
                    <HStack gap="2" width="full" key={field.id} alignItems="flex-end">
                      <Field.Root
                        required={messageType === 'data'}
                        invalid={Array.isArray(errors?.data) && errors.data.some((f) => !!f.key?.message)}
                      >
                        {index === 0 && <Field.Label>Key</Field.Label>}

                        <Input
                          {...register(`data.${index}.key`, {
                            required: 'Key is required.',
                            validate: (value) => {
                              const duplicated = watch('data').find((f, i) => f.key === value && i !== index)
                              if (duplicated) {
                                return 'Each key must be unique.'
                              }
                              return true
                            },
                            onChange: () => trigger('data'),
                          })}
                        />
                      </Field.Root>
                      <Field.Root>
                        {index === 0 && <Field.Label>Value</Field.Label>}
                        <Input {...register(`data.${index}.value`)} />
                      </Field.Root>
                      <IconButton
                        variant="surface"
                        disabled={fields.length === 1}
                        onClick={() => {
                          remove(index)
                          trigger('data')
                        }}
                      >
                        <MdDeleteOutline />
                      </IconButton>
                    </HStack>
                  )
                })}
              </Stack>
              {dataMessageError && (
                <Text fontSize="sm" color="red.500">
                  {dataMessageError}
                </Text>
              )}
            </>
          )}

          <JsonSnippet code={getMessagePayload(formValues)} />
          <HStack gap={2} pb={4}>
            <Button type="submit">Copy</Button>
            <Button type="button" variant="outline" disabled={!isValid} onClick={openApiExplorerUrl}>
              Try in API Explorer
              <LuExternalLink />
            </Button>
          </HStack>
        </Stack>
      </Container>
    </>
  )
}

export default App
