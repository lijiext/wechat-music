// pages/home-music/index.js
import {getBanners, getHotPlaylist} from '../../service/api_music'
import queryElement from '../../utils/query_element'
import throttle from '../../utils/throttle'
import {rankingStore} from '../../store/index'

const throttleQuery = throttle(queryElement)

Page({
    data: {
        banners: [],
        swiperHeight: 150,
        recommendList: [],
        hotPlaylist: [],
        chinesePlaylist: [],
    },

    onLoad: function (options) {
        this.getPageData();

        // 共享数据请求
        rankingStore.dispatch("getRankingDataAction")

        // 获取共享数据
        rankingStore.onState("hotRanking", (res) => {
            if (!res.tracks) return;
            const recommendSongs = res.tracks.slice(0, 6);
            console.log('hotRanking', recommendSongs)
            this.setData({
                recommendList: recommendSongs
            })
        })
    },

    getPageData: function () {
        getBanners().then(res => {
            // setData 渲染是异步的, 设置数据是同步的
            this.setData({
                banners: res.banners
            })
            console.log(this.data.banners)
        });
        getHotPlaylist().then(res => {
            console.log(res);
            this.setData({
                hotPlaylist: res.playlists
            })
        });
        getHotPlaylist("华语").then(res => {
            console.log(res);
            this.setData({
                chinesePlaylist: res.playlists
            })
        });
    },
    imgLoaded: function () {
        console.log('img loaded');
        // 获取元素的高度
        throttleQuery(".swiper-item-image").then(res => {
            this.setData({swiperHeight: res[0].height});
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
            fail: () => {
            },
            complete: () => {
            }
        });
    },
})