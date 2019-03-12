import React from 'react'
import { Tree, Spin } from 'antd'
import { connect } from 'react-redux'
import {
  fetchRoots,
  fetchChilds,
  fetchCurriculums
} from '../../../../modules/curriculums'
import NodeModal from './components/NodeModal'

const { TreeNode } = Tree

class CurriculumsTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modalVisible: false, selectedCurriculum: null }
    this.props.fetchRoots()
    this.props.fetchCurriculums()
  }

  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.children) {
        resolve()
        return
      }
      this.props
        .fetchChilds(treeNode.props.dataRef.key, treeNode.props.pos)
        .then(() => {
          setTimeout(() => {
            //timeout is just to feel a bit smoother
            resolve()
          }, 200)
        })
    })

  nodeClicked = (e, f) => {
    new Promise(resolve => {
      this.props.fetchChilds(e[0], f.node.props.pos).then(() => {
        const { treeData } = this.props
        let pos = f.node.props.pos.split('-')
        let node = treeData[pos[1]]
        for (let index = 2; index < pos.length; index++) {
          node = node.children[pos[index]]
        }
        node.pos = pos
        this.setState({ modalVisible: true, selectedCurriculum: node })
        resolve()
      })
    })
  }
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} dataRef={item} />
    })

  render() {
    if (!this.props.treeData) return <Spin />
    return (
      <React.Fragment>
        <h1>Gestion des Cursus</h1>
        <div style={{ paddingLeft: '20px' }}>
          <Tree loadData={this.onLoadData} onSelect={this.nodeClicked}>
            {this.renderTreeNodes(this.props.treeData)}
          </Tree>
        </div>
        <NodeModal
          visible={this.state.modalVisible}
          nodeId={this.state.clikedId}
          onCancel={() => this.setState({ modalVisible: false })}
          curriculum={this.state.selectedCurriculum}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  treeData: state.curriculums.treeData,
  curriculums: state.curriculums.curriculums
})

const mapDispatchToProps = dispatch => ({
  fetchCurriculums: () => dispatch(fetchCurriculums()),
  fetchRoots: () => dispatch(fetchRoots()),
  fetchChilds: (id, pos) => dispatch(fetchChilds(id, pos))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurriculumsTree)
