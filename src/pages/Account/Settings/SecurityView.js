import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, /** Upload, Select, */ Button, Icon } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import styles from './BaseView.less';
// import { getTimeDistance } from '@/utils/utils';
const FormItem = Form.Item;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class SecurityView extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(formatMessage({ id: 'app.settings.security.compare.newpassword' }));
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['newPasswordConfirm'], { force: true });
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem label={formatMessage({ id: 'app.settings.security.label.oldpassword' })}>
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.security.oldpassword' }),
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder=""
                />
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.security.label.newpassword' })}>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.security.newpassword' }),
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder=""
                />
              )}
            </FormItem>
            <FormItem
              label={formatMessage({ id: 'app.settings.security.label.confirm.newpassword' })}
            >
              {getFieldDecorator('newPasswordConfirm', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.security.confirm.newpassword' }),
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder=""
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </FormItem>
            <Button type="primary" htmlType="submit">
              <FormattedMessage
                id="app.settings.security.modify.password"
                defaultMessage="Modify Password"
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

export default SecurityView;
