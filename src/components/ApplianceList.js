import React, { Component } from 'react';
import { Subscription } from 'rxjs';
import ApplianceService from '../services/ApplianceService';
import MUIDataTable from 'mui-datatables';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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

    delConfirm = (status: any, id: any) => {
        let message = "You want to delete this appliance?";
        if (status === 'new' || status === '') {
            message = "This is new appliance, do you really want to delete it?";
        }
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h4 className="title">Are you sure?</h4>
                        <p>{message}</p>
                        <div className="row">
                            <div className="col-4">
                                <button className="btn btn-primary" onClick={onClose}>No</button>
                            </div>
                            <div className="col">
                                <button className="btn btn-danger"
                                    onClick={() => {
                                        this.deleteAppliance(id);
                                        onClose();
                                    }}
                                >
                                    Yes, Delete it!
                                 </button>

                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

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
                        <DeleteIcon fontSize="small" disabled={tableMeta.rowData['4'] !== 'new'} className="deleteIcon" aria-label="delete" onClick={() => this.delConfirm(tableMeta.rowData['4'], tableMeta.rowData['0'])} />
                    );
                }
            }
        }];
    }

    render() {
        return (
            <div>
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