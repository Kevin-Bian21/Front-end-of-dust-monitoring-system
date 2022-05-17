import React from 'react';
import * as echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
//import axios from 'axios';
import { Col, Row, Card } from 'antd';
import jQuery from 'jquery';
import { color } from 'echarts';
window.$ = jQuery;

class DeviceMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    $.get('static/img/dust-monitor.svg', function (svg) {
      let color_c = 'red';
      let flag = false;
      echarts.registerMap('dust-monitor', { svg: svg });
      option = {
        tooltip: {},
        geo: {
          tooltip: {
            show: true,
          },
          map: 'dust-monitor',
          roam: true,
        },
        series: {
          type: 'custom',
          coordinateSystem: 'geo',
          geoIndex: 0,
          zlevel: 1,
          data: [
            [1875.2358421078053, 550.70913833075736, 100],
            [2875.3415644319939, 550.9672194986475, 30],
            [2875.0329284196291, 780.6141808346214, 80],
            [2875.0329284196291, 1240.6141808346214, 80],
            [2875.03790632245, 1520.1985153835008, 61],
            [2875.98925630313, 1830.3839988649537, 70],
            [2875.62251255796, 2130.6708486282843, 81],
            [2875.62251255796, 2420.6708486282843, 81],
            [3370.62251255796, 3530.6708486282843, 81],
          ],
          renderItem(params, api) {
            const coord = api.coord([
              api.value(0, params.dataIndex),
              api.value(1, params.dataIndex),
            ]);
            const circles = [];
            for (let i = 0; i < 5; i++) {
              circles.push({
                type: 'circle',
                shape: {
                  cx: 0,
                  cy: 0,
                  r: 30,
                },
                style: {
                  stroke: 'red',
                  fill: 'none',
                  lineWidth: 2,
                },
                // Ripple animation
                keyframeAnimation: {
                  duration: 4000,
                  loop: true,
                  delay: (-i / 4) * 4000,
                  keyframes: [
                    {
                      percent: 0,
                      scaleX: 0,
                      scaleY: 0,
                      style: {
                        opacity: 1,
                      },
                    },
                    {
                      percent: 1,
                      scaleX: 1,
                      scaleY: 0.4,
                      style: {
                        opacity: 0,
                      },
                    },
                  ],
                },
              });
            }
            return {
              type: 'group',
              x: coord[0],
              y: coord[1],
              children: [
                ...circles,
                {
                  type: 'path',
                  shape: {
                    d: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
                    x: -10,
                    y: -35,
                    width: 20,
                    height: 40,
                  },
                  style: {
                    fill: color_c,
                  },
                  // Jump animation.
                  keyframeAnimation: {
                    duration: 1000,
                    loop: true,
                    delay: Math.random() * 1000,
                    keyframes: [
                      {
                        y: -10,
                        percent: 0.5,
                        easing: 'cubicOut',
                      },
                      {
                        y: 0,
                        percent: 1,
                        easing: 'bounceOut',
                      },
                    ],
                  },
                },
              ],
            };
          },
        },
      };

      myChart.on('click', { series: 'circle' }, function (params) {
        if (flag) {
          color_c = 'green';
          myChart.setOption(option);
        } else {
          color_c = 'blue';
          myChart.setOption(option);
        }
        console.log(flag);
        flag = !flag;
      });
      myChart.setOption(option);
    });
  };

  render() {
    return <div id="main" style={{ height: 425 }}></div>;
  }
}

export default DeviceMap;
