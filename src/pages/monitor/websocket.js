import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { PubSub } from 'pubsub-js';
import { notification } from 'antd';

let websocket,
  lockReconnect = false;

// 创建 websocket 服务
let createWebSocket = (url) => {
  websocket = new W3CWebSocket(url);
  websocket.onopen = function () {
    //heartCheck.reset().start();
    console.log(new Date() + 'websocket已打开，正在连接...');
  };
  //关闭事件
  websocket.onclose = function () {
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

export { createWebSocket, closeWebSocket, notificationInfo, sendMessage };
