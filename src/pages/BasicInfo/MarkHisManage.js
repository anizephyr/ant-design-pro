import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Divider,
  InputNumber,
  message,
  DatePicker,
  Drawer,
  Upload,
  Popconfirm,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getToken } from '@/utils/authority';

import styles from './MarkHisManage.less';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const { getFieldDecorator } = form;

  return (
    <Drawer
      width={500}
      destroyOnClose
      title="积分信息录入"
      visible={modalVisible}
      onClose={() => handleModalVisible()}
    >
      <Row gutter={16}>
        <Col span={12}>
          <FormItem label="机构名称">
            {getFieldDecorator('JGMC', {
              rules: [
                { required: true, message: '机构名不能为空！' },
                { max: 20, message: '机构名称过长！' },
              ],
            })(<Input placeholder="请输入机构名称" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="机构代码">
            {getFieldDecorator('JGDM', {
              rules: [{ required: true, message: '机构代码不能为空！' }],
            })(<Input placeholder="请输入机构代码" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormItem label="姓名">
            {getFieldDecorator('RYMC', {
              rules: [{ required: true, message: '姓名不能为空！' }],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="十位工号">
            {getFieldDecorator('RYDM', {
              rules: [{ required: true, message: '十位工号错误！', len: 10 }],
            })(<Input placeholder="请输入十位工号" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormItem label="岗位">
            {getFieldDecorator('GW', {
              rules: [{ required: true, message: '岗位不能为空！' }],
            })(<Input placeholder="请输入岗位" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="考试项目">
            {getFieldDecorator('XMMC', {
              rules: [{ required: true, message: '项目名称不能为空！' }],
            })(<Input placeholder="请输入项目名称" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormItem label="考试日期">
            {getFieldDecorator('KSSJ', {
              rules: [{ required: true, message: '选项不能为空！' }],
            })(
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" laceholder="选择考试日期" />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="积分">
            {getFieldDecorator('JF', {
              rules: [{ required: true, message: '输入不能为空！' }],
            })(<InputNumber placeholder="请输入积分" />)}
          </FormItem>
        </Col>
      </Row>
      <FormItem label="备注">
        {getFieldDecorator('BZ')(<TextArea row={2} placeholder="请输入备注" />)}
      </FormItem>
      <Divider type="horizontal" />
      <Button onClick={() => handleModalVisible()} style={{ marginRight: 8 }}>
        取消
      </Button>
      <Button onClick={okHandle} type="primary">
        确定
      </Button>
    </Drawer>
  );
});
@connect(({ markhislist, loading }) => ({
  markhislist,
  loading: loading.models.markhislist,
}))
@Form.create()
class MarkHisManage extends PureComponent {
  state = {
    modalVisible: false,
    expandRowByClick: true,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '工号',
      dataIndex: 'RYDM',
      width: 150,
    },
    {
      title: '机构代码',
      dataIndex: 'JGDM',
      width: 150,
    },
    {
      title: '姓名',
      dataIndex: 'RYMC',
      width: 150,
    },
    {
      title: '现机构',
      dataIndex: 'JGMC',
      width: 150,
    },
    {
      title: '现岗位',
      dataIndex: 'GW',
      width: 200,
    },
    {
      title: '总积分',
      dataIndex: 'ZJF',
      width: 150,
      // sorter:true,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'markhislist/fetch',
      payload: {
        selectData: {},
        token: getToken(),
      },
      callback: resp => {
        if (!resp.status) {
          message.error(resp.msg);
        }
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'markhislist/fetch',
      payload: {
        selectData: params,
        token: getToken(),
      },
      callback: resp => {
        if (!resp.status) {
          message.error(resp.msg);
        }
      },
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'markhislist/fetch',
      payload: {
        selectData: {},
        token: getToken(),
      },
      callback: resp => {
        if (!resp.status) {
          message.error(resp.msg);
        }
      },
    });
  };

  handleUploadChange = info => {
    if (info.file.status !== 'uploading') {
      // console.log(info.event);
    }
    if (info.file.status === 'done') {
      const resp = info.file.response;
      if (resp.status) {
        message.success(`${info.file.name} 文件提交成功！`);
      } else {
        message.error(`${info.file.name} 文件提交失败！${resp.msg}`, 7);
        console.log(resp.msg);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件提交失败！`);
    }
  };

  handleExportClick = () => {
    const { dispatch } = this.props;
    const { selectedRows, formValues } = this.state;
    if (selectedRows.length === 0) return;
    dispatch({
      type: 'markhislist/export',
      payload: {
        selectData: formValues,
        exportData: selectedRows.map(row => `'${row.RYDM}'`),
        token: getToken(),
      },
      callback: blob => {
        const aLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const fileName = '积分查询结果导出.xlsx';
        aLink.href = url;
        aLink.download = fileName;
        aLink.click();
      },
    });
  };

  handleDownloadTemplateClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'markhislist/template',
      payload: {
        token: getToken(),
      },
      callback: blob => {
        const aLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const fileName = '积分数据导入模版.xlsx';
        aLink.href = url;
        aLink.download = fileName;
        aLink.click();
      },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { sorter } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const params = {
        sorter,
        ...fieldsValue,
      };

      this.setState({
        formValues: params,
      });

      dispatch({
        type: 'markhislist/fetch',
        payload: {
          selectData: params,
          token: getToken(),
        },
        callback: resp => {
          if (!resp.status) {
            message.error(resp.msg);
          }
        },
      });
    });
  };

  handleSingleDelete = record => {
    const { dispatch } = this.props;
    const { sorter, filter, formValues } = this.state;
    const params = {
      sorter,
      ...formValues,
      ...filter,
    };
    dispatch({
      type: 'markhislist/remove',
      payload: {
        selectData: params,
        deleteData: [record].map(row => ({ ID: row.ID, JGDM: row.JGDM })),
        token: getToken(),
      },
      callback: resp => {
        if (resp.status) {
          message.success(resp.msg);
        } else {
          message.error(resp.msg);
        }
      },
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    const { sorter, filter, formValues } = this.state;
    const params = {
      sorter,
      ...formValues,
      ...filter,
    };

    dispatch({
      type: 'markhislist/add',
      payload: {
        token: getToken(),
        selectData: params,
        addData: {
          JGMC: fields.JGMC,
          RYMC: fields.RYMC,
          JGDM: fields.JGDM,
          RYDM: fields.RYDM,
          GW: fields.GW,
          XMMC: fields.XMMC,
          DF: 0,
          JF: fields.JF,
          KSSJ: moment(fields.KSSJ).format('YYYY-MM-DD'),
          BZ: fields.BZ == null ? '' : fields.BZ,
        },
      },
      callback: resp => {
        if (resp.status) {
          message.success(resp.msg);
          this.handleModalVisible();
        } else {
          message.error(resp.msg);
        }
      },
    });
  };

  expandedRowRender = record => {
    const columns = [
      {
        title: '工号',
        dataIndex: 'RYDM',
        width: 125,
      },
      {
        title: '机构代码',
        dataIndex: 'JGDM',
        width: 125,
      },
      {
        title: '姓名',
        dataIndex: 'RYMC',
        width: 125,
      },
      {
        title: '机构',
        dataIndex: 'JGMC',
        width: 125,
      },
      {
        title: '岗位',
        dataIndex: 'GW',
        width: 125,
      },
      {
        title: '考试项目',
        dataIndex: 'XMMC',
        width: 125,
      },
      {
        title: '积分',
        dataIndex: 'JF',
        width: 100,
      },
      {
        title: '考试时间',
        dataIndex: 'KSSJ',
        width: 150,
        render: val => {
          if (val === '') {
            return '';
          }
          return <span>{moment(val).format('YYYY-MM-DD')}</span>;
        },
      },
      {
        title: '备注',
        dataIndex: 'BZ',
        width: 150,
      },
      {
        title: '操作',
        width: 150,
        fixed: 'right',
        render: (text, data) => (
          <Fragment>
            <Popconfirm
              title="确认删除？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => this.handleSingleDelete(data)}
            >
              <a href="#">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];

    return <Table dataSource={record.MarkHis} columns={columns} pagination={false} rowKey="ID" />;
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="机构代码">
              {getFieldDecorator('JGDM')(<Input placeholder="请输入机构代码" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="人员姓名">
              {getFieldDecorator('RYMC')(<Input placeholder="请输入人员姓名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="人员代码">
              {getFieldDecorator('RYDM')(<Input placeholder="请输入人员工号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="积分时段">
              {getFieldDecorator('JFSD')(<RangePicker format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      markhislist: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, expandRowByClick } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const uploadProps = {
      name: 'import_markhis',
      accept: '.xlsx',
      action: '/DAP/yyrygl/uploadHandler',
      showUploadList: true,
      headers: {
        Authorization: getToken(),
      },
    };
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false} bodyStyle={{ padding: '24px 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
              {selectedRows.length > 0 && (
                <Button key="export" icon="export" type="primary" onClick={this.handleExportClick}>
                  批量导出
                </Button>
              )}
              <Button icon="download" type="dashed" onClick={this.handleDownloadTemplateClick}>
                导入模版下载
              </Button>
              <Upload {...uploadProps} onChange={this.handleUploadChange}>
                <Button icon="import" type="primary">
                  数据导入
                </Button>
              </Upload>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              pagination={false}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              expandRowByClick={expandRowByClick}
              expandedRowRender={this.expandedRowRender}
              rowKey="RYDM"
              size="small"
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default MarkHisManage;
