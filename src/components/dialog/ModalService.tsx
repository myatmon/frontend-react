import { Subject } from 'rxjs'

const subject = new Subject();

export const modalService = {
    openModal: (modal) => subject.next({ modal }),
    getModal: () => subject.asObservable(),
    confirmModal: (modal) => subject.next({ modal }),
    getConfirmData: () => subject.asObservable(),
    cancelModal: () => { subject.next();}
}