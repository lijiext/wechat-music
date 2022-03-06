// pages/home-video/index.js
import { getTopMV } from '../../service/api_videos.js';
Page({
    data: {
        topMVs: [],
        hasMore: true
    },

    /**
     * 生命周期函数--监听页面加载
     * async await 同步编写异步代码，但是可能会导致页面卡顿
     */
    onLoad: async function (options) {
        const res = await getTopMV(0);
        this.setData({ topMVs: res.data });
    },

    // 生命周期函数--监听页面滑动到底部
    onReachBottom: async function () {
        // 判断是否有更多数据
        if (!this.data.hasMore) return;
        const res = await getTopMV(this.data.topMVs.length);
        this.setData({ topMVs: this.data.topMVs.concat(res.data) });
        this.setData({ hasMore: res.hasMore });
    },

    // 
    onPullDownRefresh: async function () {
        const res = await getTopMV(0);
        this.setData({ topMVs: res.data });
    }
})