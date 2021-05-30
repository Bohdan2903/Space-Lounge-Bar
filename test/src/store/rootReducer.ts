import { History } from 'history'
import { combineReducers } from 'redux'
import { routerReducer, RouterState } from 'react-router-redux'
import { commonReducer, ICommonReducer } from './common/reducer'

export interface RootState {
  common: ICommonReducer
  routerReducer: RouterState
}

export default (history: History): any =>
  combineReducers({
    common: commonReducer,
    routerReducer,
  })
