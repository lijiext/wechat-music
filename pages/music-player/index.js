import {getSongById} from "../../service/api_player";

Page({
    data: {
        id: 0,
        currentSong: {},
        currentPage: 0,
        swiperHeight: 0
    },
    onLoad: function (options) {
        // 设置 swiper 高度
        const screenHeight = getApp().globalData.screenHeight;
        const statusBarHeight = getApp().globalData.statusBarHeight;
        // 本处使用了常量写死，不建议这么做
        const swiperHeight = screenHeight - statusBarHeight - 44;

        //    1. 获取传入的音乐 id
        const id = options.id;
        this.setData({
            id,
            swiperHeight
        });
        //    2. 获取音乐详情
        this.getPageData(id);
        //    3. 获取音乐 url

    },
    getPageData: function (id) {
        // 根据 id 获取音乐详情
        getSongById(id).then(res => {
            console.log('getSongById', res.songs[0]);
            this.setData({
                currentSong: res.songs[0]
            });
        })
    },
    // 监听页面切换
    swiperChange: function (e) {
        const currentPage = e.detail.current;
        this.setData({
            currentPage
        });
    }
});