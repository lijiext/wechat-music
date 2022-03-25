Component({
    properties: {
        item: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        handleSongItemClick: function (e) {
            console.log('handleSongItemClick from V1, song id:', e.currentTarget.dataset.id);
            const id = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: '/pages/music-player/index?id=' + id
            });
        }
    }
});
