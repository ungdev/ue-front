import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import attributes from './attributes'
import curriculums from './curriculums'
import login from './login'
import periods from './periods'
import ues from './ues'
import user from './user'
import versions from './versions'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  attributes,
  curriculums,
  login,
  periods,
  ues,
  user,
  versions
})
