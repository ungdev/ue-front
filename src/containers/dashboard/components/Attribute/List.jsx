import React from 'react'
import { Table, Spin, Button } from 'antd'
import { fetchAttributes } from '../../../../modules/attributes'
import { createAttribute } from '../../../../modules/attributes'
import { connect } from 'react-redux'
import AttributeListActions from './components/AttributeListActions'
import CreateModal from './components/CreateModal'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    props.fetchAttributes()
  }

  createAttribute = values => {
    this.props.createAttribute(values)
    this.setState({ modal: false })
  }

  render() {
    const { attributes } = this.props
    if (!attributes) return <Spin />

    const columns = [
      {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        render: id => (
          <AttributeListActions attributeId={id} attributes={attributes} />
        )
      }
    ]
    const data = attributes.map(attribute => {
      return { ...attribute, key: attribute.id }
    })
    return (
      <React.Fragment>
        <h1>Gestion des Attributs</h1>
        <Button
          type='primary'
          onClick={() => this.setState({ modal: true })}
          style={{ marginBottom: '20px' }}
        >
          Ajouter un attribut
        </Button>
        <Table dataSource={data} columns={columns} />
        <CreateModal
          visible={this.state.modal}
          returnValue={this.createAttribute}
          onCancel={() => this.setState({ modal: false })}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  attributes: state.attributes.attributes
})

const mapDispatchToProps = dispatch => ({
  fetchAttributes: () => dispatch(fetchAttributes()),
  createAttribute: values => dispatch(createAttribute(values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
