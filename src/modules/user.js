import axios from '../lib/axios'
//import errorToString from '../lib/errorToString'
//import { actions as notifActions } from 'redux-notifications'
import { logout } from './login'

export const SET_USER = 'user/SET_USER'

const initialState = {
  user: null,
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('etuutt/user', { headers: { 'X-Token': authToken } })
      dispatch({ type: SET_USER, payload: res.data })
    } catch (err) {
      dispatch(logout())
    }
  }
}
