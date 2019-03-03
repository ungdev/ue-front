import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { contactEtuutt, getToken } from '../../modules/login'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      render: true //set to false when login will be ready
    }
  }

  componentWillMount() {
    console.log('mount', this.props.location)
    if (this.props.location === '/etuutt/redirect') {
      console.log('gettoken')
      this.props.getToken(
        this.props.history.location.search.split('&code')[0].split('=')[1]
      )
    }
    /*this.props.autoLogin().then(() => { //uncomment when login will be ready
      this.setState({
        render: this.props.user && this.props.user.email
      })
    })*/
  }

  contactEtuutt = () => this.props.contactEtuutt()
  render() {
    return (
      <Button type='primary' onClick={this.contactEtuutt}>
        Se connecter
      </Button>
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname
  //user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  //autoLogin: () => dispatch(autoLogin()),
  contactEtuutt: () => dispatch(contactEtuutt()),
  getToken: code => dispatch(getToken(code))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
