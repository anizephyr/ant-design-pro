import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  InputNumber,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getToken } from '@/utils/authority';
import styles from './IndicatorsManage.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
    <Modal
      width={700}
      destroyOnClose
      title="新建考核指标"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Row gutter={16}>
        <Col span={8}>
          <FormItem label="分类">
            {getFieldDecorator('FL', {
              rules: [{ required: true, message: '请选择分类！' }],
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="人员">人员</Option>
                <Option value="机构">机构</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="考核项目">
            {getFieldDecorator('KHXM', {
              rules: [{ required: true, message: '不能为空！' }],
            })(<Input placeholder="请输入考核项目" />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="考核指标">
            {getFieldDecorator('KHZB', {
              rules: [{ required: true, message: '不能为空！' }],
            })(<Input placeholder="请输入考核指标" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormItem label="考核内容描述">
            {getFieldDecorator('KHNR')(<TextArea row={2} placeholder="请输入考核内容" />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="计分规则">
            {getFieldDecorator('JFGZ')(<TextArea row={2} placeholder="请输入计分规则" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <FormItem label="权重">
            {getFieldDecorator('QZ', {
              rules: [{ required: true, message: '不能为空！' }],
            })(<InputNumber min={0} max={1} step={0.1} placeholder="请输入权重" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <FormItem label="备注">
            {getFieldDecorator('BZ')(<TextArea row={2} placeholder="请输入备注" />)}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ indicatorlist, loading }) => ({
  indicatorlist,
  loading: loading.models.indicatorlist,
}))
@Form.create()
class IndicatorsManage extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    formValues: {},
    sorter: null,
    sortedObj: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'indicatorlist/fetch',
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
      this.setState({
        sorter: `${sorter.field}_${sorter.order}`,
      });
    }

    this.setState({
      sortedObj: sorter,
      filter: filters,
    });

    dispatch({
      type: 'indicatorlist/fetch',
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

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'indicatorlist/fetch',
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

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    const { sorter, filter, formValues } = this.state;
    const params = {
      sorter,
      ...formValues,
      ...filter,
    };
    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'indicatorlist/remove',
          payload: {
            selectData: params,
            deleteData: selectedRows.map(row => ({ KHZBDM: row.KHZBDM })),
            token: getToken(),
          },
          callback: resp => {
            if (resp.status) {
              message.success(resp.msg);
              this.setState({
                selectedRows: [],
              });
            } else {
              message.error(resp.msg);
            }
          },
        });
        break;
      default:
        break;
    }
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
      type: 'indicatorlist/remove',
      payload: {
        selectData: params,
        deleteData: [record].map(row => ({ KHZBDM: row.KHZBDM })),
        token: getToken(),
      },
      callback: resp => {
        if (resp.status) {
          message.success(resp.msg);
          this.setState({
            selectedRows: [],
          });
        } else {
          message.error(resp.msg);
        }
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
    const { sorter, filter } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const params = {
        sorter,
        ...fieldsValue,
        ...filter,
      };

      this.setState({
        formValues: params,
      });

      dispatch({
        type: 'indicatorlist/fetch',
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

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
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
      type: 'indicatorlist/add',
      payload: {
        token: getToken(),
        selectData: params,
        addData: {
          FL: fields.FL,
          KHXM: fields.KHXM,
          KHZB: fields.KHZB,
          KHNR: fields.KHNR,
          JFGZ: fields.JFGZ,
          QZ: fields.QZ,
          BZ: fields.BZ,
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

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="分类">
              {getFieldDecorator('FL')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="人员">人员</Option>
                  <Option value="机构">机构</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="考核项目">
              {getFieldDecorator('KHXM')(<Input placeholder="请输入考核项目" />)}
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
      indicatorlist: { data },
      loading,
    } = this.props;
    const { sortedObj } = this.state;
    const { selectedRows, modalVisible } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        {/* <Menu.Item key="update">批量编辑</Menu.Item> */}
        <Menu.Item key="remove">批量删除</Menu.Item>
      </Menu>
    );

    const columns = [
      {
        title: '分类',
        dataIndex: 'FL',
        sorter: true,
        sortOrder: sortedObj.columnKey === 'FL' && sortedObj.order,
        fixed: 'left',
        width: 100,
      },
      {
        title: '考核项目',
        dataIndex: 'KHXM',
        width: 150,
      },
      {
        title: '考核指标',
        dataIndex: 'KHZB',
        width: 150,
      },
      {
        title: '权重',
        dataIndex: 'QZ',
        width: 100,
      },
      {
        title: '考核内容描述',
        dataIndex: 'KHNR',
        width: 400,
      },
      {
        title: '计分规则',
        dataIndex: 'JFGZ',
        width: 1200,
      },

      {
        title: '备注',
        dataIndex: 'BZ',
        width: 400,
      },
      {
        title: '操作',
        width: 150,
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleSingleDelete(record)}>删除</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false} bodyStyle={{ padding: '24px 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建考核指标
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  {/* <Button>批量操作</Button> */}
                  <Dropdown overlay={menu}>
                    <Button>
                      批量操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              scroll={{ x: 2650 }}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              rowKey="KHZBDM"
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default IndicatorsManage;
