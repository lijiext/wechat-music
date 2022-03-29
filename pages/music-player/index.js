import {getSongById} from "../../service/api_player";

Page({
    data: {
        id: 0,
        currentSong: {},
        currentPage: 0,
        swiperHeight: 0,
        duration: null,
        playerMusicInfo: {
            albumImgSrc: 'https://p1.music.126.net/Zrf65912ZxBNKU4px83SRg==/109951167166626780.jpg'
        },
        showMusicLyric: true
    },
    onLoad: function (options) {
        // 设置 swiper 高度
        const screenHeight = getApp().globalData.screenHeight;
        const statusBarHeight = getApp().globalData.statusBarHeight;
        // 本处使用了常量写死，不建议这么做
        const swiperHeight = screenHeight - statusBarHeight - 44;
        this.setData({
            showMusicLyric: getApp().globalData.isShowLyric,
        })
        //    1. 获取传入的音乐 id
        const id = options.id;
        this.setData({
            id,
            swiperHeight
        });
        //    2. 获取音乐详情
        this.getPageData(id);
        //    3. 获取音乐 url
        //    4. 创建播放器
        const audioCtx = wx.createInnerAudioContext();
        // 播放地址，使用 audio 上下文播放
        audioCtx.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
        audioCtx.play();

        // audioCtx.autoplay = true;
        // audioCtx.onCanplay(() => {
        //     audioCtx.play();
        // });
    },
    getPageData: function (id) {
        // 根据 id 获取音乐详情
        getSongById(id).then(res => {
            console.log('getSongById', res.songs[0]);
            this.setData({
                currentSong: res.songs[0],
                duration: res.songs[0].dt
            });
        })
    },
    // 监听页面切换
    swiperChange: function (e) {
        const currentPage = e.detail.current;
        this.setData({
            currentPage
        });
    }
});