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
        // const res = await getTopMV(0);
        // this.setData({ topMVs: res.data });
        this.getTopMvData(0);
    },

    // 封装网络请求
    getTopMvData: async function (offset) {
        // 判断是否可以请求
        // 如果没有更多数据 并且 偏移量不为 0
        if (!this.data.hasMore && offset !== 0) return;
        wx.showNavigationBarLoading();
        if (offset === 0) {
            // 下拉刷新 需要在 json 中设置 backgroundTextStyle: 'dark'
            wx.stopPullDownRefresh();
        }

        const res = await getTopMV(offset);
        let newData = this.data.topMVs;
        if (offset === 0) {
            // 如果偏移量为 0，则直接赋值
            newData = res.data;
        }
        else {
            // 如果偏移量不为 0，则拼接数据
            newData = newData.concat(res.data);
        }
        this.setData({ topMVs: newData });
        this.setData({ hasMore: res.hasMore });
        wx.hideNavigationBarLoading();
    },

    // 生命周期函数--监听页面滑动到底部
    onReachBottom: async function () {
        // // 判断是否有更多数据
        // if (!this.data.hasMore) return;
        // const res = await getTopMV(this.data.topMVs.length);
        // this.setData({ topMVs: this.data.topMVs.concat(res.data) });
        // this.setData({ hasMore: res.hasMore });
        this.getTopMvData(this.data.topMVs.length);
    },

    // 生命周期函数--监听页面下拉刷新
    onPullDownRefresh: async function () {
        // const res = await getTopMV(0);
        // this.setData({ topMVs: res.data });
        this.getTopMvData(0);
    },

    handleMvItemClick: function (event) {
        console.log('click item id:', event.currentTarget.dataset.item.id);
        wx.navigateTo({
            url: '/pages/detail-video/index?id=' + event.currentTarget.dataset.item.id,
            success: (result)=>{
                
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    }
})