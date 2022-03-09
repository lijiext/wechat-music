// app.js
// 逻辑处理
App({
    onLaunch: function () {
        const sys = wx.getSystemInfoSync();
        console.log('SYSTEM INFO',sys);
        this.globalData.screenWidth = sys.screenWidth;
        this.globalData.screenHeight = sys.screenHeight;
    },
    globalData: {
        screenWidth: 0,
        screenHeight: 0,
    }
})
