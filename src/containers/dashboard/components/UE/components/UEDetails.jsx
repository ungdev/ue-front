import React from 'react'
import { connect } from 'react-redux'
import { fetchLastUEVersion } from '../../../../../modules/versions'
import VersionCreate from '../../Version/Create'
import { fetchUEs } from '../../../../../modules/ues'
import { Divider, Spin, Table, Tag, Tooltip, Button, Drawer } from 'antd'
import { push } from 'react-router-redux'

class UEListActions extends React.Component {
  constructor(props) {
    super(props)
    props.fetchLastUEVersion(props.match.params.id)
    props.fetchUEs()
    this.state = {
      createDrawer: false
    }
  }
  render() {
    const { ues, versions, match } = this.props
    let ue = ues.find(u => u.id === match.params.id)
    let version = versions.find(v => v.ueId === match.params.id)
    if (!version || !ue) return <Spin />
    const columns = [
      {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Valeur',
        dataIndex: 'attribute_version',
        key: 'attribute_version',
        render: att_v => att_v.value
      }
    ]
    let categorie = null
    if (version.attributes) {
      categorie = version.attributes.find(
        attribute => attribute.attribute_version.value === 'categorie'
      )
    }
    return (
      <React.Fragment>
        <h1>
          {ue.name} : {version.title}
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}
        >
          <Button
            type='primary'
            onClick={() => this.setState({ createDrawer: true })}
          >
            Créer une nouvelle version
          </Button>
          {categorie && <h2>Catégorie: {categorie.name}</h2>}
          <h2 style={{ marginRight: '20px' }}>{version.ECTS} crédits</h2>
        </div>
        <Divider orientation='left'>Objectifs</Divider>
        <p>
          {version.goals
            .replace('•', ' \n •')
            .split('\n')
            .map((item, i) => (
              <p key={i} style={{ marginBottom: '5px' }}>
                {item}
              </p>
            ))}
        </p>
        <Divider orientation='left'>Programme</Divider>
        <p>
          {version.programme
            .replace('•', ' \n •')
            .split('\n')
            .map((item, i) => (
              <p key={i} style={{ marginBottom: '5px' }}>
                {item}
              </p>
            ))}
        </p>
        {version.attributes.length > 0 && (
          <React.Fragment>
            <Divider orientation='left'>Attributs</Divider>
            <Table
              dataSource={version.attributes
                .filter(attribute => categorie && attribute.id !== categorie.id)
                .sort((a, b) => {
                  if (a.name > b.name) return 1
                  if (a.name < b.name) return -1
                  return 0
                })}
              columns={columns}
              rowKey='id'
              pagination={version.attributes.length > 10}
            />
          </React.Fragment>
        )}
        {version.curriculums.length > 0 && (
          <React.Fragment>
            <Divider orientation='left'>Cursus</Divider>
            <div>
              {version.curriculums.map(curriculum => (
                <Tag key={curriculum.id} color='geekblue'>
                  {curriculum.name}
                </Tag>
              ))}
            </div>
          </React.Fragment>
        )}
        {version.periods.length > 0 && (
          <React.Fragment>
            <Divider orientation='left'>Périodes</Divider>
            <div>
              {version.periods.map(period => (
                <Tag key={period.id} color='purple'>
                  {period.name}
                </Tag>
              ))}
            </div>
          </React.Fragment>
        )}
        {version.requireds.length > 0 && (
          <React.Fragment>
            <Divider orientation='left'>Prérequis</Divider>
            <div>
              {version.requireds.map(required => (
                <Tooltip
                  key={required.id}
                  placement='top'
                  title='Aller à cette UE'
                >
                  <Tag
                    key={required.id}
                    color='blue'
                    onClick={() => this.props.goToUE(required.id)}
                  >
                    {required.name}
                  </Tag>
                </Tooltip>
              ))}
            </div>
          </React.Fragment>
        )}
        <Drawer
          title={'Créer une nouvelle version pour ' + ue.name}
          width={720}
          onClose={() => this.setState({ createDrawer: false })}
          visible={this.state.createDrawer}
          style={{
            overflow: 'auto',
            height: 'calc(100% - 108px)',
            paddingBottom: '108px'
          }}
        >
          <VersionCreate
            ueId={ue.id}
            closeDrawer={() => this.setState({ createDrawer: false })}
          />
        </Drawer>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  versions: state.versions.versions,
  ues: state.ues.ues
})

const mapDispatchToProps = dispatch => ({
  fetchLastUEVersion: id => dispatch(fetchLastUEVersion(id)),
  fetchUEs: () => dispatch(fetchUEs()),
  goToUE: id => dispatch(push(`/dashboard/ues/${id}`))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UEListActions)
