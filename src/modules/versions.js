import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_VERSIONS = 'versions/SET_VERSIONS'
export const ADD_VERSION = 'versions/ADD_VERSION'

const initialState = {
  versions: []
}

export default (state = initialState, action) => {
  let versions = []
  switch (action.type) {
    case SET_VERSIONS:
      return {
        ...state,
        versions: action.payload
      }
    case ADD_VERSION:
      versions = state.versions.slice()
      const index = versions.findIndex(version => version.id === action.payload.id)
      if(index === -1) versions.push(action.payload)
      else versions[index] = action.payload
      return {
        ...state,
        versions
      }
    default:
      return state
  }
}

export const fetchLastUEVersion = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/ues/${id}/versions/last`)
      if (res.status === 200) dispatch({ type: ADD_VERSION, payload: res.data })
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
export const createVersion = (id, version) => {
  return async dispatch => {
    try {
      const res = await axios.post(`/ues/${id}/versions`, version)
      if (res.status === 200) dispatch(fetchLastUEVersion(id))
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
