import { SIGN_UP, LOGIN } from '../constants';
import axios from 'axios';
import globals from '../globals';

export function register(props, payload) {
  return (dispatch) => {
    axios.post(`${globals.base_url}/user/register`, payload)
      .then((response) => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Registration failed!';
          globals.createToast(msg, 2500, 'top');
          return console.log(response, 'not successful');
        }
        const user = response.data;
        localStorage.setItem('userEmail', user.email);
        console.log(user);
        const msg = 'Activation code has been sent to your email!';
        globals.createToast(msg, 2500, 'bottom-right');
        dispatch(accountCreated(user));
        props.history.push("/activate-account");
      })
      .catch(error => {
        const msg = error.data.msg || 'Some error occured, please try later!';
        globals.createToast(msg, 2500, 'top');
        console.log('catch error register', error);
        throw (error);
      })
  }
}

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
        if (res.data.status === false) {
          return globals.createToast('This account has been suspended.', 2500, 'top');
        }
        if (res.data.verified === false) {
          globals.createToast('An email has been sent to you to verify your account.', 2500, 'top');
          return props.history.push("/activate-account");
        }
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

export function activateAccount(props, payload) {
  return dispatch => {
    axios.put(`${globals.base_url}/user/activate/token`, payload)
      .then(response => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Failed, please retry.';
          globals.createToast(msg, 2500, 'bottom-right');
          return console.log(response, 'not successful');
        }
        let res = response;
        console.log(res);
        props.history.push("/login");
      })
      .catch(error => {
        const msg = 'Invalid Activation code.';
        globals.createToast(msg, 2500, 'bottom-right');
        console.log('catch error register', error);
        throw (error);
      })
  }
}

export function resendToken(payload) {
  return dispatch => {
    axios.put(`${globals.base_url}/user/resend/token`, payload)
      .then(response => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Failed, please retry.';
          globals.createToast(msg, 2500, 'bottom-right');
          return console.log(response, 'not successful');
        }
        let res = response;
        if (res.data.status === true) {
          const msg = 'Token has been resent to your email';
          globals.createToast(msg, 2500, 'bottom-right');
        } else {
          const msg = 'Failed, please retry.';
          globals.createToast(msg, 1500, 'bottom-right');
        }
        console.log(res);
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}

export function forgotPasswordInit(props, payload) {
  return (dispatch) => {
    axios.post(`${globals.base_url}/user/forgot`, payload)
      .then((response) => {
        if (response.data.status === false) {
          console.log(response, 'not successful');
          const msg = response.data.msg || 'Recovery failed!, please retry';
          globals.createToast(msg, 2500, 'top');
          return console.log(response, 'not successful');
        }
        const user = response.data;
        console.log(user);
        const msg = 'Your recovery token has been sent to your email address!';
        globals.createToast(msg, 3500, 'top');
        props.history.push("/forgot-password-complete");
      })
      .catch(error => {
        console.log(error.data, 'not successful');
        const msg = error.msg || 'Account not found, please retry';
        globals.createToast(msg, 3500, 'top');
        throw (error);
      })
  }
}

export function forgotPasswordFinish(props, payload) {
  return (dispatch) => {
    axios.put(`${globals.base_url}/user/change_password/token`, payload)
      .then((response) => {
        if (response.data.status === false) {
          // const msg = response.data.msg || 'Account recovery failed, please retry';
          // globals.createToast(msg, 2500, 'top');
          return console.log(response, 'not successful');
        }
        const user = response.data;
        console.log(user);
        // const msg = 'Success';
        // globals.createToast(msg, 3500, 'bottom-right');
        props.history.push("/");
      })
      .catch(error => {
        const msg = error.msg || 'Some error occured, please try later!';
        globals.createToast(msg, 3500, 'top');
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

function accountCreated(user) {
  return {
    type: SIGN_UP,
    payload: user
  }
}