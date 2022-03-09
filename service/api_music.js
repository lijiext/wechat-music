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