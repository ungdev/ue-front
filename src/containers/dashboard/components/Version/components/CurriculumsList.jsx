import React from 'react'
import { Tag, Icon } from 'antd'
import CurriculumsModal from './CurriculumsModal'

class CurriculumsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curriculums: props.curriculums,
      curriculumsModal: false
    }
  }
  render() {
    const { curriculums } = this.state
    return (
      <div style={{ marginBottom: '20px' }}>
        {curriculums.map(curriculum => (
          <Tag
            key={curriculum.id}
            closable={true}
            afterClose={() => this.props.removeCurriculum(curriculum.id)}
            onClick={() => this.props.removeCurriculum(curriculum.id)}
            color='geekblue'
          >
            {curriculum.name}
          </Tag>
        ))}
        <Tag
          onClick={() => this.setState({ curriculumsModal: true })}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type='plus' /> Ajouter un cursus
        </Tag>
        <CurriculumsModal
          visible={this.state.curriculumsModal}
          onCancel={() => this.setState({ curriculumsModal: false })}
          returnValue={this.props.addCurriculums}
          curriculums={this.props.allCurriculums}
          versionCurriculums={this.state.curriculums}
        />
      </div>
    )
  }
}

export default CurriculumsList
