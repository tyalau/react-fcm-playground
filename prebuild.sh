echo "Generating FCM service worker..."
node scripts/generate-fcm-sw.js

echo "Building notification utilities..."
node scripts/build-notification-utils.js

echo "Prebuild complete"
