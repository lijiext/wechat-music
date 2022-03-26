Component({
    // 使用多个插槽必须开启此属性
    options: {
        multipleSlots: true
    },
    properties: {
        title: {
            type: String,
            value: '默认标题',
        },
    },
    data: {
        statusBarHeight: getApp().globalData.statusBarHeight
    },
    methods: {},
    lifetimes: {
        ready: function () {
            // 获取状态栏高度
            const sysInfo = wx.getSystemInfoSync();
            const statusBarHeight = sysInfo.statusBarHeight; // 状态栏高度,后面没有使用这种方式，使用全局的 sys info
        }
    }
});
