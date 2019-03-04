import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { contactEtuutt, getToken } from '../../modules/login'
import './login.css'
import utt from '../../assets/uttlogo.jpg'
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      render: true //set to false when login will be ready
    }
  }

  componentWillMount() {
    if (this.props.location === '/etuutt/redirect') {
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
      <div className='main'>
        <img className='logo' src={utt} alt='' />
        <Button type='primary' size='large' onClick={this.contactEtuutt}>
          Se connecter
        </Button>
      </div>
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
