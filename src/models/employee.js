import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default {
  namespace: 'employees',
  state: {
    employeeList: [],
    isLoading: false,
    name: '',
    phone: '',
    shift: '',
  },
  subscriptions: {
    initFetch({ dispatch }) {
      firebase.auth().onAuthStateChanged(function(currentUser) {
        if (currentUser) {
          dispatch({ type: 'employeesLoading', payload: true });

          firebase.database().ref(`/users/${currentUser.uid}/employees`)
          .on('value', (snapshot) => {
            const val = snapshot.val();
            if (val) {
              dispatch({ type: 'employeeList', payload: val });
            }
          });
        }
      });
    }

  },
  effects: {
    *employeeCreate({ payload }, { call, put }) {
      const { name, phone, shift } = payload;
      const { currentUser } = yield firebase.auth();

      yield firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
    },
    *employeeSave({ payload }, { put }) {
      const { name, phone, shift, uid } = payload;
      const { currentUser } = yield firebase.auth();

      firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({ name, phone, shift })
        .then(() => {
          put({ type: 'employeeCreateClear' });
          Actions.employeeList({ type: 'reset' });
        });
    },
    *employeeDelete({ payload }, { put }) {
      const { uid } = payload;
      const { currentUser } = yield firebase.auth();

      firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
          put({ type: 'employeeCreateClear' });
          Actions.employeeList({ type: 'reset' });
      });
    },
  },
  reducers: {
    employeeList(state, { payload: employeeList }) {
      return { ...state, employeeList, isLoading: false };
    },
    employeesLoading(state, { payload: isLoading }) {

      return { ...state, isLoading };
    },
    employeeCreateClear(state) {

      return { ...state, name: '', phone: '', shift: '' }
    },
    employeeName(state, { payload: name }) {
      return { ...state, name }
    },
    employeePhone(state, { payload: phone }) {
      return { ...state, phone }
    },
    employeeShift(state, { payload: shift }) {
      return { ...state, shift }
    },
  },
}

function firebaseEmployeeFetch(currentUser) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', (snapshot) => {
        const val = snapshot.val();
        if (val) {
          resolve(val);
        }  else {
          // New items cannot be got so quickly.
          setTimeout(() => {
            firebaseEmployeeFetch(currentUser).then(val => resolve(val));
          }, 500);
        }
      }, reject);
  });
};
