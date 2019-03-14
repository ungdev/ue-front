import React from 'react'
import { Table, Input } from 'antd'
import { fetchUEs } from '../../../../modules/ues'
import { connect } from 'react-redux'
import UEListActions from './components/UEListActions'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    props.fetchUEs()
  }
  render() {
    let { ues } = this.props
    if (!ues) ues = []
    const columns = [
      {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Titre',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        render: id => <UEListActions ueId={id} />
      }
    ]
    const data = ues
      .filter(ue => {
        let full = `${ue.name}${ue.title}`
        return (
          full.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        )
      })
      .map(ue => {
        return { ...ue, key: ue.id }
      })
    return (
      <React.Fragment>
        <h1>Liste des UEs</h1>
        <Input
          onChange={e => this.setState({ search: e.target.value })}
          placeholder='Rechercher une UE...'
          style={{ marginBottom: '20px' }}
        />
        <Table dataSource={data} columns={columns} />
      </React.Fragment>
    )
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
