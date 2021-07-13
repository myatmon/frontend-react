import React, { Component } from 'react'
import ApplianceService from '../services/ApplianceService'
import { Subscription } from 'rxjs';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import moment from 'moment'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-datepicker/dist/react-datepicker.css";

toast.configure({
    autoClose: 2000,
    draggable: false,
});

class CreateApplianceComponent extends Component<Subscription> {

    subscription: Subscription = new Subscription();
    options: []
    isUpdate: false;
    constructor(props) {
        super(props)
        console.log([this.props.match.params.id], "create id" + this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            serialNumber: '',
            brand: '',
            model: '',
            status: '',
            dateBought: new Date(),
            title: '',
        }
        this.options = [
            { value: 'new', label: 'new' },
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

    componentDidMount() {

        if (this.state.id === '_add') {
            this.setState({ title: 'Save' })
            return
        } else {
            this.setState({ title: 'Update' })
            this.isUpdate = true;
            this.subscription = ApplianceService.getApplianceById(this.state.id).subscribe(response => {
                if (response) {
                    let appliance = {};
                    appliance = response;
                    this.setState({
                        serialNumber: appliance.serialNumber,
                        brand: appliance.brand,
                        model: appliance.model,
                        status: appliance.status,
                        dateBought: Date.parse(appliance.dateBought)
                    });
                }
            });
        }
    }

    saveOrUpdateAppliance = (e) => {
        e.preventDefault();
        let appliance = {};
        appliance = {
            serialNumber: this.state.serialNumber,
            brand: this.state.brand,
            model: this.state.model,
            status: this.state.status,
            dateBought: this.state.dateBought
        };


        if (this.state.id === '_add') {
            this.subscription = ApplianceService.createAppliance(appliance).subscribe(response => {
                if (response) {
                    this.notify("Create success");
                    this.props.history.push('/appliances');
                } else {
                    this.props.history.push('/appliances');
                }
            },
                error => {
                    this.notifyError("Oop, something wrong!");
                });

        } else {
            appliance = {
                id: this.state.id,
                serialNumber: this.state.serialNumber,
                brand: this.state.brand,
                model: this.state.model,
                status: this.state.status,
                dateBought: this.state.dateBought
            };

            this.subscription = ApplianceService.updateAppliance(this.state.id, appliance).subscribe(response => {
                if (response) {
                    this.notify("Update success");
                    this.props.history.push('/appliances');
                }
            }, error => {
                this.notifyError("Oop, something wrong!");
                console.log([error], "Error Update");
            });
        }
    }



    notify = (message: any) => toast.success(message);

    notifyError = (message: any) => toast.error(message);

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
        this.setState({ status: status.value });
    }

    changeDateHandler = (date) => {
        this.setState({ dateBought: date });
    }

    getFormatDate(date: any) {
        return moment(date).format('YYYY-MM-DD');
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
                                        <input placeholder="Serial Number" disabled={this.isUpdate} name="serialNumber" className="form-control"
                                            value={this.state.serialNumber} onChange={this.changeSerialNumberHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Brand: </label>
                                        <input placeholder="brand" disabled={this.isUpdate} name="brand" className="form-control"
                                            value={this.state.brand} onChange={this.changeBrandHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Model: </label>
                                        <input placeholder="Model" disabled={this.isUpdate} name="model" className="form-control"
                                            value={this.state.model} onChange={this.changeModelHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Status: </label>
                                        <Select value={
                                            this.options.filter(option =>
                                                option.label === this.state.status)
                                        }
                                            onChange={(status) => this.changeStatusHandler(status)}
                                            options={this.options}
                                            placeholder="Status" />
                                    </div>
                                    <div className="form-group">
                                        <label> Date Bought: </label>
                                        <div className="row">
                                            <div className="col">
                                                <DatePicker className="form-control" placeholder="dateBought" name="dateBought" selected={this.state.dateBought} onChange={(date) => this.changeDateHandler(date)} />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateAppliance}>{this.state.title}</button>
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