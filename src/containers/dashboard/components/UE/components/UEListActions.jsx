import React from 'react'
import { Icon, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class UEListActions extends React.Component {
  render() {
    const { ueId } = this.props

    return (
      <React.Fragment>
        <Tooltip placement='top' title="Voir le détail de l'UE" key={ueId}>
          <a
            onClick={() => this.props.goToUE(ueId)}
            style={{ fontSize: '18px' }}
          >
            <Icon type='eye' />
          </a>
        </Tooltip>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  goToUE: id => dispatch(push(`/dashboard/ues/${id}`))
})

export default connect(
  null,
  mapDispatchToProps
)(UEListActions)
