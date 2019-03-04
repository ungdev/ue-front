import React from 'react'
import { Table, Icon, Tooltip } from 'antd'

class AttributesList extends React.Component {
  render() {
    const { attributes } = this.props
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
    return (
      <Table
        dataSource={attributes}
        columns={columns}
        rowKey='id'
        locale={{ emptyText: 'Aucun attributs' }}
        pagination={attributes.length > 10}
      />
    )
  }
}

export default AttributesList
