import esbuild from 'esbuild'

esbuild
  .build({
    entryPoints: ['src/utils/notification.ts'],
    bundle: true,
    format: 'iife', // support importScripts
    platform: 'browser',
    outfile: 'public/utils/notification.js', // make sure this is accessible
    globalName: 'NotificationUtils', // exported as global object
  })
  .catch(() => process.exit(1))
