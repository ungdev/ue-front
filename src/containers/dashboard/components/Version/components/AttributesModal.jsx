import React from 'react'
import { Modal, Form, Select, Input } from 'antd'

const { Option } = Select

class AttributesModal extends React.Component {
  handleCancel = () => {
    this.setState({ visible: false })
  }
  handleCreate = () => {
    const { form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      form.resetFields()
      this.props.returnValue(values)
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }
  render() {
    let { attributes, versionAttributes } = this.props
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    attributes = attributes.filter(
      att => !versionAttributes.find(attr => attr.id === att.id)
    )
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
    return (
      <Modal
        visible={visible}
        title='Ajouter un attribut'
        okText='Ajouter'
        onCancel={onCancel}
        onOk={this.handleCreate}
      >
        <Form>
          <Form.Item {...formItemLayout} label='Attribut'>
            {getFieldDecorator('attribute', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez choisir un attribut à ajouter'
                }
              ]
            })(
              <Select
                showSearch
                notFoundContent='Aucun attribut disponible'
                style={{ width: 200 }}
                placeholder='Sélectionnez un attribut'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {attributes.map(attribute => (
                  <Option value={attribute.id} key={attribute.id}>
                    {attribute.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='Valeur'>
            {getFieldDecorator('value')(<Input placeholder='optionnel' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
const AttributesModalForm = Form.create({ name: 'attributes-modal' })(
  AttributesModal
)

export default AttributesModalForm