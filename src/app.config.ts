// src/app.config.js
import { useGlobalIconFont } from './component/iconfont/helper';

export default {
  usingComponents: Object.assign(useGlobalIconFont()),
  pages: [
    'pages/Home/index',
    'pages/Reservation/index',
    'pages/Setting/index',
    'pages/CharacterInfo/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    "color": "#bfbfbf",
    "selectedColor": "#1aa4d0",
    list: [
      {
        "selectedIconPath": "images/home_blue.png",
        "iconPath": "images/home1.png",
        "pagePath": "pages/Home/index",
        "text": "主页"
      },
      {
        "selectedIconPath": "images/month_blue.png",
        "iconPath": "images/month.png",
        "pagePath": "pages/Reservation/index",
        "text": "课程预约"
      },
      {
        "selectedIconPath": "images/setting_blue.png",
        "iconPath": "images/Setting.png",
        "pagePath": "pages/Setting/index",
        "text": "设置"
      },
    ]
  }
}
