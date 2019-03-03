import React from 'react'
import { Form, Input, Tooltip, Icon, Button, Spin, InputNumber } from 'antd'
import { connect } from 'react-redux'
import { fetchLastUEVersion } from '../../../../modules/versions'
import { fetchUEs } from '../../../../modules/ues'
import AttributesList from './components/AttributesList'

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attributes: null
    }
    props.fetchLastUEVersion(props.match.params.id)
    props.fetchUEs()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }

  removeAttribute = id => {
    let { attributes } = this.state
    attributes = attributes.filter(attribute => attribute.id !== id)
    this.setState({ attributes })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { versions, match } = nextProps
    const ueId = match.params.id
    let version = versions.find(v => v.ueId === ueId)
    if (version) {
      if (version.attributes.length > 0 && !prevState.attributes) {
        return {
          attributes: version.attributes.map(attribute => {
            return {
              id: attribute.id,
              name: attribute.name,
              value: attribute.attribute_version.value
            }
          })
        }
      }
    }
    return null
  }

  render() {
    const { versions, match, ues } = this.props
    const ueId = match.params.id
    let version = versions.find(v => v.ueId === ueId)
    let ue = ues.find(u => u.id === ueId)
    console.log(version, this.state)
    if (!version || !ue) {
      return <Spin />
    }
    const { attributes } = this.state
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Créer une nouvelle version pour {ue.name}</h1>
        <Form.Item {...formItemLayout} label='Titre'>
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer un titre !'
              }
            ],
            initialValue: version.title
          })(<Input />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Objectifs de l'UE&nbsp;
              <Tooltip title='Que va apprendre cette UEs aux étudiants ?'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('goals', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer des objectifs !'
              }
            ],
            initialValue: version.goals
          })(<Input.TextArea />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Programme de l'UE&nbsp;
              <Tooltip title="Qu'est ce que vont faire les étudiants dans cette UE ?">
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('programme', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer un programme !'
              }
            ],
            initialValue: version.programme
          })(<Input.TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='Nombre de crédits ECTS'>
          {getFieldDecorator('ECTS', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer le nombre de crédits !'
              }
            ],
            initialValue: version.ECTS
          })(<InputNumber min={1} />)}
        </Form.Item>
        <h2 style={{ textAlign: 'center' }}>
          <span>
            Attributs&nbsp;
            <Tooltip title='Ajouter un attribut'>
              <Button type='primary' shape='circle' icon='plus' size='small' />
            </Tooltip>
          </span>
        </h2>
        <AttributesList
          attributes={attributes}
          removeAttribute={id => this.removeAttribute(id)}
        />

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
const WrappedEdit = Form.create({ name: 'create-versions' })(Create)

const mapStateToProps = state => ({
  versions: state.versions.versions,
  ues: state.ues.ues
})

const mapDispatchToProps = dispatch => ({
  fetchUEs: () => dispatch(fetchUEs()),
  fetchLastUEVersion: id => dispatch(fetchLastUEVersion(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedEdit)
