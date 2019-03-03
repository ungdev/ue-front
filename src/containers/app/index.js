import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Notifs as Notifications } from 'redux-notifications'
import 'antd/dist/antd.css'

import asyncComponent from '../../components/async'
import Login from '../login/Login'

const Dashboard = asyncComponent(() => import('../dashboard/Dashboard'))

const App = props => {
  return (
    <div style={{ height: '100%' }}>
      <Notifications />
      <Switch>
        <Route path={process.env.REACT_APP_BASEURL} exact component={Login} />
        <Route
          path={process.env.REACT_APP_BASEURL + 'etuutt/redirect'}
          component={Login}
        />
        <Route
          path={process.env.REACT_APP_BASEURL + 'dashboard'}
          component={Dashboard}
        />
        <Redirect from='*' to='/' />
      </Switch>
    </div>
  )
}

const mapStateToProps = state => ({
  //auth: state.user.user
})

export default connect(mapStateToProps)(App)
