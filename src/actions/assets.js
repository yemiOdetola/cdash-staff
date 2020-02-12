import { FETCH_ASSETS_CONTAINERS, RECURRING_DATA, ASSETS, ASSETS_ALL, ASSET_DATA, CONTAINERS_ALL, OTHERS, HARDWARE, SOFTWARE, COUNT_ASSETS, CONNECTIVITY, BUSINESS_CONTINUITY, CLEAR } from '../constants';
import axios from 'axios';
import globals from '../globals';

export function fetchAssetsContainers(skip, count) {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAssets(''))
    axios.get(`${globals.base_url}/asset`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      },
      params: {
        skip: skip,
        count: count
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

export function fetchAllAssetsContainers() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAssets(''))
    axios.get(`${globals.base_url}/asset/all`, {
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
        dispatch(allAssetsContainers(res.data));
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}

export function fetchAssets(id, skip, count) {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAssets(''))
    axios.get(`${globals.base_url}/asset/asset_data/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      },
      params: {
        skip: skip,
        count: count
      }
    })
      .then(response => {
        if (response.data.status === false) {
          const msg = response.data.msg || 'Please reload page.';
          globals.createToast(msg, 3000, 'bottom-right');
          return console.log(response, 'fetch asset not successful');
        }
        let res = response.data;
        dispatch(assets(res.data));
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}


export function countAssets() {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAssets(''))
    axios.get(`${globals.base_url}/asset/asset_data/all`, {
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
        dispatch(count(res.data.length));
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}

export function fetchAssetsAll(type, skip, count) {
  const userToken = localStorage.getItem('userToken');
  const payload = { type }
  return dispatch => {
    dispatch(clearAssets(''))
    axios.post(`${globals.base_url}/asset_data/type`, payload, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      },
      params: {
        skip: skip,
        count: count
      }
    })
      .then(response => {
        if (response.data.status === false) {
          return console.log(response, 'fetch asset not successful');
        }
        let res = response.data;
        if (type === 'Others') { dispatch(others(res.data)) };
        if (type === 'Hardware') { dispatch(hardware(res.data)) };
        if (type === 'Software') { dispatch(software(res.data)) };
        if (type === 'Connectivity') { dispatch(connectivity(res.data)) };
        if (type === 'Business_continuity') { dispatch(business_continuity(res.data)) };
        dispatch(assetsAll(res.data));
      })
      .catch(error => {
        console.log('catch error register', error);
        throw (error);
      })
  }
}


export function fetchRecurringData(payload) {
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(clearAssets(''))
    axios.post(`${globals.base_url}/asset_data/count/recurring`, payload, {
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
        dispatch(reccuringData(res));
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

function reccuringData(data) {
  return {
    type: RECURRING_DATA,
    payload: data
  };
}

function assetData(data) {
  return {
    type: ASSET_DATA,
    payload: data
  };
}

function assetsAll(data) {
  return {
    type: ASSETS_ALL,
    payload: data
  }
}

function allAssetsContainers(data) {
  return {
    type: CONTAINERS_ALL,
    payload: data
  }
}

function count(data) {
  return {
    type: COUNT_ASSETS,
    payload: data
  }
}
function others(data) {
  if (data.length > 0) {
    console.log('greater than 0');
    return {
      type: OTHERS,
      payload: true
    };
  } else {
    console.log('less than 0');
    return {
      type: OTHERS,
      payload: false
    };
  }
}

function business_continuity(data) {
  if (data.length > 0) {
    return {
      type: BUSINESS_CONTINUITY,
      payload: true
    };
  } else {
    return {
      type: BUSINESS_CONTINUITY,
      payload: false
    };
  }
}

function hardware(data) {
  if (data.length > 0) {
    return {
      type: HARDWARE,
      payload: true
    };
  } else {
    return {
      type: HARDWARE,
      payload: false
    };
  }
}

function software(data) {
  if (data.length > 0) {
    return {
      type: SOFTWARE,
      payload: true
    };
  } else {
    return {
      type: SOFTWARE,
      payload: false
    };
  }
}

function connectivity(data) {
  if (data.length > 0) {
    return {
      type: CONNECTIVITY,
      payload: true
    };
  } else {
    return {
      type: CONNECTIVITY,
      payload: false
    };
  }
}

function clearAssets(data) {
  return {
    type: CLEAR,
    payload: data
  }
}