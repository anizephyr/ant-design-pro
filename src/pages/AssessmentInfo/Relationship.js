import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Row, Col, Card, Form, Button, message, Alert } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getToken } from '@/utils/authority';
import styles from './Relationship.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ relationshipList, loading }) => ({
  relationshipList,
  loading: loading.models.relationshipList,
}))
@Form.create()
class Relationship extends PureComponent {
  state = {
    selectedRowsLeft: [],
    selectedRowsRight: [],
    selectedRowKeysLeft: [],
    selectedRowKeysRight: [],
    clickedRowsLeft: {},
    sortedObjRight: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'relationshipList/fetchleft',
      payload: {
        side: 'left',
        selectData: {},
        token: getToken(),
      },
      callback: resp => {
        if (!resp.status) {
          message.error(resp.msg);
        }
      },
    });
    dispatch({
      type: 'relationshipList/fetchright',
      payload: {
        side: 'right',
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

  handleStandardTableChangeRight = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { clickedRowsLeft } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...clickedRowsLeft,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    this.setState({
      sortedObjRight: sorter,
    });

    dispatch({
      type: 'relationshipList/fetchright',
      payload: {
        side: 'right',
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

  handleRowSelectChangeLeft = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeysLeft: selectedRowKeys, selectedRowsLeft: selectedRows });
  };

  handleRowSelectChangeRight = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeysRight: selectedRowKeys, selectedRowsRight: selectedRows });
  };

  cleanSelectedKeysLeft = () => {
    this.handleRowSelectChangeLeft([], []);
  };

  cleanSelectedKeysRight = () => {
    this.handleRowSelectChangeRight([], []);
  };

  handleStandardTableChangeLeft = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'relationshipList/fetchleft',
      payload: {
        side: 'left',
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

  handleClickRowLeft = row => ({
    onClick: () => {
      this.handleRowClickLeft(row);
    },
  });

  handleRowClickLeft = row => {
    this.setState({ clickedRowsLeft: { GW: row.GW } });
    const { dispatch } = this.props;
    dispatch({
      type: 'relationshipList/checkright',
      payload: {
        side: 'right',
        selectData: { GW: row.GW },
        token: getToken(),
      },
      callback: resp => {
        if (!resp.status) {
          message.error(resp.msg);
        } else {
          this.setState({
            selectedRowsRight: resp.selectedRows,
            selectedRowKeysRight: resp.selectedRows.map(r => r.KHZBDM),
          });
        }
      },
    });
  };

  handleBtnClick = () => {
    const { selectedRowKeysLeft, selectedRowKeysRight } = this.state;
    const { dispatch } = this.props;
    if (selectedRowKeysLeft.length <= 0) return;
    dispatch({
      type: 'relationshipList/match',
      payload: {
        matchData: { left: selectedRowKeysLeft, right: selectedRowKeysRight },
        token: getToken(),
      },
      callback: resp => {
        if (!resp.status) {
          message.error(resp.msg);
        } else {
          message.success(resp.msg);
        }
      },
    });
  };

  render() {
    const {
      relationshipList: { dataLeft, dataRight },
      loading,
    } = this.props;
    const { list: listLeft, pagination: paginationLeft } = dataLeft;
    const { list: listRight, pagination: paginationRight } = dataRight;
    const paginationPropsLeft = {
      showSizeChanger: false,
      showQuickJumper: false,
      pageSizeOptions: ['10', '50', '100'],
      ...paginationLeft,
    };
    const paginationPropsRight = {
      showSizeChanger: false,
      showQuickJumper: false,
      pageSizeOptions: ['10', '50', '100'],
      ...paginationRight,
    };
    const { sortedObjRight } = this.state;
    const {
      selectedRowKeysLeft,
      selectedRowKeysRight,
      selectedRowsLeft,
      selectedRowsRight,
    } = this.state;
    const rowSelectionLeft = {
      selectedRowKeys: selectedRowKeysLeft,
      selectedRows: selectedRowsLeft,
      onChange: this.handleRowSelectChangeLeft,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
    const rowSelectionRight = {
      selectedRowKeys: selectedRowKeysRight,
      selectedRows: selectedRowsRight,
      onChange: this.handleRowSelectChangeRight,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    const columnsLeft = [
      {
        title: '岗位',
        dataIndex: 'GW',
        width: 200,
      },
    ];
    const columnsRight = [
      {
        title: '考核项目',
        dataIndex: 'KHXM',
        // sorter: true,
        sortOrder: sortedObjRight.columnKey === 'KHXM' && sortedObjRight.order,
        width: 150,
      },
      {
        title: '考核指标',
        dataIndex: 'KHZB',
        // sorter: true,
        sortOrder: sortedObjRight.columnKey === 'KHZB' && sortedObjRight.order,
        width: 120,
      },
      {
        title: '权重',
        dataIndex: 'QZ',
        width: 80,
      },
      {
        title: '考核内容描述',
        dataIndex: 'KHNR',
        width: 1000,
      },
      {
        title: '计分规则',
        dataIndex: 'JFGZ',
        width: 2400,
      },

      {
        title: '备注',
        dataIndex: 'BZ',
        width: 400,
      },
    ];
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false} bodyStyle={{ padding: '24px 24px' }}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleBtnClick()}>
                关联岗位与考核指标
              </Button>
            </div>
            <Row gutter={16}>
              <Col span={6}>
                <div className={styles.tableAlert}>
                  <Alert
                    message={
                      <Fragment>
                        已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeysLeft.length}</a>{' '}
                        项&nbsp;&nbsp;
                        <a onClick={this.cleanSelectedKeysLeft} style={{ marginLeft: 24 }}>
                          清空
                        </a>
                      </Fragment>
                    }
                    type="info"
                    showIcon
                  />
                </div>
                <Table
                  rowKey="GW"
                  rowSelection={rowSelectionLeft}
                  scroll={{ x: 200 }}
                  loading={loading}
                  dataSource={listLeft}
                  pagination={paginationPropsLeft}
                  columns={columnsLeft}
                  onChange={this.handleStandardTableChangeLeft}
                  onRow={this.handleClickRowLeft}
                  size="small"
                />
              </Col>
              <Col span={18}>
                <div className={styles.tableAlert}>
                  <Alert
                    message={
                      <Fragment>
                        已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeysRight.length}</a>{' '}
                        项&nbsp;&nbsp;
                        <a onClick={this.cleanSelectedKeysRight} style={{ marginLeft: 24 }}>
                          清空
                        </a>
                      </Fragment>
                    }
                    type="info"
                    showIcon
                  />
                </div>
                <Table
                  rowKey="KHZBDM"
                  rowSelection={rowSelectionRight}
                  scroll={{ x: 4200 }}
                  loading={loading}
                  dataSource={listRight}
                  pagination={paginationPropsRight}
                  columns={columnsRight}
                  onChange={this.handleStandardTableChangeRight}
                  size="small"
                />
              </Col>
            </Row>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Relationship;
