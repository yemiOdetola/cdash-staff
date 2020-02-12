import { CLEAR, ASSETS_COUNT, STAFFS_COUNT, AVG_SCORE, AVERAGE, USERS_COUNT, FETCH_MATURITY } from '../constants';
import axios from 'axios';
import globals from '../globals';


export function assetsCount() {
  const userToken = localStorage.getItem('userToken');
  const payload = {
    id: ''
  }
  return dispatch => {
    dispatch(clearSummary(''))
    axios.post(`${globals.base_url}/asset_data/count`, payload, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          return console.log(response, 'fetch users not successful');
        }
        let res = response.data;
        dispatch(assets(res.all_data));
      })
      .catch(error => {
        console.log('catch error socials', error);
        throw (error);
      })
  }
}

export function usersCount() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearSummary(''))
    axios.get(`${globals.base_url}/user/count`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          return console.log(response, 'fetch users not successful');
        }
        let res = response.data;
        dispatch(users(res.data));
      })
      .catch(error => {
        console.log('catch error socials', error);
        throw (error);
      })
  }
}

export function staffsCount() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearSummary(''))
    axios.get(`${globals.base_url}/staff/count`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          return console.log(response, 'fetch users not successful');
        }
        let res = response.data;
        dispatch(staffs(res.data));
      })
      .catch(error => {
        console.log('catch error socials', error);
        throw (error);
      })
  }
}


export function avgCount() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearSummary(''))
    axios.post(`${globals.base_url}/maturity/average`, {}, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          return console.log(response, 'fetch users not successful');
        }
        let res = response.data;
        dispatch(avgscore(res.average));
      })
      .catch(error => {
        console.log('catch error socials', error);
        throw (error);
      })
  }
}

export function fetchScores() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearSummary(''))
    axios.get(`${globals.base_url}/maturity`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      },
      params: {
        skip: 0,
        count: 999
      }
    })
      .then(response => {
        if (response.data.status === false) {
          return console.log(response, 'fetch users not successful');
        }
        let res = response.data;
        dispatch(maturity(res.data));
      })
      .catch(error => {
        console.log('catch error socials', error);
        throw (error);
      })
  }
}

export function fetchAverage() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearSummary(''))
    axios.post(`${globals.base_url}/maturity/average`, {}, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          return console.log(response, 'fetch users not successful');
        }
        let res = response.data;
        dispatch(average(res.average));
      })
      .catch(error => {
        console.log('catch error socials', error);
        throw (error);
      })
  }
}

function assets(data) {
  return {
    type: ASSETS_COUNT,
    payload: data
  }
}

function users(data) {
  return {
    type: USERS_COUNT,
    payload: data
  }
}

function staffs(data) {
  return {
    type: STAFFS_COUNT,
    payload: data
  }
}

function avgscore(data) {
  return {
    type: AVG_SCORE,
    payload: data
  }
}

function average(data) {
  return {
    type: AVERAGE,
    payload: data
  }
}

function maturity(data) {
  return {
    type: FETCH_MATURITY,
    payload: data
  }
}


function clearSummary(data) {
  return {
    type: CLEAR,
    payload: data
  }
}