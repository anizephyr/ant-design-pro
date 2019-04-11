import { queryModifyHisList, exportModifyHisList } from '@/services/basicinfo';

export default {
  namespace: 'modifyhislist',

  state: {
    data: {
      list: [],
      // pagination: {},
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryModifyHisList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *export({ payload, callback }, { call }) {
      const response = yield call(exportModifyHisList, payload);
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
