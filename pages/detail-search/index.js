// pages/detail-search/index.js
import {getSearchHot, getSearchSuggest} from "../../service/api_search";
import debounce from "../../utils/debounce";
import {string2node} from "../../utils/string2node";

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300);
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotWords: [],
        input: '',
        suggestRes: [],
        suggestResNodes: []
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
        // console.error('input:', input.length);

        this.setData({
            input: input
        })
        if (!input.length) {
            this.setData({
                suggestRes: [],
                suggestResNodes: [],
                input: ''
            })
            return;
        }
        //    此处需要进行防抖操作，防止频繁调用接口
        debounceGetSearchSuggest(input).then(res => {
            console.log('search suggest:', res.result.allMatch);
            const regRes = res.result.allMatch;
            // 将搜索结果转换为节点
            const suggestResNodesMap = regRes.map(item => item.keyword);
            const nodesAfterSlice = [];
            for (const keyword of suggestResNodesMap) {
                // 此处调用封装函数，将关键词和搜索结果分离开展示
                nodesAfterSlice.push(string2node(keyword, input));
            }
            this.setData({
                suggestRes: regRes,
                suggestResNodes: nodesAfterSlice
            })
        })
    }
})