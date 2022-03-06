// pages/home-video/index.js
import {getTopMV} from '../../service/api_videos.js';
Page({
    data: {
        topMVs: []
    },

    /**
     * 生命周期函数--监听页面加载
     * async await 同步编写异步代码，但是可能会导致页面卡顿
     */
    onLoad: async function (options) {
        const res = await getTopMV(0);
        this.setData({topMVs: res.data});
        // getTopMV(0).then(res => {
        //     this.setData({ topMVs: res.data });
        // });
    },

})