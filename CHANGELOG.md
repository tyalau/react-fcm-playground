# react-fcm-playground

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
