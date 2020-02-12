import { FETCH_SOCIALS, FETCH_SOCIAL_DETAILS, CLEAR } from '../constants';
import axios from 'axios';
import globals from '../globals';


export function fetchSocials() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearSocials(''))
    axios.get(`${globals.base_url}/social`, {
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
        dispatch(socials(res.data));
      })
      .catch(error => {
        console.log('catch error socials', error);
        throw (error);
      })
  }
}


export function fetchSocialDetails(id) {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearSocials(''))
    axios.get(`${globals.base_url}/social/${id}`, {
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
        dispatch(socialDetails(res.data));
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}


function socials(data) {
  return {
    type: FETCH_SOCIALS,
    payload: data
  }
}

function socialDetails(data) {
  return {
    type: FETCH_SOCIAL_DETAILS,
    payload: data
  }
}

function clearSocials(data) {
  return {
    type: CLEAR,
    payload: data
  }
}