import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_ATTRIBUTES = 'attributes/SET_ATTRIBUTES'

const initialState = {
  attributes: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.payload
      }
    default:
      return state
  }
}

export const fetchAttributes = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('attributes')
      if (res.status === 200) dispatch({ type: SET_ATTRIBUTES, payload: res.data })
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
