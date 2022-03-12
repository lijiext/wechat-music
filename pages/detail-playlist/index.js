import {rankingStore} from '../../store/index'
import {getPlaylistDetail} from "../../service/api_music";

Page({
    data: {
        type: '',
        rankingName: '',
        rankings: {},
        playlistDetail: {},
    },
    onLoad: function (options) {
        const type = options.type;
        this.setData({
            type: type
        });
        if (type === 'ranking') {
            const rankingName = options.rankingName;
            this.setData({
                rankingName: rankingName
            });
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
        if (this.data.rankingName) {
            // TODO
            rankingStore.offState(this.data.rankingName, this.getRankingDataHandler);
        }
    },
    getRankingDataHandler: function (res) {
        console.log(res);
        this.setData({
            rankings: res
        })
    },

});