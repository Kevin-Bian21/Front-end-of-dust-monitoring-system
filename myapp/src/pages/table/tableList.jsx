import React, { useState } from 'react';
import { Table, Tag, Space, Pagination, Button, Row, Col, Card, Modal as AntdModal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import styles from './tableList.less';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import Modal from './components/Modal';

const TableList = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { confirm } = AntdModal;

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
              showDeleteConfirm();
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      id: '1',
      key: '1',
      name: '罗翔',
      age: 32,
      address: 'China',
      phone: '110',
      tags: ['nice'],
    },
    {
      id: '2',
      key: '2',
      name: '张三',
      age: 42,
      address: 'Janpan',
      phone: '995',
      tags: ['loser'],
    },
    {
      id: '3',
      key: '2',
      name: '李四',
      age: 18,
      address: 'USA',
      phone: '911',
      tags: ['loser'],
    },
  ];

  //删除信息确认对话框
  function showDeleteConfirm() {
    confirm({
      title: '确认要删除这些数据吗?',
      icon: <ExclamationCircleOutlined />,
      //弹窗内容显示删除的数据信息
      content: batchOverview(),
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

  const searchLayout = () => {};
  const batchOverview = () => {
    let slice = columns.slice(0, 2);
    console.log(slice);
    return <Table columns={slice} dataSource={selectedRows} rowKey="id" size="small" />;
  };
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Button
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            添加
          </Button>
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
  const batchToolbar = () => {
    // React 不会渲染 null
    return selectedRowKeys.length ? (
      <Space>
        <Button
          type="primary"
          danger
          onClick={() => {
            showDeleteConfirm();
          }}
        >
          Delete
        </Button>
        <Button type="primary">Cancle</Button>
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
