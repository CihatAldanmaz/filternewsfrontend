import React, { Component } from 'react'
import "../css/style.css";

export default class LogOut extends Component {
    
    render() {
        return (
            <div>
               <button class="button button2" onClick={() => this.logOutUser()}>Log Out</button>

            </div>
                )
            }
        }
