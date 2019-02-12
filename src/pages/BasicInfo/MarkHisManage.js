import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Button,
  DatePicker,
  Modal,
  /* InputNumber, */
  message,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getToken } from '@/utils/authority';
import styles from './MarkHisManage.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const ExportForm = Form.create()(props => {
  const { modalVisible, form, handleExport, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleExport(fieldsValue);
    });
  };
  const { getFieldDecorator } = form;

  return (
    <Modal
      width={700}
      destroyOnClose
      title="人员录入"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Row gutter={16}>
        <Col span={8}>
          <FormItem label="机构名称">
            {getFieldDecorator('JGMC', {
              rules: [
                { required: true, message: '机构名不能为空！' },
                { max: 20, message: '机构名称过长！' },
              ],
            })(<Input placeholder="请输入机构名称" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="机构代码">
            {getFieldDecorator('JGDM', {
              rules: [{ required: true, message: '机构代码不能为空！' }],
            })(<Input placeholder="请输入机构代码" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <FormItem label="姓名">
            {getFieldDecorator('RYMC', {
              rules: [{ required: true, message: '姓名不能为空！' }],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="十位工号">
            {getFieldDecorator('RYDM', {
              rules: [{ required: true, message: '十位工号错误！', len: 10 }],
            })(<Input placeholder="请输入十位工号" />)}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ markhislist, loading }) => ({
  markhislist,
  loading: loading.models.markhislist,
}))
@Form.create()
class MarkHisManage extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    expandRowByClick: true,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '积分时段',
      dataIndex: 'JFSD',
      width: 125,
    },
    {
      title: '机构代码',
      dataIndex: 'JGDM',
      sorter: true,
      width: 125,
    },
    {
      title: '人员代码',
      dataIndex: 'RYDM',
      sorter: true,
      width: 125,
    },
    {
      title: '机构名称',
      dataIndex: 'JGMC',
      sorter: true,
      width: 150,
    },
    {
      title: '人员姓名',
      dataIndex: 'RYMC',
      sorter: true,
      width: 125,
    },
    {
      title: '岗位',
      dataIndex: 'GW',
      width: 150,
    },
    {
      title: '积分总分',
      dataIndex: 'JFZF',
      width: 125,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'markhislist/fetch',
      payload: {
        token: getToken(),
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
        ...params,
        token: getToken(),
      },
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleExport = e => {
    // TODO
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'export':
        dispatch({
          type: 'markhislist/export',
          payload: {
            deleteData: selectedRows.map(row => ({ RYDM: row.JFSD, JGDM: row.RYDM })),
            token: getToken(),
          },
          callback: resp => {
            if (!resp.status) {
              message.error(resp.msg);
            }
          },
        });
        break;
      default:
        break;
    }
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
        token: getToken(),
      },
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
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

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const params = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: params,
      });

      dispatch({
        type: 'markhislist/fetch',
        payload: {
          ...params,
          token: getToken(),
        },
      });
    });
  };

  expandedRowRender = record => {
    const columns = [
      {
        title: '考试项目',
        dataIndex: 'KSXM',
        width: 150,
      },
      {
        title: '得分',
        dataIndex: 'DF',
        width: 125,
      },
      {
        title: '积分',
        dataIndex: 'JF',
        width: 125,
      },
      {
        title: '录入时间',
        dataIndex: 'LRSJ',
        width: 150,
      },
    ];

    return <Table dataSource={record.dataDetail} columns={columns} pagination={false} />;
  };

  renderSimpleForm() {
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
            <FormItem label="积分时段">
              {getFieldDecorator('JFSD')(
                <DatePicker
                  style={{ width: '100%' }}
                  mode="month"
                  format="YYYY-MM"
                  laceholder="选择积分时段"
                />
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
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

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
            <FormItem label="积分时段">
              {getFieldDecorator('JFSD')(
                <DatePicker
                  style={{ width: '100%' }}
                  mode="month"
                  format="YYYY-MM"
                  laceholder="选择积分时段"
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="人员姓名">
              {getFieldDecorator('RYMC')(<Input placeholder="请输入人员姓名" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="人员代码">
              {getFieldDecorator('RYDM')(<Input placeholder="请输入人员工号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="岗位">
              {getFieldDecorator('GW')(<Input placeholder="请输入岗位" />)}
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
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      markhislist: { data },
      loading,
    } = this.props;
    const { selectedRows, expandRowByClick, modalVisible } = this.state;
    const parentMethods = {
      handleExport: this.handleExport,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false} bodyStyle={{ padding: '24px 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button key="export" onClick={() => this.handleModalVisible(true)}>
                    批量导出
                  </Button>
                </span>
              )}
            </div>
            <StandardTable
              scroll={{ x: 800 }}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              expandRowByClick={expandRowByClick}
              expandedRowRender={this.expandedRowRender}
            />
          </div>
        </Card>
        <ExportForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default MarkHisManage;
