import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import DashboardLoading from './components/Loading'
import DashboardHome from './components/Accueil'
import DashboardLayout from './layout'

//  pages

import ListUEs from './components/UE/List'
import CreateUE from './components/UE/Create'
import UEDetails from './components/UE/components/UEDetails'

import ListAttributes from './components/Attribute/List'

import CurriculumsTree from './components/Curriculums/Tree'



//  redux
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
          <Route path={baseUrl + 'ues/create'} exact component={CreateUE} />
        )}
        {this.state.render && (
          <Route path={baseUrl + 'ues/:id'} exact component={UEDetails} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'attributes'} exact component={ListAttributes} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'curriculums'} exact component={CurriculumsTree} />
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
