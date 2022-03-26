import {getSongById} from "../../service/api_player";

Page({
    data: {
        id: 0,
        currentSong: {}
    },
    onLoad: function (options) {
        //    1. 获取传入的音乐 id
        const id = options.id;
        this.setData({
            id
        });
        //    2. 获取音乐详情
        this.getPageData(id);
        //    3. 获取音乐 url

    },
    getPageData: function (id) {
        // 根据 id 获取音乐详情
        getSongById(id).then(res => {
            console.log('getSongById', res.songs[0]);
            this.setData({
                currentSong: res.songs[0]
            });
        })
    }
});