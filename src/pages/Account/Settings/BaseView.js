import React, { Component } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Form, Input, Select, Button, DatePicker, Row, Col } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import styles from './BaseView.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      if (key === 'JRGZCYSJ' || key === 'RHSJ' || key === 'XGWSGSJ' || key === 'YYGWSGSJ') {
        obj[key] = moment(currentUser[key]) || null;
      } else {
        obj[key] = currentUser[key] || null;
      }
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
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
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label="性别">
                  {getFieldDecorator('XB', {
                    rules: [{ required: true, message: '请选择性别！' }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="身份证号">
                  {getFieldDecorator('SFZH', {
                    rules: [{ required: true, message: '身份证长度错误！', len: 18 }],
                  })(<Input placeholder="请输入身份证号码" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label="联系电话">
                  {getFieldDecorator('LXDH')(<Input placeholder="请输入联系电话" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="员工类型">
                  {getFieldDecorator('YGLX', {
                    rules: [{ required: true, message: '请选择员工类型' }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="正式">正式</Option>
                      <Option value="派遣">派遣</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label="金融工作从业时间">
                  {getFieldDecorator('JRGZCYSJ', {
                    rules: [{ required: true, message: '请选择从业时间！' }],
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      laceholder="选择从业时间"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="运营岗位上岗时间">
                  {getFieldDecorator('YYGWSGSJ', {
                    rules: [{ required: true, message: '请选择运营岗位上岗时间！' }],
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      laceholder="选择运营岗位上岗时间"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="入行时间">
                  {getFieldDecorator('RHSJ', {
                    rules: [{ required: true, message: '请选择入行时间！' }],
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      laceholder="选择入行时间"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label="现岗位">
                  {getFieldDecorator('XGW', {
                    rules: [{ required: true, message: '现岗位不能为空！' }],
                  })(<Input placeholder="请输入现岗位" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="现岗位上岗时间">
                  {getFieldDecorator('XGWSGSJ', {
                    rules: [{ required: true, message: '请选择现岗位上岗时间！' }],
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      laceholder="选择现岗位上岗时间"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label="第一学历">
                  {getFieldDecorator('DYXL', {
                    rules: [{ required: true, message: '输入不能为空！' }],
                  })(<Input placeholder="请输入第一学历" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="最高学历">
                  {getFieldDecorator('ZGXL', {
                    rules: [{ required: true, message: '输入不能为空！' }],
                  })(<Input placeholder="请输入最高学历" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="是否全日制">
                  {getFieldDecorator('SFQRZ', {
                    rules: [{ required: true, message: '选项不能为空！' }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="是">是</Option>
                      <Option value="否">否</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <FormItem label="婚姻情况">
                  {getFieldDecorator('HYQK', {
                    rules: [{ required: true, message: '选项不能为空！' }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="已婚">已婚</Option>
                      <Option value="未婚">未婚</Option>
                      <Option value="离异">离异</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="生育情况">
                  {getFieldDecorator('SYQK', {
                    rules: [{ required: true, message: '项目不能为空！' }],
                  })(<Input placeholder="请输入生育情况" />)}
                </FormItem>
              </Col>
            </Row>
            <FormItem label="家庭住址">
              {getFieldDecorator('JTZZ')(<TextArea row={2} placeholder="请输入家庭住址" />)}
            </FormItem>
            <FormItem label="分组">
              {getFieldDecorator('JCLX', {
                rules: [{ required: true, message: '选项不能为空！' }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="运营人员">运营人员</Option>
                  <Option value="非运营人员">非运营人员</Option>
                </Select>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit">
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        {/** <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div> */}
      </div>
    );
  }
}

export default BaseView;
