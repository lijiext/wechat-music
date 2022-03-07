import NETWORK from "./index";

export function getTopMV(offset) {
    return NETWORK.get('/top/mv', { offset, limit: 10 });
}


/**
 * 根据 歌曲id 获取 MV 视频播放地址
 * @param {number} id 歌曲 id
 * @returns 
 */
export function getMvURL(id) {
    return NETWORK.get('/mv/url', { id: id });
}

/**
 * 根据 视频 id 获取视频详情
 * @param {number} mvid 
 * @returns 
 */
export function getMvDetail(mvid) {
    return NETWORK.get('/mv/detail', { mvid });
}

/**
 * 根据 歌曲 id 获取相关的 MV 推荐
 * @param {number} id 歌曲 id
 * @returns 
 */
export function getMvRelatedVideo(id) {
    return NETWORK.get('/related/allvideo', { id });
}