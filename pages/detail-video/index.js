// pages/detail-video/index.js
import { getMvURL, getMvDetail, getMvRelatedVideo } from '../../service/api_videos';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mvURL: {},
        mvDetail: {},
        relatedVideo: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id;
        this.getPageData(id);
    },

    getPageData: function (id) {
        // 1. 请求视频地址
        getMvURL(id).then(res => {
            console.log('getMvURL', res);
            this.setData({
                mvURL: res.data.url
            });
        })
        // 2. 请求视频信息
        getMvDetail(id).then(res => {
            console.log('getMvDetail', res);
            this.setData({
                mvDetail: res.data
            });
        })
        // 3. 请求相关视频
        getMvRelatedVideo(id).then(res => {
            console.log('getMvRelatedVideo', res);
            this.setData({
                relatedVideo: res.data
            });
        })
    }
})