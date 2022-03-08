// pages/home-music/index.js
import { getBanners } from '../../service/api_music'

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
        const query = wx.createSelectorQuery();
        query.select(".swiper-item-image").boundingClientRect();
        query.exec((res) => {
            // 设置轮播图的高度
            this.setData({ swiperHeight: res[0].height });
        });

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