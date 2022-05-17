import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { PubSub } from 'pubsub-js';
import { notification, message } from 'antd';

let websocket,
  lockReconnect = false;

// 创建 websocket 服务
let createWebSocket = (url) => {
  websocket = new W3CWebSocket(url);
  websocket.onopen = function () {
    //heartCheck.reset().start();
    console.log(new Date() + 'websocket已打开，正在连接...');
    message.success('webSocket连接成功,每20秒推送一次最新数据');

    //在页面跳转后返回时，让其通过socket像后端传送一次之前设置的值
    if (websocket) {
      console.log(websocket);
      sendMessage(localStorage.getItem('limitValue'));
    }
  };
  //关闭事件
  websocket.onclose = function () {
    message.info('webSocket断开连接');
    console.log('websocket已关闭');
  };
  //发生了错误事件
  websocket.onerror = function () {
    console.log('websocket发生了错误');
  };
  websocket.onmessage = function (event) {
    lockReconnect = true;
    let data = JSON.parse(event.data).data;
    console.log('event', event);
    PubSub.publish('dataSource', data);
  };
};

let sendMessage = (msg) => {
  websocket.send(msg);
};

// 连接 websocket
let reconnect = (url) => {
  if (lockReconnect) return;
  setTimeout(function () {
    createWebSocket(url);
    lockReconnect = false;
  }, 4000);
};

// // 心跳检查
// let heartCheck = {
//   timeout: 60000,
//   timeoutObj: null,
//   reset: function () {
//     clearInterval(this.timeoutObj);
//     return this;
//   },
//   start: function () {
//     this.timeoutObj = setInterval(function () {
//       websocket.send('HeartBeat');
//     }, this.timeout);
//   },
// };

// 关闭 websocket 服务
let closeWebSocket = () => {
  websocket && websocket.close();
};

// websocket 信息提示框
let notificationInfo = (type, message, description, duration) => {
  return notification[type]({
    placement: 'top',
    message,
    description,
    duration,
    top: 30,
  });
};

export { websocket, createWebSocket, closeWebSocket, notificationInfo, sendMessage };
