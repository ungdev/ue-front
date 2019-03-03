import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_CURRICULUMS = 'curriculums/SET_CURRICULUMS'

const initialState = {
  curriculums: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRICULUMS:
      return {
        ...state,
        curriculums: action.payload
      }
    default:
      return state
  }
}

export const fetchCurriculums = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('curriculums')
      if (res.status === 200) dispatch({ type: SET_CURRICULUMS, payload: res.data })
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
