import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import SearchBar from 'material-ui-search-bar'


export default class App extends Component {
  

    render() {
        return(
            <SearchBar
              onChange={(e) => this.props.handleValue(e)}
              onRequestSearch={(e) => this.props.submitSearch(e)}
              value = ""
              style={{
                margin: '0 auto',
                marginTop : 30,
                marginBottom: 30,
                maxWidth: 800
                
              }}
            />
          )
        }
    }
    