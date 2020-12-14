import React, { Component } from "react";

export default class ListToogle extends Component {
    constructor(props) {
        super(props);
        this.state ={
            toogle:false,
            mounted:true
        }
    }

    handleClick =() =>{
        this.setState({toogle: !this.state.toogle});
    }
    render(){
        return(
        <div onClick ={this.handleClick} data-toggled={this.state.toogle} className="ListToggle">
                <div>
                    <i className='fa fa-fw fa-plus'></i>
                    <i className='fa fa-fw fa-check'></i>
                </div>

        </div>
        )
    }
    
} 