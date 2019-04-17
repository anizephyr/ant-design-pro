import {
  queryIndicatorList,
  addIndicatorList,
  removeIndicatorList,
} from '@/services/assessmentinfo';

export default {
  namespace: 'indicatorList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryIndicatorList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addIndicatorList, payload);
      if (response.status) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeIndicatorList, payload);
      if (response.status) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
