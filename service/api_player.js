import NETWORK from "./index"

export function getSongById(ids) {
    return NETWORK.get("/song/detail", {ids})
}