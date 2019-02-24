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
  Icon,
  Button,
  /* InputNumber, */
  message,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getToken } from '@/utils/authority';

import styles from './ModifyHisList.less';

const FormItem = Form.Item;
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
      title: '人员姓名',
      dataIndex: 'RYMC',
      width: 125,
    },
    {
      title: '人员代码',
      dataIndex: 'RYDM',
      width: 125,
    },
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
      title: '岗位',
      dataIndex: 'GW',
      width: 150,
    },
    {
      title: '上岗时间',
      dataIndex: 'SGSJ',
      width: 150,
      render: val => {
        if (val === '') {
          return '';
        }
        return <span>{moment(val).format('YYYY-MM-DD')}</span>;
      },
    },
    {
      title: '离岗时间',
      dataIndex: 'LGSJ',
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
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'modifyhislist/fetch',
      payload: {
        selectData: {},
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
      type: 'modifyhislist/fetch',
      payload: {
        selectData: params,
        token: getToken(),
      },
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

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleExportClick = () => {
    const { dispatch } = this.props;
    const { selectedRows, formValues } = this.state;
    if (selectedRows.length === 0) return;
    dispatch({
      type: 'modifyhislist/export',
      payload: {
        selectData: formValues,
        exportData: selectedRows.map(row => `'${row.RYDM}'`),
        token: getToken(),
      },
      callback: blob => {
        const aLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const fileName = 'modifyhis.xlsx';
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
        type: 'modifyhislist/fetch',
        payload: {
          selectData: params,
          token: getToken(),
        },
      });
    });
  };

  expandedRowRender = record => {
    const columns = [
      {
        title: '人员姓名',
        dataIndex: 'RYMC',
        width: 125,
      },
      {
        title: '人员代码',
        dataIndex: 'RYDM',
        width: 125,
      },
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
        title: '岗位',
        dataIndex: 'GW',
        width: 150,
      },
      {
        title: '上岗时间',
        dataIndex: 'SGSJ',
        width: 150,
        render: val => {
          if (val === '') {
            return '';
          }
          return <span>{moment(val).format('YYYY-MM-DD')}</span>;
        },
      },
      {
        title: '离岗时间',
        dataIndex: 'LGSJ',
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
    ];

    return <Table dataSource={record.ModifyHis} columns={columns} pagination={false} rowKey="ID" />;
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
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="人员代码">
              {getFieldDecorator('RYDM')(<Input placeholder="请输入人员工号" />)}
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
                  <Button
                    key="export"
                    icon="export"
                    type="primary"
                    onClick={this.handleExportClick}
                  >
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
              pagination={false}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              expandRowByClick={expandRowByClick}
              expandedRowRender={this.expandedRowRender}
              rowKey="RYDM"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ModifyHisList;
