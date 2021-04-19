export default {
  pages: [
    'pages/home/index'
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
        "iconPath": "images/home.png",
        "pagePath": "pages/home/index",
        "text": "主页"
      },
      {
        "selectedIconPath": "images/month_blue.png",
        "iconPath": "images/month.png",
        "pagePath": "pages/home/index",
        "text": "课程预约"
      },
      {
        "selectedIconPath": "images/setting_blue.png",
        "iconPath": "images/setting.png",
        "pagePath": "pages/home/index",
        "text": "设置"
      },
    ]
  }
}
