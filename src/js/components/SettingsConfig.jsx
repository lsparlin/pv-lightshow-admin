import React from 'react';

import Requests from 'helpers/Requests'

class SettingsConfig extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      introductoryText: '',
      conclusionUrl: ''
    }
    this.onIntroTextChange = this.onIntroTextChange.bind(this)
    this.saveIntroTextSetting = this.saveIntroTextSetting.bind(this)
    this.onConclusionUrlChange = this.onConclusionUrlChange.bind(this)
    this.saveConclusionUrlSetting = this.saveConclusionUrlSetting.bind(this)
  }
  componentWillMount() {
    Requests.get('/settings').then(response => {
      this.setState(response.data)
    })
  }

  onIntroTextChange(event) {
    let newValue = event.target.value
    this.setState( {introductoryText: newValue, introTextDirty: true} )
  }
  saveIntroTextSetting() {
    Requests.put('/settings/put_one', {setting: {name: 'introductoryText', value: this.state.introductoryText}}).then(() => {
      this.setState( {introTextDirty: false} )
    })
  }
  onConclusionUrlChange(event) {
    let newValue = event.target.value
    this.setState( {conclusionUrl: newValue, conclusionUrlDirty: true} )
  }
  saveConclusionUrlSetting() {
    Requests.put('/settings/put_one', {setting: {name: 'conclusionUrl', value: this.state.conclusionUrl}}).then(() => {
      this.setState( {conclusionUrlDirty: false} )
    })
  }

  render() {
    return (
      <div className="row">
        <h3> Configuration </h3>

        <div className="card u-full-width margin-bottom-1m">
          <div className="card-header"> <strong>Landing Page Introductory Text</strong> </div>
          <div className="card-body">
            <div className="card-text">
              <input type="text" className="u-full-width" value={this.state.introductoryText} onChange={this.onIntroTextChange} /> 
            </div>
            { this.state.introTextDirty && <button className="button-primary" onClick={this.saveIntroTextSetting}>Save</button> }
          </div>
        </div>

        <div className="card u-full-width margin-bottom-1m">
          <div className="card-header"> <strong>Exit Landing Page URL</strong> </div>
          <div className="card-body">
            <div className="card-text">
              <input type="text" className="u-full-width" value={this.state.conclusionUrl} onChange={this.onConclusionUrlChange} /> 
            </div>
            { this.state.conclusionUrlDirty && <button className="button-primary" onClick={this.saveConclusionUrlSetting}>Save</button> }
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsConfig
