import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_PERIODS = 'periods/SET_PERIODS'

const initialState = {
  periods: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PERIODS:
      return {
        ...state,
        periods: action.payload
      }
    default:
      return state
  }
}

export const fetchPeriods = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('periods')
      if (res.status === 200) dispatch({ type: SET_PERIODS, payload: res.data })
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}
