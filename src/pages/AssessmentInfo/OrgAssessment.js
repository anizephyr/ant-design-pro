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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getToken } from '@/utils/authority';

import styles from './StaffAssessment.less';

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, orgIndicators } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const { getFieldDecorator } = form;
  const { list } = orgIndicators;
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
      title="机构考核信息录入"
      visible={modalVisible}
      onClose={() => handleModalVisible()}
    >
      <Row gutter={16}>
        <Col span={8}>
          <FormItem label="机构代码" style={{ marginBottom: '12px' }}>
            {getFieldDecorator('JGDM', {
              rules: [{ required: true, message: '机构代码不能为空！' }],
            })(<Input placeholder="请输入机构代码" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="机构名称" style={{ marginBottom: '12px' }}>
            {getFieldDecorator('JGMC', {
              rules: [
                { required: true, message: '机构名不能为空！' },
                { max: 20, message: '机构名称过长！' },
              ],
            })(<Input placeholder="请输入机构名称" />)}
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
                <Option value="一季度">一季度</Option>
                <Option value="二季度">二季度</Option>
                <Option value="三季度">三季度</Option>
                <Option value="四季度">四季度</Option>
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
@connect(({ assessmentlist, loading }) => ({
  assessmentlist,
  loading: loading.models.assessmentlist,
}))
@Form.create()
class OrgAssessment extends PureComponent {
  state = {
    modalVisible: false,
    expandRowByClick: true,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '考核时段',
      dataIndex: 'KHSD',
      width: 280,
    },
    {
      title: '机构名称',
      dataIndex: 'JGMC',
      width: 300,
    },
    {
      title: '机构代码',
      dataIndex: 'JGDM',
      width: 220,
    },
    {
      title: '总分',
      dataIndex: 'ZF',
      width: 400,
      // sorter:true,
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
      type: 'assessmentlist/fetchOrgIndicators',
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
        type: 'assessmentlist/fetchOrg',
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
      type: 'assessmentlist/fetchOrg',
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
      type: 'assessmentlist/fetch',
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
      type: 'assessmentlist/export',
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
      type: 'assessmentlist/template',
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
        type: 'assessmentlist/fetchOrg',
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
      type: 'assessmentlist/removeOrg',
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
    const { sorter, filter, formValues } = this.state;
    const params = {
      sorter,
      ...formValues,
      ...filter,
    };

    dispatch({
      type: 'assessmentlist/addOrg',
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
        width: 60,
      },
      {
        title: '考核项目',
        dataIndex: 'KHXM',
        width: 120,
      },
      {
        title: '考核指标',
        dataIndex: 'KHZB',
        width: 120,
      },
      {
        title: '得分',
        dataIndex: 'FS',
        width: 100,
      },
      {
        title: '考核内容',
        dataIndex: 'KHNR',
        width: 440,
      },
      {
        title: '权重',
        dataIndex: 'QZ',
        width: 100,
      },
      {
        title: '备注',
        dataIndex: 'BZ',
        width: 250,
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
                  <Option value="一季度">一季度</Option>
                  <Option value="二季度">二季度</Option>
                  <Option value="三季度">三季度</Option>
                  <Option value="四季度">四季度</Option>
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
      assessmentlist: { data, orgIndicators },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, expandRowByClick } = this.state;
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
      },
    };
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false} bodyStyle={{ padding: '24px 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" onClick={() => this.handleModalVisible(true)}>
                录入
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
              scroll={{ x: 1200 }}
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} orgIndicators={orgIndicators} />
      </PageHeaderWrapper>
    );
  }
}

export default OrgAssessment;
