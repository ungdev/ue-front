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
  return async dispatch => {
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

export const createUE = ue => {
  return async dispatch => {
    try {
      const res = await axios.post(`/ues`, ue)
      if (res.status === 200) {
        const res2 = await axios.post(`/ues/${res.data.id}/versions`, ue)
        if (res2.status === 200) dispatch(fetchUEs())
      }
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
