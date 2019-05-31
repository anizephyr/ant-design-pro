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
  Select,
  Divider,
  message,
  Drawer,
  Upload,
  Popconfirm,
  InputNumber,
  notification,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getToken } from '@/utils/authority';

import styles from './StaffAssessment.less';
import Authorized from '@/utils/Authorized';

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, indicators, currentJob } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const title = `${currentJob} 考核信息录入`;
  const { getFieldDecorator } = form;
  const { list } = indicators;
  const generateCreateFormBody =
    list === undefined
      ? {}
      : list.map(item => {
          const nodes = item.Nodes;
          const generateChildrenBody = nodes.map(node => {
            return (
              <Col span={8} key={node.KHZBDM}>
                <FormItem label={node.KHZB} style={{ marginBottom: '12px' }}>
                  {getFieldDecorator(`${node.KHZBDM}`)(
                    <InputNumber placeholder="请输入评分" style={{ width: '100%' }} step={0.1} />
                  )}
                </FormItem>
              </Col>
            );
          });
          return (
            <Row gutter={16} key={item.ZXSX}>
              {generateChildrenBody}
            </Row>
          );
        });
  return (
    <Drawer
      width={500}
      destroyOnClose
      title={title}
      visible={modalVisible}
      onClose={() => handleModalVisible()}
    >
      <Row gutter={16}>
        <Col span={8}>
          <FormItem label="人员代码" style={{ marginBottom: '12px' }}>
            {getFieldDecorator('RYDM', {
              rules: [{ required: true, message: '人员代码不能为空！' }],
            })(<Input placeholder="请输入人员代码" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="人员名称" style={{ marginBottom: '12px' }}>
            {getFieldDecorator('RYMC', {
              rules: [
                { required: true, message: '姓名不能为空！' },
                { max: 20, message: '姓名过长！' },
              ],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <FormItem label="考核年度" style={{ marginBottom: '12px' }}>
            {getFieldDecorator('KHND', {
              initialValue: moment().format('YYYY'),
              rules: [{ required: true, message: '考核年度不能为空！' }],
            })(<InputNumber placeholder="请输入考核年度" style={{ width: '100%' }} min={2017} />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="考核季度" style={{ marginBottom: '12px' }}>
            {getFieldDecorator('KHJD', {
              rules: [{ required: true, message: '考核季度不能为空！' }],
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="1季度">一季度</Option>
                <Option value="2季度">二季度</Option>
                <Option value="3季度">三季度</Option>
                <Option value="4季度">四季度</Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      {generateCreateFormBody}
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
@connect(({ staffAssessmentList, loading }) => ({
  staffAssessmentList,
  loading: loading.models.staffAssessmentList,
}))
@Form.create()
class StaffAssessment extends PureComponent {
  state = {
    modalVisible: false,
    expandRowByClick: true,
    selectedRows: [],
    formValues: {},
    currentJob: null,
  };

  columns = [
    {
      title: '考核时段',
      dataIndex: 'KHSD',
      width: 150,
    },
    {
      title: '机构代码',
      dataIndex: 'JGDM',
      width: 100,
    },
    {
      title: '工号',
      dataIndex: 'RYDM',
      width: 100,
    },
    {
      title: '机构名称',
      dataIndex: 'JGMC',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'RYMC',
      width: 100,
    },
    {
      title: '岗位',
      dataIndex: 'GW',
      width: 100,
    },
    {
      title: '总分',
      dataIndex: 'ZF',
      width: 100,
      render: val => val.toFixed(2),
      // sorter:true,
    },
    {
      title: '',
      dataIndex: 'BZ',
      width: 200,
    },
    {
      title: '操作',
      width: 100,
      // fixed: 'right',
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

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'staffAssessmentList/fetchJobs',
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

  componentDidMount() {
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'staffAssessmentList/fetch',
        payload: {
          selectData: fieldsValue,
          token: getToken(),
        },
        callback: resp => {
          if (!resp.status) {
            message.error(resp.msg);
          }
        },
      });
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
      type: 'staffAssessmentList/fetch',
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
    const { currentJob } = this.state;
    if (currentJob === null) {
      message.warn('请先选择岗位！');
      return;
    }
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
      type: 'staffAssessmentList/fetch',
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

  handleJobChange = job => {
    const { dispatch } = this.props;
    dispatch({
      type: 'staffAssessmentList/fetchIndicators',
      payload: {
        selectData: { GW: job },
        token: getToken(),
      },
      callback: resp => {
        if (!resp.status) {
          message.error(resp.msg);
        } else {
          this.setState({ currentJob: job });
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
        notification.error({
          message: '数据导入失败',
          description: `${info.file.name} 文件提交失败！\n${resp.msg}`,
          duration: null,
        });
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
      type: 'staffAssessmentList/export',
      payload: {
        selectData: formValues,
        exportData: selectedRows.map(row => ({ KHSD: row.KHSD, RYDM: row.RYDM })),
        token: getToken(),
      },
      callback: blob => {
        const aLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const fileName = '人员考核结果导出.xlsx';
        aLink.href = url;
        aLink.download = fileName;
        aLink.click();
      },
    });
  };

  handleDownloadTemplateClick = () => {
    const { currentJob } = this.state;
    if (currentJob === null) {
      message.warn('请先选择岗位！');
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'staffAssessmentList/template',
      payload: {
        selectData: { GW: currentJob },
        token: getToken(),
      },
      callback: blob => {
        const aLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const fileName = `人员考核数据导入模版_${currentJob}.xlsx`;
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
        type: 'staffAssessmentList/fetch',
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
      type: 'staffAssessmentList/remove',
      payload: {
        selectData: params,
        deleteData: record.Children.map(child => child.ID),
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
    const { sorter, filter, formValues, currentJob } = this.state;
    const params = {
      sorter,
      ...formValues,
      ...filter,
      currentJob,
    };

    dispatch({
      type: 'staffAssessmentList/add',
      payload: {
        token: getToken(),
        selectData: params,
        addData: fields,
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
        title: '',
        dataIndex: 'BLANK',
        width: 80,
      },
      {
        title: '考核项目',
        dataIndex: 'KHXM',
        width: 150,
      },
      {
        title: '考核指标',
        dataIndex: 'KHZB',
        width: 200,
      },
      {
        title: '考核内容',
        dataIndex: 'KHNR',
        width: 400,
      },
      {
        title: '得分',
        dataIndex: 'FS',
        width: 100,
      },
      {
        title: '备注',
        dataIndex: 'BZ',
        width: 400,
      },
    ];

    return <Table dataSource={record.Children} columns={columns} pagination={false} rowKey="ID" />;
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
            <FormItem label="机构名称">
              {getFieldDecorator('JGMC')(<Input placeholder="请输入机构名称" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="人员代码">
              {getFieldDecorator('RYDM')(<Input placeholder="请输入工号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="人员名称">
              {getFieldDecorator('RYMC')(<Input placeholder="请输入姓名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="岗位">
              {getFieldDecorator('GW')(<Input placeholder="请输入岗位" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}>
            <FormItem label="考核年度">
              {getFieldDecorator('KHND', {
                initialValue: moment().format('YYYY'),
              })(<InputNumber min={2017} style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="考核季度">
              {getFieldDecorator('KHJD')(
                <Select placeholder="请选择">
                  <Option value="1季度">一季度</Option>
                  <Option value="2季度">二季度</Option>
                  <Option value="3季度">三季度</Option>
                  <Option value="4季度">四季度</Option>
                </Select>
              )}
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
      staffAssessmentList: { data, indicators, jobs },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, expandRowByClick, currentJob } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const uploadProps = {
      name: 'import_staffAssessment',
      accept: '.xlsx',
      action: '/DAP/yyrygl/uploadHandler',
      showUploadList: true,
      headers: {
        Authorization: getToken(),
        CurrentJob: encodeURI(currentJob),
      },
    };
    const joblist = jobs.list;
    const renderOptions =
      joblist === undefined
        ? ''
        : joblist.map(job => {
            return (
              <Option key={job.GW} value={job.GW}>
                {job.GW}
              </Option>
            );
          });
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false} bodyStyle={{ padding: '24px 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <Button key="export" icon="export" type="primary" onClick={this.handleExportClick}>
                  批量导出
                </Button>
              )}
              <Authorized current authority={['creator', 'admin']}>
                <Select
                  className={styles.antSelect}
                  onChange={this.handleJobChange}
                  placeholder="请选择岗位"
                  loading={loading}
                >
                  {renderOptions}
                </Select>
                <Button icon="plus" onClick={() => this.handleModalVisible(true)}>
                  录入
                </Button>
                <Button icon="download" type="dashed" onClick={this.handleDownloadTemplateClick}>
                  导入模版下载
                </Button>
                <Upload {...uploadProps} onChange={this.handleUploadChange}>
                  <Button icon="import" type="primary">
                    数据导入
                  </Button>
                </Upload>
              </Authorized>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              expandRowByClick={expandRowByClick}
              expandedRowRender={this.expandedRowRender}
              rowKey="ROWKEY"
              size="small"
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          indicators={indicators}
          currentJob={currentJob}
        />
      </PageHeaderWrapper>
    );
  }
}

export default StaffAssessment;
