import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const { Sider } = Layout
const { SubMenu } = Menu

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    let current = 'home'
    let openKeys = []
    this.state = { current, openKeys, collapsed: false }
  }

  static getDerivedStateFromProps(props, state) {
    let tab = props.location.split('/dashboard/')
    if (tab[1] && state.current !== tab[1]) {
      const tab2 = tab[1].split('/')
      let openKeys = []
      if (tab2.length > 1) {
        openKeys.push(tab2[0])
      }
      return { current: tab[1], openKeys }
    }
    return null
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleClick = e => {
    this.setState({
      current: e.key
    })
  }
  render() {
    return (
      <Sider breakpoint='lg' collapsedWidth='0' width={250}>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[this.state.current]}
          defaultOpenKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
        >
          <Menu.Item key='home'>
            <Link to={'/dashboard/home'}>
              <Icon type='home' />
              <span className='nav-text'>Accueil</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='ues'>
            <Link to={'/dashboard/ues'}>
              <Icon type='bars' />
              <span className='nav-text'>Liste des UEs</span>
            </Link>
          </Menu.Item>

          {/* MENU USER */}
          <SubMenu
            key='ue'
            title={
              <span>
                <Icon type='user' />
                <span>UE</span>
              </span>
            }
          >
            <Menu.Item key='ue/create'>
              <Link to={'/dashboard/ue/create'}>
                <Icon type='file' />
                <span className='nav-text'>Créer une UE</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname
})

export default connect(
  mapStateToProps,
  null
)(LeftBar)
