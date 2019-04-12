import {
  queryOrgAssessment,
  removeOrgAssessment,
  addOrgAssessment,
  exportOrgAssessment,
  downloadOrgAssessmentTemplate,
  queryOrgIndicators,
} from '@/services/assessmentinfo';

export default {
  namespace: 'orgAssessmentList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    indicators: {},
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryOrgAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchIndicators({ payload, callback }, { call, put }) {
      const response = yield call(queryOrgIndicators, payload);
      yield put({
        type: 'saveOrgIndicators',
        payload: response,
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addOrgAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeOrgAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *export({ payload, callback }, { call }) {
      const response = yield call(exportOrgAssessment, payload);
      if (callback) callback(response);
    },
    *template({ payload, callback }, { call }) {
      const response = yield call(downloadOrgAssessmentTemplate, payload);
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
        indicators: action.payload,
      };
    },
  },
};
