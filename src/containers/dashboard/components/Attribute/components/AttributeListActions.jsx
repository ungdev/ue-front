import React from 'react'
import { Icon, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'
import { deleteAttribute, editAttribute } from '../../../../../modules/attributes'
import EditModal from './CreateModal'

const confirm = Modal.confirm

class AttributeListActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  editAttribute = values => {
    this.props.editAttribute(this.props.attributeId, values.name)
    this.setState({ modal: false })
  }

  showDeleteConfirm = () => {
    confirm({
      title: 'Voulez-vous vraiment supprimer cet Attribut ?',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk: () => {
        this.props.deleteAttribute(this.props.attributeId)
      },
      onCancel() {}
    })
  }
  render() {
    const { attributeId, attributes } = this.props
    const name = attributes.find(attribute => attribute.id === attributeId).name
    return (
      <React.Fragment>
        <Tooltip placement='top' title='Supprimer cet attribut'>
          <a onClick={this.showDeleteConfirm} style={{ fontSize: '18px' }}>
            <Icon type='cross' />
          </a>
        </Tooltip>
        <Tooltip placement='top' title='Modifier cet attribut'>
          <a
            onClick={() => this.setState({ modal: true })}
            style={{ fontSize: '18px' }}
          >
            <Icon type='edit' />
          </a>
        </Tooltip>
        <EditModal
          visible={this.state.modal}
          returnValue={this.editAttribute}
          previousName={name}
          onCancel={() => this.setState({ modal: false })}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteAttribute: id => dispatch(deleteAttribute(id)),
  editAttribute: (id, name) => dispatch(editAttribute(id, name))
})

export default connect(
  null,
  mapDispatchToProps
)(AttributeListActions)
