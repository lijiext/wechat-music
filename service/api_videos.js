import NETWORK from "./index";
export function getTopMV(offset) {
    return NETWORK.get('/top/mv', { offset, limit: 10 });
}