import {
  CHECK_URL_SUCCESS,
  CHECK_URL_FAILURE,
  CHECK_URL_STARTED,
  SET_BASE_URL,
  SET_CHECK_URL
} from './types';

// import axios from 'axios';

export const checkUrl = (url) => {
  // console.log(url);
  return (dispatch, getState) => {
    dispatch(checkUrlStarted());
    dispatch(checkUrlSuccess(url));
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


  };
};

// const checkUrlSuccess = (url, status) => ({
//   type: CHECK_URL_SUCCESS,
//   payload: {
//     url,
//     status
//   }
// });

const checkUrlSuccess = (url) => ({
  type: CHECK_URL_SUCCESS,
  payload: {
    url
  }
});

const checkUrlStarted = () => ({
  type: CHECK_URL_STARTED
});

const checkUrlFailure = error => ({
  type: CHECK_URL_FAILURE,
  payload: {
    error
  }
});

export const setBaseUrl = (url) => ({
  type: SET_BASE_URL,
  payload: {
    url
  }
});

export const setCheckUrl = (url) => ({
  type: SET_CHECK_URL,
  payload: {
    url
  }
});