import React from 'react'
import { Icon, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'
import { deletePeriod, editPeriod } from '../../../../../modules/periods'
import EditModal from './CreateModal'

const confirm = Modal.confirm

class PeriodListActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  editPeriod = values => {
    this.props.editPeriod(this.props.periodId, values.name)
    this.setState({ modal: false })
  }

  showDeleteConfirm = () => {
    confirm({
      title: 'Voulez-vous vraiment supprimer cette période ?',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk: () => {
        this.props.deletePeriod(this.props.periodId)
      },
      onCancel() {}
    })
  }
  render() {
    const { periodId, periods } = this.props
    const name = periods.find(period => period.id === periodId).name
    return (
      <React.Fragment>
        <Tooltip placement='top' title='Supprimer cette période ?'>
          <a onClick={this.showDeleteConfirm} style={{ fontSize: '18px' }}>
            <Icon type='cross' />
          </a>
        </Tooltip>
        <Tooltip placement='top' title='Modifier cette période'>
          <a
            onClick={() => this.setState({ modal: true })}
            style={{ fontSize: '18px' }}
          >
            <Icon type='edit' />
          </a>
        </Tooltip>
        <EditModal
          visible={this.state.modal}
          returnValue={this.editPeriod}
          previousName={name}
          onCancel={() => this.setState({ modal: false })}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deletePeriod: id => dispatch(deletePeriod(id)),
  editPeriod: (id, name) => dispatch(editPeriod(id, name))
})

export default connect(
  null,
  mapDispatchToProps
)(PeriodListActions)
