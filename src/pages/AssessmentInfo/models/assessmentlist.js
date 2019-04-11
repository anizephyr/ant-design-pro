import {
  queryOrgAssessment,
  removeOrgAssessment,
  addOrgAssessment,
  exportMarkHisList,
  downloadTemplate,
  queryOrgIndicators,
} from '@/services/assessmentinfo';

export default {
  namespace: 'assessmentlist',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    orgIndicators: {},
    staffIndicators: {},
  },

  effects: {
    *fetchOrg({ payload, callback }, { call, put }) {
      const response = yield call(queryOrgAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchOrgIndicators({ payload, callback }, { call, put }) {
      const response = yield call(queryOrgIndicators, payload);
      yield put({
        type: 'saveOrgIndicators',
        payload: response,
      });
      if (callback) callback(response);
    },
    *addOrg({ payload, callback }, { call, put }) {
      const response = yield call(addOrgAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *removeOrg({ payload, callback }, { call, put }) {
      const response = yield call(removeOrgAssessment, payload);
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
    saveOrgIndicators(state, action) {
      return {
        ...state,
        orgIndicators: action.payload,
      };
    },
  },
};
