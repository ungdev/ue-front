import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import DashboardHome from './components/Accueil'
import DashboardLoading from './components/Loading'
import ListUEs from './components/UE/List'
import UEDetails from './components/UE/components/UEDetails'
import DashboardLayout from './layout'
import { autoLogin } from '../../modules/login'

import './dashboard.css'

const baseUrl = process.env.REACT_APP_BASEURL + 'dashboard/'

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      render: false
    }
  }

  componentWillMount() {
    this.props.autoLogin().then(() => {
      this.setState({
        render: this.props.user && this.props.user
      })
    })
  }

  render() {
    const component = (
      <Switch>
        {this.state.render && (
          <Route path={baseUrl + 'home'} exact component={DashboardHome} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'ues'} exact component={ListUEs} />
        )}
        {this.state.render && (
          <Route path={baseUrl + 'ues/:id'} exact component={UEDetails} />
        )}

        {this.state.render && <Redirect from='*' to='/dashboard/home' />}
        {!this.state.render && <DashboardLoading />}
      </Switch>
    )
    return (
      <DashboardLayout
        path={this.state.pathname}
        component={component}
        style={{ height: '100%' }}
      />
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
