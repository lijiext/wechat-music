import {rankingStore} from '../../store/index'

Page({
    data: {
        rankings: {}
    },
    onLoad: function (options) {
        const rankingName = options.rankingName;
        rankingStore.onState(rankingName, this.getRankingDataHandler)
    },
    onUnload: function () {
        rankingStore.offState(this.data.rankings, this.getRankingDataHandler)
    },
    getRankingDataHandler: function (res) {
        console.log(res);
        this.setData({
            rankings: res
        })
    },

});