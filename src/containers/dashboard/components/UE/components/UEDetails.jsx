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
    return (
      <React.Fragment>
        <h1>
          {ue.name} : {version.title} ({version.ECTS} crédits)
        </h1>
        <Button
          type='primary'
          onClick={() => this.setState({ createDrawer: true })}
        >
          Créer une nouvelle version
        </Button>
        <Divider orientation='left'>Objectifs</Divider>
        <p>{version.goals}</p>
        <Divider orientation='left'>Programme</Divider>
        <p>{version.programme}</p>
        {version.attributes.length > 0 && (
          <React.Fragment>
            <Divider orientation='left'>Attributs</Divider>
            <Table
              dataSource={version.attributes}
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
          <VersionCreate ueId={ue.id} />
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
