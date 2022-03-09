import {HYEventStore} from 'hy-event-store'
import {getRankings} from "../service/api_music";

export const rankingStore = new HYEventStore({
    state: {
        hotRanking: {}
    },
    actions: {
        getRankingDataAction(ctx) {
            getRankings(1).then(res => {
                console.log('res', res);
                ctx.hotRanking = res.playlist;
            })
        }
    }
})

export default {
    rankingStore
}