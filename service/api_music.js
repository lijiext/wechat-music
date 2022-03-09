import NETWORK from './index'

export function getBanners() {
    return NETWORK.get('/banner', {
        type: 2
    })
}

export function getRankings(idx) {
    return NETWORK.get('/top/list', {
        idx: idx
    })
}

export function getHotPlaylist(cat = "全部", limit = 6, offset = 0) {
    // 可以选择的歌曲类别：全部、华语、欧美、日本、韩国、粤语、小语种
    return NETWORK.get('/top/playlist', {
        cat,
        limit,
        offset
    })
}