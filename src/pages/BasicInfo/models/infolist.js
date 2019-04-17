import { queryInfoList, removeInfoList, addInfoList, updateInfoList } from '@/services/basicinfo';

export default {
  namespace: 'infolist',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryInfoList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addInfoList, payload);
      if (response.status) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeInfoList, payload);
      if (response.status) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
      if (callback) callback(response);
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateInfoList, payload);
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
