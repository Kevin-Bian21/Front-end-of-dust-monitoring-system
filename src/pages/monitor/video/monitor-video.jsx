import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import React, { useRef, useEffect } from 'react';

const MonitorVideo = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { onReady, video_url } = props;

  let options = {
    controls: true,
    playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
    autoplay: true, // 如果true,浏览器准备好时开始回放。
    muted: true, // 默认情况下将会消除任何音频。
    loop: true, // 导致视频一结束就重新开始。
    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: 'zh-CN',
    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    sources: [
      {
        src: video_url,
        type: 'video/mp4',
      },
    ],
    // poster: videoInfo.img, // 你的封面地址
    width: document.documentElement.clientWidth,
    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      volumePanel: {
        inline: false, // 音量键控制条垂直
      },
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false, //剩余时间
      fullscreenToggle: true, // 全屏按钮
    },
  };

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        player.play();
      }));
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current;
      console.log('playerplayerplayer===', player);
      player.src(options.sources[0].src);
      player.autoplay(true);
    }
  }, [videoRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default MonitorVideo;
