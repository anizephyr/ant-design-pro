import {
  queryStaffAssessment,
  removeStaffAssessment,
  addStaffAssessment,
  exportStaffAssessment,
  downloadStaffAssessmentTemplate,
  queryStaffIndicatorsByJob,
  queryStaffJobs,
} from '@/services/assessmentinfo';

export default {
  namespace: 'staffAssessmentList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    indicators: {},
    jobs: {},
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryStaffAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchJobs({ payload, callback }, { call, put }) {
      const response = yield call(queryStaffJobs, payload);
      yield put({
        type: 'saveJobs',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchIndicators({ payload, callback }, { call, put }) {
      const response = yield call(queryStaffIndicatorsByJob, payload);
      yield put({
        type: 'saveIndicators',
        payload: response,
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addStaffAssessment, payload);
      if (response.status) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeStaffAssessment, payload);
      if (response.status) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
      if (callback) callback(response);
    },
    *export({ payload, callback }, { call }) {
      const response = yield call(exportStaffAssessment, payload);
      if (callback) callback(response);
    },
    *template({ payload, callback }, { call }) {
      const response = yield call(downloadStaffAssessmentTemplate, payload);
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
    saveIndicators(state, action) {
      return {
        ...state,
        indicators: action.payload,
      };
    },
    saveJobs(state, action) {
      return {
        ...state,
        jobs: action.payload,
      };
    },
  },
};
