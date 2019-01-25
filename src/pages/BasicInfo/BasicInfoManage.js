import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
  /* InputNumber, */
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './BasicInfoManage.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['deleted', 'normal'];
const status = ['已删除', '正常'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      width={700}
      destroyOnClose
      title="人员录入"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="机构名称">
        {form.getFieldDecorator('JGMC', {
          rules: [
            { required: true, message: '机构名不能为空！' },
            { max: 20, message: '机构名称过长！' },
          ],
        })(<Input placeholder="请输入机构名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="机构代码">
        {form.getFieldDecorator('JGDM', {
          rules: [{ required: true, message: '机构代码不能为空！' }],
        })(<Input placeholder="请输入机构代码" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('RYMC', {
          rules: [{ required: true, message: '姓名不能为空！' }],
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="十位工号">
        {form.getFieldDecorator('RYDM', {
          rules: [{ required: true, message: '十位工号错误！', len: 10 }],
        })(<Input placeholder="请输入十位工号" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="性别">
        {form.getFieldDecorator('XB', {
          rules: [{ required: true, message: '请选择性别！' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="身份证号">
        {form.getFieldDecorator('SFZH', {
          rules: [{ required: true, message: '身份证长度错误！', len: 18 }],
        })(<Input placeholder="请输入身份证号码" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="联系电话">
        {form.getFieldDecorator('LXDH')(<Input placeholder="请输入联系电话" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="员工类型">
        {form.getFieldDecorator('YGLX', {
          rules: [{ required: true, message: '请选择员工类型' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="正式">正式</Option>
            <Option value="派遣">派遣</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="金融工作从业时间">
        {form.getFieldDecorator('JRGZCYSJ', {
          rules: [{ required: true, message: '请选择从业时间！' }],
        })(<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" laceholder="选择从业时间" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="本行运营岗位上岗时间">
        {form.getFieldDecorator('BHYYGWSGSJ', {
          rules: [{ required: true, message: '请选择运营岗位上岗时间！' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            laceholder="选择运营岗位上岗时间"
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="入行时间">
        {form.getFieldDecorator('RHSJ', {
          rules: [{ required: true, message: '请选择入行时间！' }],
        })(<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" laceholder="选择入行时间" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="现岗位">
        {form.getFieldDecorator('XGW', {
          rules: [{ required: true, message: '现岗位不能为空！' }],
        })(<Input placeholder="请输入现岗位" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="现岗位上岗时间">
        {form.getFieldDecorator('XGWSGSJ', {
          rules: [{ required: true, message: '请选择现岗位上岗时间！' }],
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            laceholder="选择现岗位上岗时间"
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="第一学历">
        {form.getFieldDecorator('DYXL', {
          rules: [{ required: true, message: '输入不能为空！' }],
        })(<Input placeholder="请输入第一学历" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="最高学历">
        {form.getFieldDecorator('ZGXL', {
          rules: [{ required: true, message: '输入不能为空！' }],
        })(<Input placeholder="请输入最高学历" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="是否全日制">
        {form.getFieldDecorator('SFQRZ', {
          rules: [{ required: true, message: '选项不能为空！' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="是">是</Option>
            <Option value="否">否</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="婚姻情况">
        {form.getFieldDecorator('HYQK', {
          rules: [{ required: true, message: '选项不能为空！' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="已婚">已婚</Option>
            <Option value="未婚">未婚</Option>
            <Option value="离异">离异</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="生育情况">
        {form.getFieldDecorator('SYQK', {
          rules: [{ required: true, message: '项目不能为空！' }],
        })(<Input placeholder="请输入生育情况" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="家庭住址">
        {form.getFieldDecorator('JTZZ')(<TextArea row={2} placeholder="请输入家庭住址" />)}
      </FormItem>
    </Modal>
  );
});

@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        RYMC: props.values.RYMC,
        RYDM: props.values.RYDM,
        JGMC: props.values.JGMC,
        JGDM: props.values.JGDM,
        LXDH: props.values.LXDH,
        YGLX: props.values.YGLX,
        XGW: props.values.XGW,
        XGWSGSJ: moment(props.values.XGWSGSJ),
        HYQK: props.values.HYQK,
        SYQK: props.values.SYQK,
        JTZZ: props.values.JTZZ,
      },
      updateVals: {},
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const updateVals = this.findDiff(oldValue, fieldsValue);
      if (Object.keys(updateVals).length === 0) return;
      this.setState(
        {
          updateVals,
        },
        () => {
          if (currentStep < 1) {
            this.forward();
          } else {
            const updateData = { ...updateVals, RYDM: oldValue.RYDM };
            if (updateData.XGWSGSJ !== undefined)
              updateData.XGWSGSJ = moment(updateData.XGWSGSJ).format('YYYY-MM-DD');
            handleUpdate(updateData);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  findDiff = (oldVals, fieldsValue) => {
    const fieldsName = Object.keys(fieldsValue);
    const diffs = {};
    for (let i = 0; i < fieldsName.length; i += 1) {
      const fieldName = fieldsName[i];

      if (fieldsValue[fieldName] !== oldVals[fieldName]) {
        diffs[fieldName] = fieldsValue[fieldName];
      }
    }

    return diffs;
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      const { updateVals } = this.state;
      const formItems = [];
      const updateNames = Object.keys(updateVals);
      const labels = {
        JGMC: '机构名称',
        JGDM: '机构代码',
        LXDH: '联系电话',
        YGLX: '员工类型',
        XGW: '现岗位',
        XGWSGSJ: '现岗位上岗时间',
        HYQK: '婚姻情况',
        SYQK: '生育情况',
        JTZZ: '家庭住址',
      };
      for (let i = 0; i < updateNames.length; i += 1) {
        formItems.push(
          <FormItem
            key={updateNames[i]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15 }}
            label={labels[updateNames[i]]}
          >
            {form.getFieldDecorator(updateNames[i], { initialValue: updateVals[updateNames[i]] })(
              <Input />
            )}
          </FormItem>
        );
      }
      return formItems;
    }
    return [
      <FormItem key="JGMC" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="机构名称">
        {form.getFieldDecorator('JGMC', {
          rules: [
            { required: true, message: '机构名不能为空！' },
            { max: 20, message: '机构名称过长！' },
          ],
          initialValue: formVals.JGMC,
        })(<Input placeholder="请输入机构名称" />)}
      </FormItem>,
      <FormItem key="JGDM" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="机构代码">
        {form.getFieldDecorator('JGDM', {
          rules: [{ required: true, message: '机构代码不能为空！' }],
          initialValue: formVals.JGDM,
        })(<Input placeholder="请输入机构代码" />)}
      </FormItem>,
      <FormItem key="LXDH" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="联系电话">
        {form.getFieldDecorator('LXDH', { initialValue: formVals.LXDH })(
          <Input placeholder="请输入联系电话" />
        )}
      </FormItem>,
      <FormItem key="YGLX" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="员工类型">
        {form.getFieldDecorator('YGLX', {
          rules: [{ required: true, message: '请选择员工类型' }],
          initialValue: formVals.YGLX,
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="正式">正式</Option>
            <Option value="派遣">派遣</Option>
          </Select>
        )}
      </FormItem>,
      <FormItem key="XGW" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="岗位">
        {form.getFieldDecorator('XGW', {
          rules: [{ required: true, message: '岗位不能为空！' }],
          initialValue: formVals.XGW,
        })(<Input placeholder="请输入岗位" />)}
      </FormItem>,
      <FormItem key="XGWSGSJ" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="上岗时间">
        {form.getFieldDecorator('XGWSGSJ', {
          rules: [{ required: true, message: '请选择上岗时间！' }],
          initialValue: formVals.XGWSGSJ,
        })(<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" laceholder="选择上岗时间" />)}
      </FormItem>,
      <FormItem key="HYQK" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="婚姻情况">
        {form.getFieldDecorator('HYQK', {
          rules: [{ required: true, message: '选项不能为空！' }],
          initialValue: formVals.HYQK,
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="已婚">已婚</Option>
            <Option value="未婚">未婚</Option>
            <Option value="离异">离异</Option>
          </Select>
        )}
      </FormItem>,
      <FormItem key="SYQK" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="生育情况">
        {form.getFieldDecorator('SYQK', {
          rules: [{ required: true, message: '项目不能为空！' }],
          initialValue: formVals.SYQK,
        })(<Input placeholder="请输入生育情况" />)}
      </FormItem>,
      <FormItem key="JTZZ" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="家庭住址">
        {form.getFieldDecorator('JTZZ', { initialValue: formVals.JTZZ })(
          <TextArea row={2} placeholder="请输入家庭住址" />
        )}
      </FormItem>,
    ];
  };

  renderFooter = currentStep => {
    const { handleUpdateModalVisible, values } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={`${values.RYMC}-${values.RYDM}`}
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="编辑信息" />
          <Step title="确认信息" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ infolist, loading }) => ({
  infolist,
  loading: loading.models.infolist,
}))
@Form.create()
class BasicInfoManage extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: '机构名称',
      dataIndex: 'JGMC',
      sorter: true,
      fixed: 'left',
      width: 150,
    },
    {
      title: '人员姓名',
      dataIndex: 'RYMC',
      sorter: true,
      fixed: 'left',
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
      title: '性别',
      dataIndex: 'XB',
      // sorter:true,
      width: 100,
    },
    {
      title: '身份证号码',
      dataIndex: 'SFZH',
      width: 150,
    },
    {
      title: '联系电话',
      dataIndex: 'LXDH',
      width: 150,
    },
    {
      title: '员工类型',
      dataIndex: 'YGLX',
      width: 150,
    },
    {
      title: '金融工作从业时间',
      dataIndex: 'JRGZCYSJ',
      width: 150,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '本行运营岗位上岗时间',
      dataIndex: 'BHYYGWSGSJ',
      width: 150,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '入行时间',
      dataIndex: 'RHSJ',
      width: 150,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
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
      title: '第一学历',
      dataIndex: 'DYXL',
      width: 150,
    },
    {
      title: '最高学历',
      dataIndex: 'ZGXL',
      width: 150,
    },
    {
      title: '是否全日制',
      dataIndex: 'SFQRZ',
      width: 150,
    },
    {
      title: '婚姻情况',
      dataIndex: 'HYQK',
      width: 150,
    },
    {
      title: '生育情况',
      dataIndex: 'SYQK',
      width: 150,
    },
    {
      title: '家庭住址',
      dataIndex: 'JTZZ',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'ZT',
      width: 150,
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      width: 150,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleSingleDelete(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'infolist/fetch',
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
      type: 'infolist/fetch',
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
      type: 'infolist/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'infolist/remove',
          payload: {
            deleteData: selectedRows.map(row => row.RYDM),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      case 'update':
        dispatch({
          type: 'infolist/update',
          payload: {
            updateDatas: '',
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSingleDelete = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'infolist/remove',
      payload: {
        deleteData: [record].map(row => row.RYDM),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
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
        type: 'infolist/fetch',
        payload: params,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'infolist/add',
      payload: {
        addData: {
          JGMC: fields.JGMC,
          RYMC: fields.RYMC,
          JGDM: fields.JGDM,
          RYDM: fields.RYDM,
          XB: fields.XB,
          SFZH: fields.SFZH,
          LXDH: fields.LXDH,
          YGLX: fields.YGLX,
          JRGZCYSJ: moment(fields.JRGZCYSJ).format('YYYY-MM-DD'),
          BHYYGWSGSJ: moment(fields.BHYYGWSGSJ).format('YYYY-MM-DD'),
          RHSJ: moment(fields.RHSJ).format('YYYY-MM-DD'),
          XGW: fields.XGW,
          XGWSGSJ: moment(fields.XGWSGSJ).format('YYYY-MM-DD'),
          DYXL: fields.DYXL,
          ZGXL: fields.ZGXL,
          SFQRZ: fields.SFQRZ,
          HYQK: fields.HYQK,
          SYQK: fields.SYQK,
          JTZZ: fields.JTZZ,
        },
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'infolist/update',
      payload: {
        updateData: fields,
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
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
      infolist: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        {/* <Menu.Item key="update">批量编辑</Menu.Item> */}
        <Menu.Item key="remove">批量删除</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false} bodyStyle={{ padding: '24px 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
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
              scroll={{ x: 3050 }}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default BasicInfoManage;
