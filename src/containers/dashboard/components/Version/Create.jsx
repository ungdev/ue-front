import React from 'react'
import { Form, Input, Tooltip, Icon, Button, Spin, InputNumber } from 'antd'

import { connect } from 'react-redux'
import { fetchLastUEVersion } from '../../../../modules/versions'
import { fetchAttributes } from '../../../../modules/attributes'
import { fetchCurriculums } from '../../../../modules/curriculums'
import { fetchPeriods } from '../../../../modules/periods'
import { fetchUEs } from '../../../../modules/ues'

import AttributesList from './components/AttributesList'
import AttributesModal from './components/AttributesModal'
import CurriculumsList from './components/CurriculumsList'
import PeriodsList from './components/PeriodsList'
import RequiredsList from './components/RequiredsList'
import RequiredsModal from './components/RequiredsModal'

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attributes: null,
      curriculums: null,
      periods: null,
      requireds: null,
      attributesModal: false,
      requiredsModal: false
    }
    props.fetchLastUEVersion(props.ueId)
    props.fetchUEs()
    props.fetchAttributes()
    props.fetchCurriculums()
    props.fetchPeriods()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values) // TODO save version
      }
    })
  }

  removeAttribute = id => {
    let { attributes } = this.state
    attributes = attributes.filter(attribute => attribute.id !== id)
    this.setState({ attributes })
  }
  removeCurriculum = id => {
    let { curriculums } = this.state
    curriculums = curriculums.filter(c => c.id !== id)
    this.setState({ curriculums })
  }
  removePeriod = id => {
    let { periods } = this.state
    periods = periods.filter(c => c.id !== id)
    this.setState({ periods })
  }
  removeRequired = id => {
    let { requireds } = this.state
    requireds = requireds.filter(required => required.id !== id)
    this.setState({ requireds })
  }

  addAttribute = values => {
    let { attributes } = this.state
    if (!attributes) attributes = []
    const a = this.props.attributes.find(at => at.id === values.attribute)
    attributes.push({
      id: a.id,
      name: a.name,
      value: values.value
    })
    this.setState({ attributesModal: false, attributes })
  }

  addCurriculum = values => {
    let { curriculums } = this.state
    if (!curriculums) curriculums = []
    const c = this.props.curriculums.find(cu => cu.id === values.curriculum)
    curriculums.push(c)
    this.setState({ curriculums })
  }
  addPeriod = values => {
    let { periods } = this.state
    if (!periods) periods = []
    const period = this.props.periods.find(p => p.id === values.period)
    periods.push(period)
    this.setState({ periods })
  }
  addRequired = values => {
    let { requireds } = this.state
    if (!requireds) requireds = []
    const item = this.props.ues.find(
      ue => ue.id === values.required
    )
    requireds.push({
      id: item.id,
      name: item.name,
      value: values.value
    })
    this.setState({ requiredsModal: false, requireds })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { versions, ueId } = nextProps
    let version = versions.find(v => v.ueId === ueId)
    if (version) {
      if (
        (version.attributes.length > 0 ||
          version.curriculums.length > 0 ||
          version.requireds.length > 0 ||
          version.periods.length > 0) &&
        (!prevState.attributes ||
          !prevState.curriculums ||
          !prevState.periods ||
          !prevState.requireds)
      ) {
        return {
          attributes: version.attributes.map(attribute => {
            return {
              id: attribute.id,
              name: attribute.name,
              value: attribute.attribute_version.value
            }
          }),
          curriculums: version.curriculums,
          periods: version.periods,
          requireds: version.requireds
        }
      }
    }
    return null
  }

  render() {
    const { versions, ueId, ues } = this.props
    let version = versions.find(v => v.ueId === ueId)
    let ue = ues.find(u => u.id === ueId)
    if (!version || !ue) {
      return <Spin />
    }
    const { attributes, curriculums, periods, requireds } = this.state
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
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
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
                <Button
                  type='primary'
                  shape='circle'
                  icon='plus'
                  size='small'
                  onClick={() => this.setState({ attributesModal: true })}
                />
              </Tooltip>
            </span>
          </h2>
          <AttributesList
            attributes={attributes}
            removeAttribute={this.removeAttribute}
          />

          <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Cursus</h2>
          <p>
            Un cursus défini à quels niveaux est ouvert l'UE. Exemple :
            Ingénieur donnera accès à cette UE à tous les étudiants ingénieurs
            (TC, Branches,...).
          </p>
          <CurriculumsList
            curriculums={curriculums}
            allCurriculums={this.props.curriculums}
            removeCurriculum={this.removeCurriculum}
            addCurriculum={this.addCurriculum}
          />

          <h2 style={{ textAlign: 'center' }}>Périodes</h2>
          <p>
            Une période correspond généralement au semestre où sera disponibe
            l'UE (Automne/Printemps).
          </p>
          <PeriodsList
            periods={periods}
            allPeriods={this.props.periods}
            removePeriod={this.removePeriod}
            addPeriod={this.addPeriod}
          />

          <h2 style={{ textAlign: 'center' }}>
            <span>
              UEs prérequises&nbsp;
              <Tooltip title='Ajouter une UE prérequise'>
                <Button
                  type='primary'
                  shape='circle'
                  icon='plus'
                  size='small'
                  onClick={() => this.setState({ requiredsModal: true })}
                />
              </Tooltip>
            </span>
          </h2>
          <RequiredsList
            requireds={requireds}
            removeRequired={this.removeRequired}
          />

          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Enregistrer
            </Button>
          </Form.Item>
        </Form>

        <AttributesModal
          visible={this.state.attributesModal}
          onCancel={() => this.setState({ attributesModal: false })}
          returnValue={this.addAttribute}
          attributes={this.props.attributes}
          versionAttributes={this.state.attributes}
        />
        <RequiredsModal
          visible={this.state.requiredsModal}
          onCancel={() => this.setState({ requiredsModal: false })}
          returnValue={this.addRequired}
          ues={this.props.ues}
          versionRequireds={this.state.requireds}
        />
      </React.Fragment>
    )
  }
}
const WrappedEdit = Form.create({ name: 'create-versions' })(Create)

const mapStateToProps = state => ({
  versions: state.versions.versions,
  ues: state.ues.ues,
  attributes: state.attributes.attributes,
  curriculums: state.curriculums.curriculums,
  periods: state.periods.periods
})

const mapDispatchToProps = dispatch => ({
  fetchUEs: () => dispatch(fetchUEs()),
  fetchLastUEVersion: id => dispatch(fetchLastUEVersion(id)),
  fetchAttributes: () => dispatch(fetchAttributes()),
  fetchCurriculums: () => dispatch(fetchCurriculums()),
  fetchPeriods: () => dispatch(fetchPeriods())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedEdit)
