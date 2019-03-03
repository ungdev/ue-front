import React from 'react'
import { Table, Icon, Tooltip } from 'antd'

class AttributesList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { attributes } = this.props
    console.log(attributes)

    const columns = [
      {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Valeur',
        dataIndex: 'value',
        key: 'value'
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: id => (
          <Tooltip placement='top' title="Supprimer l'attribut">
            <a
              onClick={() => this.props.removeAttribute(id)}
              style={{ fontSize: '18px' }}
            >
              <Icon type='delete' />
            </a>
          </Tooltip>
        )
      }
    ]
    const data = attributes.map(a => {
      return { ...a, key: a.id }
    })
    return (
      <Table
        dataSource={data}
        columns={columns}
        locale={{ emptyText: 'Aucun attributs' }}
      />
    )
  }
}

export default AttributesList
