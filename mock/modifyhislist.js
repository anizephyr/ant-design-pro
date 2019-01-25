import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    RYMC: '徐立人',
    RYDM: Math.floor(Math.random() * 1000000000),
    XB: '男',
    SFZH: '213113394811015464',
    JGMC: '长沙分行',
    JGDM: '3100',
    LXDH: '12673840145',
    YGLX: '正式',
    JRGZCYSJ: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    BHYYGWSGSJ: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    RHSJ: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    XGW: '科技开发岗',
    XGWSGSJ: '2008-12-09',
    HYQK: '已婚',
    SYQK: '1',
    JTZZ: '滨江路129号XX大厦3楼',
    ZT: '正常',
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}
for (let i = 0; i < tableListDataSource.length; i += 1) {
  const rydm = tableListDataSource[i].RYDM;
  const result = [
    {
      JGMC: rydm,
      JGDM: rydm,
      YGLX: rydm,
      GW: rydm,
      SGSJ: '2019-01-19',
      LGSJ: '2019-01-19',
      HYQK: '已婚',
      SYQK: '1',
    },
    {
      JGMC: rydm,
      JGDM: rydm,
      YGLX: rydm,
      GW: rydm,
      SGSJ: '2019-01-19',
      LGSJ: '2019-01-19',
      HYQK: '已婚',
      SYQK: '1',
    },
    {
      JGMC: rydm,
      JGDM: rydm,
      YGLX: rydm,
      GW: rydm,
      SGSJ: '2019-01-19',
      LGSJ: '2019-01-19',
      HYQK: '已婚',
      SYQK: '1',
    },
  ];
  tableListDataSource[i].dataHis = result;
}

function getModifyHisList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postModifyHisList(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, addData, updateData, deleteData } = body;
  console.log(addData);
  console.log(updateData);
  console.log(deleteData);
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(
        item => deleteData.indexOf(item.RYDM) === -1
      );
      break;
    case 'add':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        RYMC: '徐立人',
        RYDM: Math.floor(Math.random() * 1000000000),
        XB: '男',
        SFZH: '213113394811015464',
        JGMC: '长沙分行',
        JGDM: '3100',
        LXDH: '12673840145',
        YGLX: '正式',
        JRGZCYSJ: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        BHYYGWSGSJ: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        RHSJ: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        XGW: '科技开发岗',
        XGWSGSJ: '2008-12-09',
        HYQK: '已婚',
        SYQK: '1',
        JTZZ: '滨江路129号XX大厦3楼',
        ZT: '正常',
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc: '123',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.RYDM === updateData.RYDM) {
          Object.assign(item, {});
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/modifyhislist': getModifyHisList,
  'POST /api/modifyhislist': postModifyHisList,
};
