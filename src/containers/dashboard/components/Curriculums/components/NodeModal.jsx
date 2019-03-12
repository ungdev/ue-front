import React from 'react'
import { Modal, Tag, Input, Icon, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { addChild, removeChild } from '../../../../../modules/curriculums'

class NodeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVisible: false,
      inputValue: ''
    }
  }
  handleClose = removedTag => {
    const { curriculum } = this.props
    this.props.removeChild(curriculum.key, curriculum.pos, removedTag.key)
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { curriculum } = this.props
    const { inputValue } = this.state
    let found = curriculum.children.find(c => c.title === inputValue)
    if (!found) {
      this.props.addChild(curriculum.key, curriculum.pos, inputValue)
    }
    this.setState({
      inputVisible: false,
      inputValue: ''
    })
  }

  saveInputRef = input => (this.input = input)
  render() {
    const { visible, onCancel, curriculum } = this.props
    const { inputVisible, inputValue } = this.state

    if (!curriculum) return ''
    return (
      <Modal
        visible={visible}
        title={`Cursus ${curriculum.title}`}
        footer={null}
        onCancel={onCancel}
      >
        <div>
          <h2>List des sous cursus :</h2>
          {curriculum.children &&
            curriculum.children.map(child => {
              const isLongTag = child.title.length > 20
              const tagElem = (
                <Tag
                  key={child.key}
                  closable={child.isLeaf}
                  afterClose={() => this.handleClose(child)}
                  color='geekblue'
                >
                  {isLongTag ? `${child.title.slice(0, 20)}...` : child.title}
                </Tag>
              )
              return isLongTag ? (
                <Tooltip title={child.title} key={child.key}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              )
            })}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type='text'
              size='small'
              style={{ width: 120 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type='plus' /> Créer un cursus
            </Tag>
          )}
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addChild: (id, pos, name) => dispatch(addChild(id, pos, name)),
  removeChild: (id, pos, name) => dispatch(removeChild(id, pos, name))
})

export default connect(
  null,
  mapDispatchToProps
)(NodeModal)
