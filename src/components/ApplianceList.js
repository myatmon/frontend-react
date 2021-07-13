import React, { Component } from 'react';
import { Subscription } from 'rxjs';
import ApplianceService from '../services/ApplianceService';
import MUIDataTable from 'mui-datatables';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class ApplianceList extends Component<Subscription> {

    subscription: Subscription = new Subscription();
    columns: []
    constructor(props) {
        super(props)

        this.state = {
            appliances: []
        }
        this.columns = this.getColumns();
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
    getColumns() {
        return [{
            name: "id",
            label: "ID",
            options: {
                sort: false,
                display: false

            }
        }, {
            name: "serialNumber",
            label: "Serial Number",
            options: {
                sort: false,
            }
        }, {
            name: "brand",
            label: "Brand",
            options: {
                sort: false,
            }
        }, {
            name: "model",
            label: "Model",
            options: {
                sort: false,
            }
        }, {
            name: "status",
            label: "Status",
            options: {
                sort: false,
            }
        }, {
            name: "dateBought",
            label: "Date Bought",
            options: {
                sort: false,
            }
        },
        {
            name: "Edit",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <EditIcon color="primary" className="updateIcon" aria-label="edit" onClick={() => this.editAppliance(tableMeta.rowData['0'])} />
                    );
                }
            }
        },
        {
            name: "Delete ",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <DeleteIcon fontSize="small" className="deleteIcon" aria-label="delete" onClick={() => this.deleteAppliance(tableMeta.rowData['0'])} />
                    );
                }
            }
        }];
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
                <MUIDataTable
                    title={"Appliance list"}
                    data={this.state.appliances}
                    columns={this.columns}
                    options={{
                        selectableRows: false
                    }}
                />
            </div>
        )
    }
}

export default ApplianceList