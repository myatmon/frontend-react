import React, { Component } from 'react';
import { Subscription } from 'rxjs';
import ApplianceService from '../services/ApplianceService';

class ApplianceList extends Component<Subscription> {

    subscription: Subscription = new Subscription();
    constructor(props) {
        super(props)

        this.state = {
            appliances: []
        }
        this.addAppliance = this.addAppliance.bind(this);
        this.editAppliance = this.editAppliance.bind(this);
        this.deleteAppliance = this.deleteAppliance.bind(this);
    }

    deleteAppliance(id) {
        this.subscription = ApplianceService.deleteAppliance(id).subscribe(response => {
            if (response) {
                this.setState({ appliances: this.state.appliances.filter(appliance => appliance.id !== id) });
            }
        },
        );
    }
    viewAppliance(id) {
        this.props.history.push(`/view-appliance/${id}`);
    }
    editAppliance(id) {
        this.props.history.push(`/add-appliance/${id}`);
    }

    componentDidMount() {
        this.subscription = ApplianceService.getAppliances().subscribe(response => {
            if (response) {
                this.setState({ appliances: response });
            }
        },
        );
    }

    addAppliance() {
        this.props.history.push('/add-appliance/_add');
    }

    render() {
        console.log([this.state.appliances], "TABLE");
        return (
            <div>
                <h2 className="text-center">Appliances List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addAppliance}> Add Appliance</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Serial Number</th>
                                <th> Brand</th>
                                <th> Model</th>
                                <th> Status</th>
                                <th> Date Bought</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.appliances.map(
                                    appliance =>
                                        <tr key={appliance.id}>
                                            <td> {appliance.serialNumber} </td>
                                            <td> {appliance.brand}</td>
                                            <td> {appliance.model}</td>
                                            <td> {appliance.status}</td>
                                            <td> {appliance.dateBought}</td>
                                            <td>
                                                <button onClick={() => this.editAppliance(appliance.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteAppliance(appliance.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ApplianceList