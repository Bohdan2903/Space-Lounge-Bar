import { ActionType } from './model'
import { Action } from '../model'
import createReducer from '../createReducer'

export interface ICommonReducer {
  lang: string
  employers:any
}

const defaultState: ICommonReducer = {
  lang: 'en',
  employers:null
}

export const commonReducer = createReducer<ICommonReducer>(defaultState, {
  [ActionType.SET_EMPLOYERS](state: ICommonReducer, action: Action<any>) {
    return { ...state, employers: action.payload }
  },
})
