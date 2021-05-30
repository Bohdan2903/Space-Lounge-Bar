import { all } from 'redux-saga/effects'

import commonSagas from './common/saga'

export default function* startSaga(): Generator {
  yield all([...commonSagas])
}
