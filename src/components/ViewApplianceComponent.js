import React, { Component } from 'react'
import ApplianceService from '../services/ApplianceService'

class ViewApplianceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            appliance: {}
        }
    }

    componentDidMount() {
        ApplianceService.getApplianceById(this.state.id).then(res => {
            this.setState({ appliance: res.data });
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View Appliance Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Serial Number: </label>
                            <div> {this.state.appliance.serialNumber}</div>
                        </div>
                        <div className="row">
                            <label> Brand: </label>
                            <div> {this.state.appliance.brand}</div>
                        </div>
                        <div className="row">
                            <label> Model: </label>
                            <div> {this.state.appliance.model}</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewApplianceComponent