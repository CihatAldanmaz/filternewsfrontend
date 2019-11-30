import React, { Component } from 'react'

export default class newsDetail extends Component {
    render() {
        return (
            <div>
                {this.props.news.content}
            </div>
        )
    }
}
