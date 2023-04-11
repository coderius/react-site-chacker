import {
  SET_URL,
  SET_URL_STARTED,
  SET_URL_SUCCESS,
  SET_URL_FAILURE,
  SERVER_ERROR,
  // SET_BASE_URL,
  SET_CHECK_URL,
  CLEAR_URLS,
  START_POPULATE_URLS,
  END_POPULATE_URLS,
  URLS_COUNT
} from './types';

import {
  POPULATE_URLS_STARTING,
  POPULATE_URLS_ENDING
} from './events';
// import axios from 'axios';

// export const setUrls = (url) => {
//   // console.log(url);
//   return (dispatch, getState) => {
//     dispatch(checkUrlStarted());
//     dispatch(checkUrlSuccess(url));
// const { baseUrl } = getState();
// const r = new RegExp('^(?:[a-z+]+:)?//', 'i');
// const isAbsolute = r.test(url);
// const modyUrl = isAbsolute ? url : baseUrl + url;

// (async () => {
//   try {
//     let url = 'https://codworker.github.io';
//     let response = await fetch(url);
//     let status = await response.status;
//     console.log(url, status);
//   } catch (err) {
//     console.log(err);
//   }


// })();

// fetch(url, {
//   method: 'GET',
//   withCredentials: true,
//   crossorigin: true,
//   mode: 'no-cors',
// })
//   .then(res => {
//     console.log(res);
//     dispatch(checkUrlSuccess(url, res.status));
//   })
//   .catch(err => {
//     dispatch(checkUrlFailure(err));
//   });


//   };
// };

// const checkUrlSuccess = (url, status) => ({
//   type: CHECK_URL_SUCCESS,
//   payload: {
//     url,
//     status
//   }
// });

export const pushUrl = (params) => {
  return (dispatch, getState) => {
    let promise = new Promise(function (resolve, reject) {
      dispatch(setUrlStarted());
      dispatch(setUrl(params));
      // setTimeout(() => resolve(), 5000);
      // console.log(params);
      resolve();
      reject("some error with setting url");
    });

    promise.then(() => {
        // console.log(params);
        dispatch(setUrlSuccess());
      })
      .catch(err => {
        dispatch(setUrlFailure(err));
      });
  }
}

const setUrlStarted = () => ({
  type: SET_URL_STARTED,
  payload: {
    statusSetUrl: {
      event: 'onSetUrlStarted',
      message: 'start setting url...',
    }
  }
});

const setUrl = (params) => ({
  type: SET_URL,
  payload: {
    params: params
  }
});

const setUrlSuccess = () => ({
  type: SET_URL_SUCCESS,
  payload: {
    statusSetUrl: {
      event: 'onSetUrlSuccess',
      message: 'success setting url...',
    },
  }
});

const setUrlFailure = (error) => ({
  type: SET_URL_FAILURE,
  payload: {
    statusSetUrl: {
      event: 'onSetUrlFailure',
      message: 'fail setting url...',
    }
  }
});

export const clearUrls = () => ({
  type: CLEAR_URLS
});

export const serverError = error => ({
  type: SERVER_ERROR,
  payload: {
    error
  }
});

export const startPopulateUrls = () => ({
  type: START_POPULATE_URLS
});

const urlsCount = (count) => ({
  type: URLS_COUNT,
  payload: {
    count
  }
});

export const endPopulateUrls = () => {
// console.log("vfdv");
  return (dispatch, getState) => {
    new Promise(function (resolve, reject) {
      dispatch({
        type: END_POPULATE_URLS
      });
      const state = getState();
      resolve(state);
    })
      .then(state => {
        const urls = state.urlReducer.urls;
        dispatch(urlsCount(urls.length));
      });
  }
};



/////////
// export const setBaseUrl = (url) => ({
//   type: SET_BASE_URL,
//   payload: {
//     url
//   }
// });

export const setCheckUrl = (url) => ({
  type: SET_CHECK_URL,
  payload: {
    url
  }
});