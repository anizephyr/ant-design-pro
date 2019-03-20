import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Row, Col, Card, Form, Button, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getToken } from '@/utils/authority';
import styles from './Relationship.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ relationshiplist, loading }) => ({
  relationshiplist,
  loading: loading.models.relationshiplist,
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
      type: 'relationshiplist/fetchleft',
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
      type: 'relationshiplist/fetchright',
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
      type: 'relationshiplist/fetchright',
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
      type: 'relationshiplist/fetchleft',
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

  handleClickRowLeft = row => {
    return {
      onClick: () => {
        this.handleSelectRowsLeft([row]);
      },
    };
  };

  selectRhandleSelectRowsLeftowLeft = record => {
    const { selectedRowKeysLeft } = this.state;
    const selectedRowKeys = [...selectedRowKeysLeft];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.setState({ selectedRowKeysLeft });
  };

  handleBtnClick = () => {};

  render() {
    const {
      relationshiplist: { dataLeft, dataRight },
      loading,
    } = this.props;
    const { list: listLeft, pagination: paginationLeft } = dataLeft;
    const { list: listRight, pagination: paginationRight } = dataRight;
    const paginationPropsLeft = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['20', '50', '100'],
      ...paginationLeft,
    };
    const paginationPropsRight = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['20', '50', '100'],
      ...paginationRight,
    };
    const { sortedObjRight } = this.state;
    const {
      selectedRowKeysLeft,
      selectedRowKeysRight,
      selectedRowsLeft,
      selectedRowsRight,
    } = this.state;
    console.log(selectedRowKeysLeft, selectedRowsLeft);
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
        fixed: 'left',
        width: 150,
      },
      {
        title: '考核指标',
        dataIndex: 'KHZB',
        // sorter: true,
        sortOrder: sortedObjRight.columnKey === 'KHZB' && sortedObjRight.order,
        fixed: 'left',
        width: 150,
      },
      {
        title: '权重',
        dataIndex: 'QZ',
        fixed: 'left',
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
                />
              </Col>
              <Col span={18}>
                <Table
                  rowKey="KHZBDM"
                  rowSelection={rowSelectionRight}
                  scroll={{ x: 2400 }}
                  loading={loading}
                  dataSource={listRight}
                  pagination={paginationPropsRight}
                  columns={columnsRight}
                  onChange={this.handleStandardTableChangeRight}
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
