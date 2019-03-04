import React from 'react'
import { Modal, Form, Select } from 'antd'

const { Option } = Select

class PeriodsModal extends React.Component {
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
    let { periods, versionPeriods } = this.props
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    periods = periods.filter(
      period => !versionPeriods.find(vp => vp.id === period.id)
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
        title='Ajouter une période'
        okText='Ajouter'
        onCancel={onCancel}
        onOk={this.handleCreate}
      >
        <Form>
          <Form.Item {...formItemLayout} label='Période'>
            {getFieldDecorator('period', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez choisir une periode à ajouter'
                }
              ]
            })(
              <Select
                showSearch
                notFoundContent='Aucune periode disponible'
                style={{ width: 200 }}
                placeholder='Sélectionnez une période'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {periods.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
const PeriodsModalForm = Form.create({ name: 'periods-modal' })(
  PeriodsModal
)

export default PeriodsModalForm