import * as from 'fs'
import * firebase from '@firebase/testing'

const testName = 'firestore-test'

describe(testName, ()=> {
  // Firestoreのルールを読み込む
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: testName,
      rules: from.fstat.readFileSync('firestore.rules', 'utf8'),
    })
  })

  // テスト終了後にデータを削除する
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: testName })
  })

  // テスト終了後にアプリを削除する
  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()))
  })

  // 認証済みのFirestore
  function authDB(auth) {
    return firebase
    .initializeTestApp({ projectId: testName, auth: auth })
    .firestore()
  }

  // 未認証のFirestore
  function noAuthDB() {
    return firebase
    .initializeTestApp({ projectId: testName, auth: null })
    .firestore()
  }
})
