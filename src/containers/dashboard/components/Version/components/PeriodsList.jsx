import React from 'react'
import { Tag, Icon } from 'antd'
import PeriodsModal from './PeriodsModal'

class PeriodsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      periodsModal: false
    }
  }
  render() {
    const { periods, allPeriods } = this.props
    return (
      <div style={{ marginBottom: '20px' }}>
        {periods.map(period => (
          <Tag
            key={period.id}
            closable={true}
            afterClose={() => this.props.removePeriod(period.id)}
            onClick={() => this.props.removePeriod(period.id)}
            color='geekblue'
          >
            {period.name}
          </Tag>
        ))}
        <Tag
          onClick={() => this.setState({ periodsModal: true })}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type='plus' /> Ajouter une période
        </Tag>
        <PeriodsModal
          visible={this.state.periodsModal}
          onCancel={() => this.setState({ periodsModal: false })}
          returnValue={values => {
            this.props.addPeriod(values)
            this.setState({ periodsModal: false })
          }}
          periods={allPeriods}
          versionPeriods={periods}
        />
      </div>
    )
  }
}

export default PeriodsList
