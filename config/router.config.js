export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['creator', 'admin', 'operator', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/basicinfo/basicinfomanage' },
      /*
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      */
      //人员基本信息:1.基本信息维护2.变更记录3.积分管理
      {
        path: '/basicinfo',
        name: 'basicinfo',
        icon: 'table',
        routes: [
          {
            path: '/basicinfo/basicinfomanage',
            name: 'basicinfomanage',
            component: './BasicInfo/BasicInfoManage',
          },
          {
            path: '/basicinfo/modifyhis',
            name: 'modifyhis',
            component: './BasicInfo/ModifyHisList',
          },
          {
            path: '/basicinfo/markhismanage',
            name: 'markhismanage',
            component: './BasicInfo/MarkHisManage',
          },
        ],
      },
      //考核信息:1.考核指标明细维护 2.岗位与考核指标关系维护 3.人员考核信息 4.机构考核信息
      {
        path: '/assessmentinfo',
        name: 'assessmentinfo',
        icon: 'check-circle-o',
        routes: [
          {
            path: '/assessmentinfo/indicatorsmanage',
            name: 'indicatorsmanage',
            component: './AssessmentInfo/IndicatorsManage',
            authority: ['creator', 'admin'],
          },
          {
            path: '/assessmentinfo/relationship',
            name: 'relationship',
            component: './AssessmentInfo/Relationship',
            authority: ['creator', 'admin'],
          },
          {
            path: '/assessmentinfo/staffassessment',
            name: 'staffassessment',
            component: './AssessmentInfo/StaffAssessment',
          },
          {
            path: '/assessmentinfo/orgassessment',
            name: 'orgassessment',
            component: './AssessmentInfo/OrgAssessment',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          /* {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          }, */
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              /** {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              }, */
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
