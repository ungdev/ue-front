import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import ues from './ues'
import versions from './versions'
import login from './login'
import user from './user'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  ues,
  versions,
  login,
  user
})
