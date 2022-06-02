const firebaseAdmin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')

const { FIREBASE_ACCOUNT_CONFIG, DEPLOYMENT_BUCKET } = process.env
const serviceAccount = JSON.parse(FIREBASE_ACCOUNT_CONFIG)

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
})

const storageRef = admin.storage().bucket(DEPLOYMENT_BUCKET)

const uploadFile = async ({ path, filename }) => {
  // Upload the File
  const storage = await storageRef.upload(path, {
    public: true,
    destination: `/uploads/hashnode/${filename}`,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    },
  })

  return storage[0].metadata.mediaLink
}

const run = async () => {
  const url = await uploadFile({
    path: './mypic.png',
    filename: 'my-image.png',
  })
  console.log(url)
}

run()
