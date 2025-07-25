# react-fcm-playground

## 1.0.1

### Patch Changes

- bec205b: Add API Explorer button and refactor notification logic

  - Added button to open API Explorer in a new tab
  - Merged useEffect hooks handling notification permission and token generation
  - Updated toaster props for improved feedback

- 5d22f8b: Add Message Type Info Tip

  - Exported JsonSnippet as a default function
  - Added Link component with external link support and tests
  - Wrapped render functions into act(...) in tests
  - Added support for renderring RadioCard label as ReactNode
  - Added ToggltTip component and tests
  - Added Info Tip for Message Type

- c09e6b7: Add Support for Composing Data Message

  - Added RadioCard component and added related tests
  - Added form field for setting key and value pairs for data message

- 2c29fbb: Allow Customizing Data Message

  - Implemented notification utils for converting data payload into a notification
  - Added prebuild script to build the utils for service worker
  - Updated README and add comments accordingly

- d527dee: Enhanced Form Handling and UI Feedback

  - Added handling for missing registration token with error feedback
  - Added JsonSnippet component with tests for JSON display
  - Replaced manual state management with `react-hook-form`
  - Added form for composing notification messages

## 1.0.0

### Major Changes

- 04b6e4e: Set up FCM Client

  - Implemented FCM service worker
  - Added a script to generate the service worker using environment variables
  - Added notification permission request prompt
  - Implemented registration token retrieval

### Patch Changes

- 1ddb01f: Updated README and Clean Up

  - Updated README
  - Removed unused image (`react.svg`)
  - Updated `index.html` document title with app name

- ec4f2f7: Updated UI regarding Notifcation Permission

  - Added fix to ensure notification permission state is compatible across platforms
  - Updated modal message

- ed62f3c: Implemented FCM token UI with Chakra UI

  - Built UI using Chakra UI components
  - Displayed a toast when FCM token is successfully retrieved
  - Enabled copying the FCM token to clipboard
  - Added test cases for newly created components
