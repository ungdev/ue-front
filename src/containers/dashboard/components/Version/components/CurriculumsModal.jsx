import React from 'react'
import { Modal, Form, Select } from 'antd'

const { Option } = Select

class CurriculumsModal extends React.Component {
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
    let { curriculums, versionCurriculums } = this.props
    const { visible, onCancel, form } = this.props
    const { getFieldDecorator } = form
    curriculums = curriculums.filter(
      c => !versionCurriculums.find(cu => cu.id === c.id)
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
        title='Ajouter un cursus'
        okText='Ajouter'
        onCancel={onCancel}
        onOk={this.handleCreate}
      >
        <Form>
          <Form.Item {...formItemLayout} label='Cursus'>
            {getFieldDecorator('curriculum', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez choisir un curriculums à ajouter'
                }
              ]
            })(
              <Select
                showSearch
                notFoundContent='Aucun curriculums disponible'
                style={{ width: 200 }}
                placeholder='Sélectionnez un cursus'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {curriculums.map(cur => (
                  <Option value={cur.id} key={cur.id}>
                    {cur.name}
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
const CurriculumsModalForm = Form.create({ name: 'curriculums-modal' })(
  CurriculumsModal
)

export default CurriculumsModalForm