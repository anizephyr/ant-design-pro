import { queryModifyHisList } from '@/services/api';

export default {
  namespace: 'modifyhislist',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    dataHis: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryModifyHisList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
