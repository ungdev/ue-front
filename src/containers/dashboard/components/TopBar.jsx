import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import utt from './assets/utt.jpg'
import { logout } from '../../../modules/login'
const { Header } = Layout

class TopBar extends React.Component {
  render() {
    return (
      <Header className='header'>
        <div className='logo'>
          <img src={utt} alt='' />
          <span>Guide des UEs</span>
        </div>

        <Menu
          theme='dark'
          mode='horizontal'
          style={{ lineHeight: '64px', float: 'right' }}
        >
          <Menu.Item key='1' onClick={this.props.disconnect}>
            <div>
              <Icon type='logout' /> Déconnexion
            </div>
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  disconnect: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)
