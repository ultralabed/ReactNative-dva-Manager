import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default {
  namespace: 'auth',
  state: {
    email: 'test@test.com',
    password: '12345678',
    loginLoading: false,
    error: '',
    user: null,
    autoLogin: true,
  },
  subscriptions: {
    init({ dispatch }) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDdkeyJhBUM9Z3OUiY3cAmsS1UwtSH1ziI',
        authDomain: 'manager-443ae.firebaseapp.com',
        databaseURL: 'https://manager-443ae.firebaseio.com',
        storageBucket: 'manager-443ae.appspot.com',
        messagingSenderId: '858458307799'
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch({ type: 'loginSuccess', payload: user });
          dispatch({ type: 'autoLogin', payload: false});
        } else {
          // No user is signed in.
          dispatch({ type: 'autoLogin', payload: false});
        }
      });
    },
  },
  effects: {
    *loginUser({ payload }, { call, put, select }) {
      const { email, password } = yield select(state => state.auth);
      yield put({ type: 'errorMsg', payload: '' });
      yield put({ type: 'loginLoading', payload: true });
      const user = yield call(firebaseSign, { email, password });
      if (!user) {
        let userCreate = yield call(firebaseCreate, { email, password });
        userCreate ?
          yield put({ type: 'loginSuccess', payload: userCreate }) :
          yield put({ type: 'loginFail' });
      } else {
        yield put({ type: 'loginSuccess', payload: user });
      }
      yield put({ type: 'loginLoading', payload: false });
    },
    *logoutUser({ paylaod }, { put }){
      yield firebase.auth().signOut();
      yield put({ type: 'logout' });
      yield Actions.auth({ type: 'reset' });
    },
  },
  reducers: {
    loginSuccess(state, { payload: user }) {
      Actions.main({ type: 'reset' });

      return { ...state, user, password: ''  };
    },
    loginFail(state) {

      return { ...state, error: 'Authentication Fail', password: '' };
    },
    loginLoading(state, { payload: loginLoading }) {

      return { ...state, loginLoading };
    },
    errorMsg(state, { payload: error }) {

      return { ...state, error  };
    },
    userEmail(state, { payload: email }) {

      return { ...state, email };

    },
    userPassword(state, { payload: password }) {

      return { ...state, password };
    },
    logout(state) {

      return { ...state, email: '', password: '', error: '' };
    },
    autoLogin(state, { payload: autoLogin }) {

      return { ...state, autoLogin };
    }
  },
}

function firebaseSign({ email, password }) {
  const user = null;

  return firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => user)
          .catch(() => user);

};

function firebaseCreate({ email, password }) {
  const userCreate = null;
  return firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCreate) => userCreate)
          .catch(() => userCreate);
}
