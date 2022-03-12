import NETWORK from './index'

export function getBanners() {
    return NETWORK.get('/banner', {
        type: 2
    })
}

/**
 * 获取推荐歌单
 * @param idx 0:新歌 1:热歌 2:原创 3:飙升
 * @returns {Promise<unknown>}
 */
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

export function getRanking() {
    return NETWORK.get('/toplist', {})
}

export function getPlaylistDetail(id) {
    return NETWORK.get('/playlist/detail/dynamic', {
        id
    })
}