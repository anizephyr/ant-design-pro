import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  /* InputNumber, */
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './ModifyHisList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ modifyhislist, loading }) => ({
  modifyhislist,
  loading: loading.models.modifyhislist,
}))
@Form.create()
class ModifyHisList extends PureComponent {
  state = {
    expandForm: false,
    expandRowByClick: true,
    selectedRows: [],
    formValues: {},
  };

  columns = [
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
      title: '机构代码',
      dataIndex: 'JGDM',
      sorter: true,
      width: 150,
    },
    {
      title: '人员代码',
      dataIndex: 'RYDM',
      sorter: true,
      width: 125,
    },
    {
      title: '员工类型',
      dataIndex: 'YGLX',
      width: 150,
    },
    {
      title: '现岗位',
      dataIndex: 'XGW',
      width: 150,
    },
    {
      title: '现岗位上岗时间',
      dataIndex: 'XGWSGSJ',
      width: 150,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '现婚姻情况',
      dataIndex: 'HYQK',
      width: 150,
    },
    {
      title: '现生育情况',
      dataIndex: 'SYQK',
      width: 150,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'modifyhislist/fetch',
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
      type: 'modifyhislist/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'modifyhislist/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleButtonClick = e => {
    // const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'export':
        break;
      default:
        break;
    }
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
        type: 'modifyhislist/fetch',
        payload: params,
      });
    });
  };

  expandedRowRender = record => {
    const columns = [
      {
        title: '机构名称',
        dataIndex: 'JGMC',
        width: 150,
      },
      {
        title: '机构代码',
        dataIndex: 'JGDM',
        width: 150,
      },
      {
        title: '员工类型',
        dataIndex: 'YGLX',
        width: 150,
      },
      {
        title: '原岗位',
        dataIndex: 'GW',
        width: 150,
      },
      {
        title: '上岗时间',
        dataIndex: 'SGSJ',
        width: 150,
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '离岗时间',
        dataIndex: 'LGSJ',
        width: 150,
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
    ];

    return <Table dataSource={record.dataHis} columns={columns} pagination={false} />;
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
            <FormItem label="人员姓名">
              {getFieldDecorator('RYMC')(<Input placeholder="请输入人员姓名" />)}
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
            <FormItem label="员工类型">
              {getFieldDecorator('YGLX')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="正式">正式</Option>
                  <Option value="派遣">派遣</Option>
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
      modifyhislist: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const { expandRowByClick } = this.state;
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false} bodyStyle={{ padding: '24px 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button key="export" onClick={this.handleButtonClick}>
                    批量导出
                  </Button>
                </span>
              )}
            </div>
            <StandardTable
              scroll={{ x: 1450 }}
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
      </PageHeaderWrapper>
    );
  }
}

export default ModifyHisList;
