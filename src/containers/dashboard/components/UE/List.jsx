import React from 'react'
import { Table, Spin } from 'antd'
import { fetchUEs } from '../../../../modules/ues'
import { connect } from 'react-redux'
import UEListActions from './components/UEListActions'

class List extends React.Component {
  constructor(props) {
    super(props)
    props.fetchUEs()
  }
  render() {
    const { ues } = this.props
    if (!ues) return <Spin />

    const columns = [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        render: id => <UEListActions ueId={id} />
      }
    ]
    const data = ues.map(ue => {
      return { ...ue, key: ue.id }
    })
    return <Table dataSource={data} columns={columns} />
  }
}

const mapStateToProps = state => ({
  ues: state.ues.ues
})

const mapDispatchToProps = dispatch => ({
  fetchUEs: () => dispatch(fetchUEs())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
