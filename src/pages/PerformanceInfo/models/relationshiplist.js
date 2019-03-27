import {
  queryRelationship,
  matchRelationship,
  checkRelationship,
} from '@/services/performanceinfo';

export default {
  namespace: 'relationshiplist',

  state: {
    dataRight: {
      list: [],
      pagination: {},
    },
    dataLeft: {
      list: [],
    },
  },

  effects: {
    *fetchleft({ payload, callback }, { call, put }) {
      const response = yield call(queryRelationship, payload);
      yield put({
        type: 'saveleft',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchright({ payload, callback }, { call, put }) {
      const response = yield call(queryRelationship, payload);
      yield put({
        type: 'saveright',
        payload: response,
      });
      if (callback) callback(response);
    },
    *checkright({ payload, callback }, { call, put }) {
      const response = yield call(checkRelationship, payload);
      yield put({
        type: 'saveright',
        payload: response,
      });
      if (callback) callback(response);
    },
    *match({ payload, callback }, { call }) {
      const response = yield call(matchRelationship, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    saveleft(state, action) {
      return {
        ...state,
        dataLeft: action.payload,
      };
    },
    saveright(state, action) {
      return {
        ...state,
        dataRight: action.payload,
      };
    },
  },
};
