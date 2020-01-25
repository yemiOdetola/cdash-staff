import { LOGIN } from '../constants';
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


function loginUser(data) {
  return {
    type: LOGIN,
    payload: data
  };
}