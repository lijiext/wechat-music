// pages/detail-search/index.js
import {getSearchHot, getSearchSuggest} from "../../service/api_search";
import debounce from "../../utils/debounce";
const debounceGetSearchSuggest = debounce(getSearchSuggest, 300);
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotWords: [],
        input: '',
        suggestRes: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPageData();
    },
    getPageData: function () {
        getSearchHot().then(res => {
            console.log('seach hot words:', res.result.hots);
            this.setData({
                hotWords: res.result.hots
            })
        })
    },
    // 搜索事件处理
    handleInputChange: function (e) {
        const input = e.detail;
        this.setData({
            input: input
        })
        if (!input.length) {
            this.setData({
                suggestRes: []
            })
            return;
        }
        //    此处需要进行防抖操作，防止频繁调用接口
        debounceGetSearchSuggest(input).then(res => {
            console.log('search suggest:', res.result.allMatch);
            this.setData({
                suggestRes: res.result.allMatch
            })
        })
    }
})