import React from 'react'
import { Table, Icon, Tooltip } from 'antd'

class CurriculumsList extends React.Component {
  render() {
    const { curriculums } = this.props
    const columns = [
      {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: id => (
          <Tooltip placement='top' title="Supprimer le cursus">
            <a
              onClick={() => this.props.removeCurriculums(id)}
              style={{ fontSize: '18px' }}
            >
              <Icon type='delete' />
            </a>
          </Tooltip>
        )
      }
    ]
    const data = curriculums.map(a => {
      return { ...a, key: a.id }
    })
    return (
      <Table
        dataSource={data}
        columns={columns}
        locale={{ emptyText: 'Aucun curus' }}
      />
    )
  }
}

export default CurriculumsList
