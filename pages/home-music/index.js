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
        rankingList: {0: {}, 2: {}, 3: {}},
    },

    onLoad: function (options) {
        this.getPageData();

        // 共享数据请求
        rankingStore.dispatch("getRankingDataAction");

        // 获取共享数据
        rankingStore.onState("hotRanking", (res) => {
            if (!res.tracks) return;
            const recommendSongs = res.tracks.slice(0, 6);
            console.log('hotRanking', recommendSongs)
            this.setData({
                recommendList: recommendSongs
            })
        });
        // 高阶函数
        rankingStore.onState("newSongsRanking", this.handleRankingStateChange(0));
        rankingStore.onState("originalSongRanking", this.handleRankingStateChange(2));
        rankingStore.onState("upingSongRanking", this.handleRankingStateChange(3));
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
    onUnload: function () {
        rankingStore.offState("hotRanking")
    },
    /**
     handleFetchRanking: function (res) {
        if (Object.keys(res).length === 0) return;
        console.log('handleFetchRanking', res)
        const name = res.name;
        const coverImageUrl = res.coverImgUrl;
        const songList = res.tracks.slice(0, 3);
        const rankingItem = {
            name,
            coverImageUrl,
            songList
        };
        this.setData({
            rankingList: [...this.data.rankingList, rankingItem]
        });
    },
     */
    // 数据变化直接执行函数
    handleRankingStateChange: function (idx) {
        console.log('handleRankingStateChange');
        return (res) => {
            if (Object.keys(res).length === 0) return;
            console.log('handleFetchRanking', res)
            const name = res.name;
            const playCount = res.playCount;
            const coverImageUrl = res.coverImgUrl;
            const songList = res.tracks.slice(0, 3);
            const rankingItem = {
                name,
                coverImageUrl,
                songList,
                playCount
            };
            this.setData({
                rankingList: {...this.data.rankingList, [idx]: rankingItem}
            });
        }
    }
})