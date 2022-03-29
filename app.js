// app.js
// 逻辑处理
App({
    onLaunch: function () {
        const sys = wx.getSystemInfoSync();
        console.log('SYSTEM INFO', sys);
        this.globalData.screenWidth = sys.screenWidth;
        this.globalData.screenHeight = sys.screenHeight;
        this.globalData.statusBarHeight = sys.statusBarHeight;
        //    判断宽高比，设置是否显示歌词
        console.log('屏幕高宽比：', sys.screenHeight / sys.screenWidth);
        this.globalData.isShowLyric = sys.screenHeight / sys.screenWidth >= 1.5;
    },
    globalData: {
        screenWidth: 0,
        screenHeight: 0,
        statusBarHeight: 0,
        isShowLyric: false,
    }
})
