import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { modalService } from './ModalService';
import { Subscription } from 'rxjs';

export class AlertDialog extends React.Component<any, any, { Subscription: any }> {
  /* const [open, setOpen] = React.useState(false); */
  subscription: any;

  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      message: '',
      open: false,

    };
    this.subscription = new Subscription();
    this._confirm = this._confirm.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true, title: '' });
  };

  _confirm(e) {
    this.setState({ open: false });
    modalService.confirmModal({ text: 'ok' });
    modalService.cancelModal();
  }


  componentDidMount() {
    this.subscription = modalService.getModal().subscribe(
      response => {
        if (response) {
          let modal = [response]['0']['modal'];
          if (modal.title) {
            this.setState({
              title: modal.title,
              message: modal.message,
              open: true
            });
          }else{
            this.setState({
              open:false
            })
          }
        }

      },
      error => {}
    );
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false });
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              this.setState({ open: false });
              modalService.confirmModal({ text: 'No' });
              modalService.cancelModal();
            }} color="primary">
              Cancel
          </Button>
            <Button onClick={this._confirm} color="primary" autoFocus>
              Confirm
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
