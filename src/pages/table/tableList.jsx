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
} from 'antd';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import styles from './tableList.less';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { useToggle, useUpdateEffect } from 'ahooks';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
import Modal from './components/Modal';
import { getUserInfo } from '@/services/ant-design-pro/api';

//import SearchBuilder from './builder/searchBuilder';

const TableList = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { confirm } = AntdModal;
  const [searchVisible, searchAction] = useToggle(true);
  const [searchForm] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);

  useEffect = () => {
    fetchData();
  };

  async function fetchData() {
    initData = await getUserInfo();
    setData(initData?.data);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <Button type="primary" size="small">
            编辑
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => {
              console.log(record);
              showDeleteConfirm(record);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  // const data = [
  //   {
  //     id: '1',
  //     key: '1',
  //     name: '罗翔',
  //     age: 32,
  //     address: 'China',
  //     phone: '110',
  //     tags: ['nice'],
  //   },
  //   {
  //     id: '2',
  //     key: '2',
  //     name: '张三',
  //     age: 42,
  //     address: 'Janpan',
  //     phone: '995',
  //     tags: ['loser'],
  //   },
  //   {
  //     id: '3',
  //     key: '2',
  //     name: '李四',
  //     age: 18,
  //     address: 'USA',
  //     phone: '911',
  //     tags: ['loser'],
  //   },
  // ];

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
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const batchOverview = (dataSource) => {
    let slice = columns.slice(0, 2);
    console.log(slice);
    return (
      <Table columns={slice} dataSource={dataSource} rowKey="id" size="small" pagination={false} />
    );
  };

  //顶部搜索框
  const searchLayout = () => {
    return (
      <QueueAnim type="top">
        {searchVisible && (
          <div>
            <Card className={styles.searchForm}>
              <Form>
                <Row>
                  <Col sm={6}>
                    <Form.Item
                      label="全表搜索"
                      name="search"
                      rules={[{ required: false, message: 'Please input your username!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={12}>
                    <Form.Item label="创建时间">
                      <DatePicker.RangePicker
                        showTime
                        style={{ width: '100%' }}
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
                      <Button>搜索</Button>
                      <Button>重置</Button>
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
            defaultCurrent={3}
            total={50}
          />
        </Col>
      </Row>
    );
  };
  function onShowSizeChange(current, pageSize) {
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
            selectedRowKeys: [];
            selectedRows: [];
          }}
        >
          Cancle
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
          rowKey="id"
          dataSource={data}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
        />
        {afterTableLayout()}
      </Card>
      {/* 母页面控制对话框的显示与否 */}
      <Modal
        modalVisible={isModalVisible}
        hideModal={() => {
          setIsModalVisible(false);
        }}
      />
      <FooterToolbar
        //extra属性可以实现左侧显示
        extra={batchToolbar()}
      />
    </PageContainer>
  );
};
export default TableList;
