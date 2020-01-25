import { LOGIN, FETCH_USERS, FETCH_USERS_DETAILS, CLEAR } from '../constants';
import axios from 'axios';
import globals from '../globals';

export function login(props, payload) {
  return dispatch => {
    axios.post(`${globals.base_url}/user/login`, payload)
      .then(response => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Failed, please retry.';
          globals.createToast(msg, 2500, 'top');
          return console.log(response, 'not successful');
        }
        let res = response.data;
        localStorage.setItem('userEmail', res.email);
        localStorage.setItem('userId', res.data.user_id);
        localStorage.setItem('userToken', res.data.user_token);
        dispatch(loginUser(res.data));
        props.history.push("/");
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}


export function fetchUsers() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAuth(''))
    axios.get(`${globals.base_url}/user`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Please reload page.';
          globals.createToast(msg, 3000, 'bottom-right');
          return console.log(response, 'fetch users not successful');
        }
        let res = response.data;
        console.log('users', res.data);
        dispatch(users(res.data));
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}


export function fetchUserDetails(id) {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAuth(''))
    axios.get(`${globals.base_url}/user/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Please reload page.';
          globals.createToast(msg, 3000, 'bottom-right');
          return console.log(response, 'fetch users not successful');
        }
        let res = response.data;
        console.log('user details', res.data);
        dispatch(userDetails(res.data));
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}

function loginUser(data) {
  return {
    type: LOGIN,
    payload: data
  };
}

function users(data) {
  return {
    type: FETCH_USERS,
    payload: data
  }
}

function userDetails(data) {
  return {
    type: FETCH_USERS_DETAILS,
    payload: data
  }
}

function clearAuth(data) {
  return {
    type: CLEAR,
    payload: data
  }
}