function postUserHandler(req, res) {
  // const { method } = req.body;
  // if (method === "currentUser") {
  //   const currentUser = { "JGDM": "3100", "SFZH": "430111198411011312", "SYQK": "1", "JCLX": "非运营人员", "ZGXL": "本科", "JTZZ": "滨江路189号民生大厦", "XGW": "科技开发岗", "DYXL": "本科", "HYQK": "已婚", "XB": "男", "RHSJ": "2008-12-01", "XGWSGSJ": "2008-12-01", "JGMC": "长沙分行", "LXDH": "18674880545", "YGLX": "正式", "SFQRZ": "是", "RYDM": "0000035332", "YYGWSGSJ": "2008-12-01", "JRGZCYSJ": "2008-12-01", "ZT": "1", "RYMC": "徐立人", "status": true };
  //   return res.json(currentUser);

  // }
  const currentUser = {
    JGDM: '3100',
    SFZH: '430111198411011312',
    SYQK: '1',
    JCLX: '非运营人员',
    ZGXL: '本科',
    JTZZ: '滨江路189号民生大厦',
    XGW: '科技开发岗',
    DYXL: '本科',
    HYQK: '已婚',
    XB: '男',
    RHSJ: '2008-12-01',
    XGWSGSJ: '2008-12-01',
    JGMC: '长沙分行',
    LXDH: '18674880545',
    YGLX: '正式',
    SFQRZ: '是',
    RYDM: '0000035332',
    YYGWSGSJ: '2008-12-01',
    JRGZCYSJ: '2008-12-01',
    ZT: '1',
    RYMC: '徐立人',
    status: true,
  };
  return res.json(currentUser);
  // if (method === "login") {
  //   const { password, userName, type } = req.body;
  //   if (password === '1qaz2wsx' && userName === 'admin') {
  //     res.send({
  //       status: true,
  //       type,
  //       currentAuthority: 'admin',
  //     });
  //   }
  //   if (password === '1qaz2wsx' && userName === 'user') {
  //     res.send({
  //       status: true,
  //       type,
  //       currentAuthority: 'user',
  //     });
  //   }
  //   res.send({
  //     status: false,
  //     type,
  //     currentAuthority: 'guest',
  //   });

  // }
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // GET POST 可省略
  'GET /server/api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],

  'POST /server/api/userHandler': postUserHandler,
  'POST /server/api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /server/api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /server/api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /server/api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /server/api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
