import React from 'react'
import { Table, Spin, Button } from 'antd'
import { fetchPeriods } from '../../../../modules/periods'
import { createPeriod } from '../../../../modules/periods'
import { connect } from 'react-redux'
import PeriodListActions from './components/PeriodListActions'
import CreateModal from './components/CreateModal'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    props.fetchPeriods()
  }

  createPeriod = values => {
    this.props.createPeriod(values)
    this.setState({ modal: false })
  }

  render() {
    const { periods } = this.props
    if (!periods) return <Spin />

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
          <PeriodListActions periodId={id} periods={periods} />
        )
      }
    ]
    const data = periods.map(period => {
      return { ...period, key: period.id }
    })
    return (
      <React.Fragment>
        <h1>Gestion des Périodes</h1>
        <Button
          type='primary'
          onClick={() => this.setState({ modal: true })}
          style={{ marginBottom: '20px' }}
        >
          Ajouter une Période
        </Button>
        <Table dataSource={data} columns={columns} />
        <CreateModal
          visible={this.state.modal}
          returnValue={this.createPeriod}
          onCancel={() => this.setState({ modal: false })}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  periods: state.periods.periods
})

const mapDispatchToProps = dispatch => ({
  fetchPeriods: () => dispatch(fetchPeriods()),
  createPeriod: values => dispatch(createPeriod(values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
