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
    methods: {
        handlePlaylistClick: function (e) {
            console.log('event:', e);
            const id = e.currentTarget.dataset.item.id;
            console.log('playlist click: ', 'playlist id:', e.currentTarget.dataset.item.id);
            wx.navigateTo({
                url: `/pages/detail-playlist/index?id=${id}&type=playlist`
            })
        }
    }
});
