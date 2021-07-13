import { Observable } from 'rxjs'
import API from '../components/api/Api'

export const ApplianceService = {

    getAppliances: () => Observable.create((observer) => {
        API.get('appliances')
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error.response);
            });
    }),
    deleteAppliance: (id) => Observable.create((observer) => {
        API.delete('appliance/' + id)
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error.response);
            });
    }),
    createAppliance: (appliance) => Observable.create((observer) => {
        API.post('appliance', appliance)
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error.response);
            });
    }),
    updateAppliance: (id, appliance) => Observable.create((observer) => {
        API.put('appliance/' + id, appliance)
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error.response);
            });
    }),
    getApplianceById: (id) => Observable.create(observer => {
        API.get('appliance/' + id)
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error.response);
            });
    }),
    checkValid: (appliance) => Observable.create(observer => {
        API.post('/appliance_exists/', appliance)
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error.response);

            })
    })
}
export default ApplianceService

