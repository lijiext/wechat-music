Component({
    properties: {
        index: {
            type: Number,
            value: 0
        },
        item: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        handleSongItemClick: function (e) {
            console.log('handleSongItemClick from V2, song id:', e.currentTarget.dataset.id);
            const id = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: '/pages/music-player/index?id=' + id
            });
        }
    }
});
