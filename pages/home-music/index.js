// pages/home-music/index.js
import { getBanners } from '../../service/api_music'
import queryElement from '../../utils/query_element'
import throttle from '../../utils/throttle'

const throttleQuery = throttle(queryElement)

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
        throttleQuery(".swiper-item-image").then(res => {
            this.setData({ swiperHeight: res[0].height });
            // 节流新版本
            console.log('throttle version');
        });
        // queryElement(".swiper-item-image").then(res => {
        //     this.setData({ swiperHeight: res[0].height });
        //     // 原始版本
        //     console.log('orignal version');
        // })
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