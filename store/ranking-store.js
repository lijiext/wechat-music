import {HYEventStore} from 'hy-event-store'
import {getRankings} from "../service/api_music";
const RankMapping = {
    0: 'newSongsRanking',
    1: 'hotRanking',
    2: 'originalSongRanking',
    3: 'upingSongRanking',
}
const rankingStore = new HYEventStore({
    state: {
        newSongsRanking: [],//新歌榜单
        hotRanking: {},//热门榜单
        originalSongRanking: {},//原创榜单
        upingSongRanking: {},//上升最快榜单
    },
    actions: {
        getRankingDataAction(ctx) {
            for (let i = 0; i < 4; i++) {
                getRankings(i).then(res => {
                    const rankingName = RankMapping[i];
                    ctx[rankingName] = res.playlist;
                })
            }

        }
    }
})

export  {
    rankingStore,
    RankMapping
}