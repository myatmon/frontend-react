import React, { Component } from 'react'
import ApplianceService from '../services/ApplianceService'
import { Subscription } from 'rxjs';
import DatePicker from "react-datepicker";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

class CreateApplianceComponent extends Component<Subscription> {

    subscription: Subscription = new Subscription();
    options: []
    constructor(props) {
        super(props)
        console.log([this.props.match.params.id], "create id" + this.props.match.params.id);
        this.state = {
            // step 2
            id: this.props.match.params.id,
            serialNumber: '',
            brand: '',
            model: '',
            status: '',
            dateBought: '',
        }
        this.options = [
            { value: 'old', label: 'old' },
            { value: 'unused', label: 'unused' },
            { value: 'sold', label: 'sold' }
        ];
        this.changeSerialNumberHandler = this.changeSerialNumberHandler.bind(this);
        this.changeBrandHandler = this.changeBrandHandler.bind(this);
        this.changeModelHandler = this.changeModelHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.saveOrUpdateAppliance = this.saveOrUpdateAppliance.bind(this);
    }




    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            this.subscription = ApplianceService.getApplianceById(this.state.id).subscribe(response => {
                if (response) {
                    console.log([response], "Update");
                    let appliance = {};
                    appliance = response;
                    this.setState({
                        serialNumber: appliance.serialNumber,
                        brand: appliance.brand,
                        model: appliance.model,
                        status: appliance.status,
                        dateBought: appliance.dateBought
                    });
                }
            });
        }
    }
    saveOrUpdateAppliance = (e) => {
        e.preventDefault();
        let appliance = {};
        appliance = {
            serialNumber: appliance.serialNumber,
            brand: appliance.brand,
            model: appliance.model,
            status: appliance.status,
            dateBought: appliance.dateBought
        };
        console.log('appliance => ' + JSON.stringify(appliance));


        if (this.state.id === '_add') {
            this.subscription = ApplianceService.createAppliance(appliance).subscribe(response => {
                if (response) {
                    this.props.history.push('/appliances');
                }
            });

        } else {
            appliance = {
                id: appliance.id,
                serialNumber: appliance.serialNumber,
                brand: appliance.brand,
                model: appliance.model,
                status: appliance.status,
                dateBought: appliance.dateBought
            };

            this.subscription = ApplianceService.updateAppliance(appliance).subscribe(response => {
                if (response) {
                    this.props.history.push('/appliances');
                }
            });
        }
    }

    changeSerialNumberHandler = (event) => {
        this.setState({ serialNumber: event.target.value });
    }

    changeBrandHandler = (event) => {
        this.setState({ brand: event.target.value });
    }

    changeModelHandler = (event) => {
        this.setState({ model: event.target.value });
    }

    changeStatusHandler = (status) => {
        this.setState({ status: status });
    }

    changeDateHandler = (date) => {
        this.setState({ dateBought: date });
    }


    cancel() {
        this.props.history.push('/appliances');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Appliance</h3>
        } else {
            return <h3 className="text-center">Update Appliance</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Serial Number: </label>
                                        <input placeholder="Serial Number" name="serialNumber" className="form-control"
                                            value={this.state.serialNumber} onChange={this.changeSerialNumberHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Brand: </label>
                                        <input placeholder="brand" name="brand" className="form-control"
                                            value={this.state.brand} onChange={this.changeBrandHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Model: </label>
                                        <input placeholder="Model" name="model" className="form-control"
                                            value={this.state.model} onChange={this.changeModelHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Status: </label>
                                        <Select options={this.options} placeholder="Status" name="status"
                                            value={this.state.status} onChange={(status) => this.changeStatusHandler(status)} />
                                    </div>
                                    <div className="form-group">
                                        <label> Date Bought: </label>
                                        <div className="row">
                                            <div className="col">
                                                <DatePicker className="form-control" placeholder="dateBought" name="dateBought" selected={this.state.dateBought} onChange={(date) => this.changeDateHandler(date)} />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateAppliance}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateApplianceComponent