// pages/home-music/index.js
Page({

    data: {

    },

    onLoad: function (options) {

    },

    handleSearchClick: function () {
        console.log('handleSearchClick');
        wx.navigateTo({
            url: '/pages/detail-search/index',
            success: (result)=>{
                
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },


})