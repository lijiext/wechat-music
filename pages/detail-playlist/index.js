import {rankingStore} from '../../store/index'
import {getPlaylistDetail} from "../../service/api_music";

Page({
    data: {
        rankings: {},
        playlistDetail: {},
        type: ''
    },
    onLoad: function (options) {
        const type = options.type;
        this.setData({
            type: type
        });
        if (type === 'ranking') {
            const rankingName = options.rankingName;
            rankingStore.onState(rankingName, this.getRankingDataHandler);
        } else if (type === 'playlist') {
            const id = options.id;
            getPlaylistDetail(id).then(res => {
                this.setData({
                    rankings: res.playlist
                })
            })
            console.log(id);
        }
    },
    onUnload: function () {
        if (this.data.rankings) {
            // TODO
            rankingStore.offState(this.data.rankings, this.getRankingDataHandler);
        }
    },
    getRankingDataHandler: function (res) {
        console.log(res);
        this.setData({
            rankings: res
        })
    },

});