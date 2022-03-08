// pages/home-music/index.js
import { getBanners } from '../../service/api_music'
import queryElement from '../../utils/query_element'
Page({
    data: {
        banners: [],
        swiperHeight: 150,
    },

    onLoad: function (options) {
        this.getPageData();

    },

    getPageData: function () {
        getBanners().then(res => {
            this.setData({
                banners: res.banners
            })
            console.log(this.data.banners)
        })
    },
    imgLoaded: function () {
        console.log('img loaded');
        // 获取元素的高度
        queryElement(".swiper-item-image").then(res => {
            this.setData({ swiperHeight: res[0].height });
        })


    },
    handleSearchClick: function () {
        console.log('handleSearchClick');
        wx.navigateTo({
            url: '/pages/detail-search/index',
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
        });
    },
})