import NETWORK from './index'

export function getBanners() {
    return NETWORK.get('/banner', {
        type: 2
    })
}