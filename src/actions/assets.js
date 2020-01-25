import { FETCH_ASSETS_CONTAINERS, ASSETS, ASSET_DATA, CLEAR } from '../constants';
import axios from 'axios';
import globals from '../globals';

export function fetchAssetsContainers(payload) {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAssets(''))
    axios.get(`${globals.base_url}/asset`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
      .then(response => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Failed, please retry.';
          globals.createToast(msg, 2500, 'top');
          return console.log(response, 'not successful');
        }
        let res = response.data;
        dispatch(assetsContainers(res.data));
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}

export function fetchAssets(id) {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAssets(''))
      axios.get(`${globals.base_url}/asset/asset_data/${id}`, {
          headers: {
              'Authorization': 'Bearer ' + userToken
          }
      })
          .then(response => {
              if (response.data.status === false) {
                  const msg = response.data.msg || 'Please reload page.';
                  globals.createToast(msg, 3000, 'bottom-right');
                  return console.log(response, 'fetch asset not successful');
              }
              let res = response.data;
              console.log('response', res);
              dispatch(assets(res.data));
          })
          .catch(error => {
              console.log('catch error register', error);
              throw (error);
          })
  }
}

export function fetchAssetData(id) {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAssets(''))
      axios.get(`${globals.base_url}/asset_data/${id}`, {
          headers: {
              'Authorization': 'Bearer ' + userToken
          }
      })
          .then(response => {
              if (response.data.status === false) {
                  const msg = response.data.msg || 'Please reload page.';
                  globals.createToast(msg, 3000, 'bottom-right');
                  return console.log(response, 'fetch asset not successful');
              }
              let res = response.data;
              dispatch(assetData(res.data));
          })
          .catch(error => {
              console.log('catch error register', error);
              throw (error);
          })
  }
}


function assetsContainers(data) {
  return {
    type: FETCH_ASSETS_CONTAINERS,
    payload: data
  };
}

function assets(data) {
  return {
    type: ASSETS,
    payload: data
  };
}

function assetData(data) {
  return {
    type: ASSET_DATA,
    payload: data
  };
}

function clearAssets (data) {
  return {
    type: CLEAR,
    payload: data
  }
}