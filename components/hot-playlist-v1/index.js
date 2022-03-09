const app = getApp();

Component({
    properties: {
        title: {
            type: String,
            value: '热门推荐'
        },
        hotPlaylist: {
            type: Array,
            value: []
        }
    },
    data: {
        screenWidth: app.globalData.screenWidth,
    },
    methods: {}
});
