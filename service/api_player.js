import NETWORK from "./index"

export function getSongById(ids) {
    return NETWORK.get("/song/detail", {ids})
}

export function getLyricById(id) {
    return NETWORK.get("/lyric", {id})
}