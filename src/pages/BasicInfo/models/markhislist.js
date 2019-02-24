import {
  queryMarkHisList,
  removeMarkHisList,
  addMarkHisList,
  exportMarkHisList,
  downloadTemplate,
} from '@/services/markhis';

export default {
  namespace: 'markhislist',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryMarkHisList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addMarkHisList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeMarkHisList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *export({ payload, callback }, { call }) {
      const response = yield call(exportMarkHisList, payload);
      if (callback) callback(response);
    },
    *template({ payload, callback }, { call }) {
      const response = yield call(downloadTemplate, payload);
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
