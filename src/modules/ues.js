import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_UES = 'ues/SET_UES'

const initialState = {
  ues: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UES:
      return {
        ...state,
        ues: action.payload
      }
    default:
      return state
  }
}

export const fetchUEs = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get('ues')
      if (req.status === 200) dispatch({ type: SET_UES, payload: req.data })
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
