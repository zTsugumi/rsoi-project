import { STAT_REQUEST, STAT_SUCCESS, STAT_FAILURE } from './allTypes';
import { URL_GW, PFX } from '../../shared/config';
import axios from 'axios';

const statRequest = () => ({
  type: STAT_REQUEST,
});

const statSuccess = (stats) => ({
  type: STAT_SUCCESS,
  payload: stats,
});

const statError = (msg) => ({
  type: STAT_FAILURE,
  payload: msg,
});

const statGet = (query) => async (dispatch) => {
  dispatch(statRequest());

  let url = `${URL_GW}${PFX}/statistics?service=${query.serviceName}`;

  if (query.fromDate) {
    url += `&fromDate=${query.fromDate}`;
  }

  if (query.toDate) {
    url += `&toDate=${query.toDate}`;
  }

  return await axios({
    method: 'get',
    url: url,
    withCredentials: true,
  })
    .then((response) => {
      dispatch(statSuccess(response.data));
    })
    .catch((error) => {
      dispatch(statError(error.response.data.message));
    });
};

const statActions = {
  statGet,
};

export default statActions;
