import React from 'react'
import { Table, Icon, Tooltip } from 'antd'

class RequiredsList extends React.Component {
  render() {
    const { requireds } = this.props
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
          <Tooltip placement='top' title="Supprimer le prérequis">
            <a
              onClick={() => this.props.removeRequired(id)}
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
        dataSource={requireds}
        columns={columns}
        rowKey='id'
        locale={{ emptyText: 'Aucun prérequis' }}
        pagination={requireds.length > 10}
      />
    )
  }
}

export default RequiredsList
