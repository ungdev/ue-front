import React from 'react'
import { Modal, Form, Input } from 'antd'


class CreateModal extends React.Component {
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
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
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
        title={this.props.previousName ? 'Modifier une période' : 'Créer une période'}
        okText={this.props.previousName ? 'Modifier' : 'Créer'}
        onCancel={onCancel}
        onOk={this.handleCreate}
      >
        <Form>
          
          <Form.Item {...formItemLayout} label='Nom'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez enter un nom pour la période'
                }
              ],
              initialValue: this.props.previousName
            })(<Input placeholder='Nom' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
const CreateModalForm = Form.create({ name: 'period-create-modal' })(
  CreateModal
)

export default CreateModalForm