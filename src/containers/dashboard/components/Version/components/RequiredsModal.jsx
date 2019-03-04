import React from 'react'
import { Modal, Form, Select } from 'antd'

const { Option } = Select

class RequiredsModal extends React.Component {
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
    let { ues, versionRequireds } = this.props
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    ues = ues.filter(
      ue => !versionRequireds.find(required => required.id === ue.id)
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
        title='Ajouter une UE prérequise'
        okText='Ajouter'
        onCancel={onCancel}
        onOk={this.handleCreate}
      >
        <Form>
          <Form.Item {...formItemLayout} label='UE'>
            {getFieldDecorator('required', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez choisir une UE à ajouter'
                }
              ]
            })(
              <Select
                showSearch
                notFoundContent='Aucune UE disponible'
                style={{ width: 200 }}
                placeholder='Sélectionnez une UE'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {ues.map(ue => (
                  <Option value={ue.id} key={ue.id}>
                    {ue.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='Importance'>
            {getFieldDecorator('value', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez choisir une importance associée'
                }
              ]
            })(
              <Select
                style={{ width: 200 }}
                placeholder='Sélectionnez une importance'
              >
              <Option value='Optionnelle'>Optionnelle</Option>
              <Option value='Conseillée'>Conseillée</Option>
              <Option value='Fortement Conseillée'>Fortement Conseillée</Option>
              <Option value='Requise'>Requise</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
const RequiredsModalForm = Form.create({ name: 'requireds-modal' })(
  RequiredsModal
)

export default RequiredsModalForm
