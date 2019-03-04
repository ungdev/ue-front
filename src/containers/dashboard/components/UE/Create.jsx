import React from 'react'
import { Form, Input, Tooltip, Icon, Button, Spin, InputNumber } from 'antd'

import { connect } from 'react-redux'
import { createUE } from '../../../../modules/ues'
import { fetchAttributes } from '../../../../modules/attributes'
import { fetchCurriculums } from '../../../../modules/curriculums'
import { fetchPeriods } from '../../../../modules/periods'
import { fetchUEs } from '../../../../modules/ues'

import AttributesList from '../Version/components/AttributesList'
import AttributesModal from '../Version/components/AttributesModal'
import CurriculumsList from '../Version/components/CurriculumsList'
import PeriodsList from '../Version/components/PeriodsList'
import RequiredsList from '../Version/components/RequiredsList'
import RequiredsModal from '../Version/components/RequiredsModal'

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attributes: [],
      curriculums: [],
      periods: [],
      requireds: [],
      attributesModal: false,
      requiredsModal: false
    }
    props.fetchUEs()
    props.fetchAttributes()
    props.fetchCurriculums()
    props.fetchPeriods()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { attributes, curriculums, requireds, periods } = this.state
        const ue = {
          ...values,
          attributes: attributes.map(item => {
            return { id: item.id, value: item.value }
          }),
          curriculums: curriculums.map(item => item.id),
          requireds: requireds.map(item => {
            return { id: item.id, importance: item.value }
          }),
          periods: periods.map(item => item.id)
        }
        this.props.createUE(ue)
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
    const item = this.props.ues.find(ue => ue.id === values.required)
    requireds.push({
      id: item.id,
      name: item.name,
      value: values.value
    })
    this.setState({ requiredsModal: false, requireds })
  }

  render() {
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
          <Form.Item {...formItemLayout} label='Nom'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez entrer un nom !'
                }
              ]
            })(<Input placeholder='MATH01' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='Code'>
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez entrer un code !'
                }
              ]
            })(<Input placeholder='MTX1' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='Titre'>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez entrer un titre !'
                }
              ]
            })(
              <Input placeholder='Analyse : suites et fonctions d’une variable réelle' />
            )}
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
              ]
            })(
              <Input.TextArea
                placeholder='La formation d’ingénieur nécessite la maîtrise de connaissances mathématiques fondamentales qui doivent
            s’articuler au sein d’un raisonnement scientifique structuré.'
              />
            )}
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
              ]
            })(
              <Input.TextArea
                placeholder='
                ∙ assimiler des éléments de logique et s’approprier les modes de raisonnements principaux
            ∙ mettre en évidence la structure des nombres réels et complexes
            ∙ approfondir l’étude des suites numériques
            ∙ consolider et développer des méthodes d’étude de fonctions numériques (développements limités)
            ∙ consolider et développer les connaissances liées à l’intégration
            ∙ savoir intégrer des équations différentielles linéaires du premier et du deuxième ordre dans des cas simples'
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='Nombre de crédits ECTS'>
            {getFieldDecorator('ECTS', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez entrer le nombre de crédits !'
                }
              ]
            })(<InputNumber min={1} placeholder='6' />)}
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
const Wrapped = Form.create({ name: 'create-ue' })(Create)

const mapStateToProps = state => ({
  ues: state.ues.ues,
  attributes: state.attributes.attributes,
  curriculums: state.curriculums.curriculums,
  periods: state.periods.periods
})

const mapDispatchToProps = dispatch => ({
  fetchUEs: () => dispatch(fetchUEs()),
  fetchAttributes: () => dispatch(fetchAttributes()),
  fetchCurriculums: () => dispatch(fetchCurriculums()),
  fetchPeriods: () => dispatch(fetchPeriods()),
  createUE: ue => dispatch(createUE(ue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapped)
