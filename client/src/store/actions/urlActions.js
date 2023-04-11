import {
  SET_URLS,
  SET_URLS_STARTED,
  SERVER_ERROR,
  // SET_BASE_URL,
  SET_CHECK_URL,
  CLEAR_URLS
} from './types';

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

export const setUrls = (params) => {

  setUrlsStarted();

  return {
    type: SET_URLS,
    payload: params
  };
}

export const clearUrls = () => ({
  type: CLEAR_URLS
});

const setUrlsStarted = () => ({
  type: SET_URLS_STARTED
});

export const serverError = error => ({
  type: SERVER_ERROR,
  payload: {
    error
  }
});


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