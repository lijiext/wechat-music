import NETWORK from "../service/index";

export function getSearchHot() {
    return NETWORK.get('/search/hot');
}

export function getSearchSuggest(keywords) {
    return NETWORK.get('/search/suggest', {
        keywords,
        type: 'mobile'
    });
}

export function getSearchResult(keywords) {
    return NETWORK.get('/search', {
        keywords
    });
}