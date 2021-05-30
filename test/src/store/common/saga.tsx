import { put, takeLatest, fork } from 'redux-saga/effects'
import { ActionType } from './model'
import { Action } from '../model'
import { createApiCall } from '../../api'

export function* changeLangSaga(): Generator {
  yield takeLatest(ActionType.GET_EMPLOYERS, function* (action: Action) {
    try {
      const { data } = yield createApiCall({ url: `/users` })
      yield put({ type: ActionType.SET_EMPLOYERS, payload: data })
    }catch (e){
      console.log(e)
    }
  })
}
// eslint-disable-next-line
export default [fork(changeLangSaga)]
