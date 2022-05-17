import React, { useEffect, useState } from 'react';
import {
  Table,
  Tag,
  Space,
  Pagination,
  Button,
  Row,
  Col,
  Card,
  Modal as AntdModal,
  Tooltip,
  Form,
  InputNumber,
  Input,
  DatePicker,
  message,
} from 'antd';
import { ExclamationCircleOutlined, ReconciliationFilled, SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import styles from './tableList.less';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { useToggle, useUpdateEffect } from 'ahooks';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
import Modal from './components/add-modal';
import { deleteUser, getUserInfo } from '@/services/ant-design-pro/api';
import EditModal from './components/edit-modal';

//import SearchBuilder from './builder/searchBuilder';

const UserManger = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchMessage, setSearchMessage] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { confirm } = AntdModal;
  const [searchVisible, searchAction] = useToggle(false);
  const [searchForm] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [resetDate, setResetDate] = useState(new Date());
  const [willEditData, setWillEditData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //监听这些值的变化，如果发送改变，则立即执行该方法
  useEffect(() => {
    fetchData();
  }, [page, limit, searchMessage, startDateTime]);

  async function fetchData() {
    const values = {
      page: page,
      limit: limit,
      searchMessage: searchMessage || null,
      startDateTime: startDateTime || null,
      endDateTime: endDateTime || null,
    };
    const initData = await getUserInfo(values);
    console.log(initData);
    setData(initData);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      sorter: {
        compare: (a, b) => a.userId - b.userId,
        multiple: 1, //多列排序优先级为最高
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'name',
      render: (text) => <a>{text}</a>,
      align: 'center',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '登录账户',
      dataIndex: 'loginAccount',
      key: 'loginAccount',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'generateTime',
      key: 'generateTime',
      sorter: {
        compare: (a, b) => new Date(a.generateTime) - new Date(b.generateTime),
        multiple: 2, //多列排序优先级为最高
      },
      align: 'center',
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      sorter: {
        compare: (a, b) => new Date(a.lastLoginTime) - new Date(b.lastLoginTime),
        multiple: 3, //多列排序优先级为最高
      },
      align: 'center',
    },
    {
      title: '权限',
      dataIndex: 'access',
      key: 'access',
      render: (access) => {
        return access === 'admin' ? (
          <Tag color="blue">管理员</Tag>
        ) : (
          <Tag color="green">普通用户</Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Button
            type="primary"
            size="small"
            onClick={() => {
              //解决下拉选择框和数值匹配的问题
              if (record.access == 'user') record.access = '3';
              if (record.access == 'admin') record.access = '2';

              setWillEditData(record);
              setIsEditModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            删除
          </Button>
        </Space>
      ),
      align: 'center',
    },
  ];

  //删除信息确认对话框
  function showDeleteConfirm(record) {
    confirm({
      title: '确认要删除这些数据吗?',
      icon: <ExclamationCircleOutlined />,
      //弹窗内容显示删除的数据信息,单独删除和批量删除的回显数据不同，优先级也不一样
      content: batchOverview(Object.keys(record).length ? [record] : selectedRows),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return deleteUserData({
          ids: Object.keys(record).length ? [record.userId] : selectedRowKeys,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  async function deleteUserData(ids) {
    const msg = await deleteUser(ids);
    if (msg) {
      if (msg.success) {
        message.success(msg.message);
        fetchData();
      } else {
        message.error(msg.message);
      }
    }
  }

  const batchOverview = (dataSource) => {
    let slice = columns.slice(0, 2);
    console.log(slice);
    return (
      <Table
        columns={slice}
        dataSource={dataSource}
        rowKey="userId"
        size="small"
        pagination={false}
      />
    );
  };

  const onFinish = (value) => {
    if (value.setSearchMessage == '') {
      setSearchMessage(null);
    } else {
      setSearchMessage(value.searchMessage);
    }
  };

  const onChange = (value, dateString) => {
    setStartDateTime(dateString[0]);
    setEndDateTime(dateString[1]);
  };

  //顶部搜索框
  const searchLayout = () => {
    return (
      <QueueAnim type="top">
        {searchVisible && (
          <div>
            <Card className={styles.searchForm}>
              <Form onFinish={onFinish} form={searchForm}>
                <Row>
                  <Col sm={6}>
                    <Form.Item
                      label="全表搜索"
                      name="searchMessage"
                      rules={[{ required: false, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={12}>
                    <Form.Item label="创建时间">
                      <DatePicker.RangePicker
                        // showTime
                        style={{ width: '100%' }}
                        onChange={onChange}
                        key={resetDate}
                        ranges={{
                          Today: [moment().startOf('day'), moment().endOf('day')],
                          'Last 7 Days': [moment().subtract(7, 'd'), moment()],
                          'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                          'Last Month': [
                            moment().subtract(1, 'months').startOf('month'),
                            moment().subtract(1, 'months').endOf('month'),
                          ],
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={1} />
                  <Col sm={4}>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        搜索
                      </Button>
                      <Button
                        onClick={() => {
                          searchForm.resetFields();
                          setSelectedRowKeys([]);
                          setSelectedRows([]);
                          setResetDate(new Date());
                          setSearchMessage(null);
                          setStartDateTime(null);
                          setEndDateTime(null);
                        }}
                      >
                        重置
                      </Button>
                    </Space>
                  </Col>

                  {/* {SearchBuilder(columns)} */}
                </Row>
              </Form>
            </Card>
          </div>
        )}
      </QueueAnim>
    );
  };
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>
            <Tooltip title="search">
              <Button
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => {
                  searchAction.toggle();
                }}
                type={searchVisible ? 'primary' : 'default'}
              />
            </Tooltip>
            <Button
              type="primary"
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              添加
            </Button>
          </Space>
        </Col>
      </Row>
    );
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onShowSizeChange}
            hideOnSinglePage={false}
            total={2 * data.length}
          />
        </Col>
      </Row>
    );
  };
  function onShowSizeChange(current, pageSize) {
    setPage(current);
    setLimit(pageSize);
    // fetchData();
    console.log(current, pageSize);
  }

  //批量删除
  const rowSelection = {
    //标志着有无数据被选中
    selectedRowKeys: selectedRowKeys,
    onChange: (_selectedRowKeys, _selectedRows) => {
      setSelectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    },
  };
  // const rowCancleSelection = {
  //   selectedRowKeys: selectedRowKeys,
  //   setSelectedRows([]);
  // };
  const batchToolbar = () => {
    // React 不会渲染 null
    return selectedRowKeys.length ? (
      <Space>
        <Button
          type="primary"
          danger
          onClick={() => {
            showDeleteConfirm({});
          }}
        >
          Delete
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setSelectedRowKeys([]);
            setSelectedRows([]);
          }}
        >
          Cancel
        </Button>
      </Space>
    ) : null;
  };

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="userId"
          dataSource={data}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
          loading="true"
        />
        {afterTableLayout()}
      </Card>
      {/* 母页面控制对话框的显示与否 */}
      <Modal
        modalVisible={isModalVisible}
        hideModal={() => {
          setIsModalVisible(false);
        }}
        reloadData={fetchData}
      />
      <EditModal
        modalVisible={isEditModalVisible}
        hideModal={() => {
          setIsEditModalVisible(false);
        }}
        record={willEditData}
        reloadData={fetchData}
      />
      <FooterToolbar
        //extra属性可以实现左侧显示
        extra={batchToolbar()}
      />
    </PageContainer>
  );
};
export default UserManger;
