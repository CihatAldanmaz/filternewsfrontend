import React, { Component } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class FfilterBar extends Component {

  state = {
    sources: ''
  }

    getSources = (geldi) => {
      //  this.setState({sources:geldi})
    }

    render() {
        return (
            <FormGroup row>
    
            <FormControlLabel
              control={
                <Switch checked={this.props.cnn} onClick={() => this.getSources(`techcrunch`)} value="cnn" />
                
              }
              label="CNN"
              name = "cnn"
            />
            <FormControlLabel
              control={
                <Switch checked={this.props.wsj} onClick={(e) => this.props.getSourceCheck(e)} value="wsj" />
                
              }
              label="WSJ"
              name = "wsj"
            />
      
          <FormControlLabel
              control={
                <Switch checked={this.props.abc} onClick={(e) => this.props.getSourceCheck(e)} value="abc" />
                
              }
              label="ABC News"
              name = "abc"
            />
      
      <FormControlLabel
              control={
                <Switch checked={this.props.fox} onClick={(e) => this.props.getSourceCheck(e)} value="fox" />
                
              }
              label="Fox News"
              name = "fox"
            />
      
      <FormControlLabel
              control={
                <Switch checked={this.props.cbs} onClick={(e) => this.props.getSourceCheck(e)} value="cbs" />
                
              }
              label="CBS News"
              name = "cbs"
            />
      
      <FormControlLabel
              control={
                <Switch checked={this.props.twp} onClick={(e) => this.props.getSourceCheck(e)} value="twp" />
                
              }
              label="The Washington Post"
              name = "twp"
            />
      
          </FormGroup>
        )
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FfilterBar);