import {getLyricById, getSongById} from "../../service/api_player";
import {audioContext} from "../../store/index"
import {parseLyric} from "../../utils/lyric_parse";

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
        showMusicLyric: true,
        sliderValue: 0,
        isSliderChanging: false,
        musicLyric: [],
        currentLyric: '',
        currentLyricIndex: 0,
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
        //    4. 创建播放器 使用全局的 audioContext
        // 播放地址，使用 audio 上下文播放
        // 首先停止播放
        audioContext.stop();
        audioContext.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
        audioContext.onCanplay(() => {
            audioContext.play();
        })

        // 获取当前播放进度
        audioContext.onTimeUpdate(() => {
            // console.log('currentPlayerTime: ', audioContext.currentTime)
            // this.setData({
            //     currentTime: audioContext.currentTime * 1000,
            // })
            if (this.data.isSliderChanging) {
                return;
            } else {
                this.setData({
                    sliderValue: audioContext.currentTime / audioContext.duration * 100,
                    currentTime: audioContext.currentTime * 1000,
                })
            }
            //    根据当前播放时间获取歌词
            // 多重循环or判断，可优化
            for (let i = 0; i < this.data.musicLyric.length; i++) {
                if (this.data.currentTime < this.data.musicLyric[i].time) {
                    // 只有当歌词改变时才更新
                    if (this.data.currentLyricIndex !== i - 1) {
                        console.log('currentLyricText: ', this.data.musicLyric[i - 1].text)
                        // 设置歌词为向前匹配
                        this.setData({
                            currentLyricIndex: i - 1,
                            currentLyric: this.data.musicLyric[i - 1].text || ''
                        })
                    }
                    break
                }
            }
        })
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
        // 根据 id 获取歌词
        getLyricById(id).then(res => {
            // console.log('getLyricById', res.lrc.lyric);
            const lyric = res.lrc.lyric
            // console.log(parseLyric(lyric));
            this.setData({
                // 格式化歌词到数组
                musicLyric: parseLyric(lyric)
            })
        })
    },
    // 监听页面切换
    swiperChange: function (e) {
        const currentPage = e.detail.current;
        this.setData({
            currentPage
        });
    },
    // 监听播放进度
    handleSliderChange: function (e) {
        console.log('handleSliderChange', e.detail.value);
        // 1. 获取进度值，范围 0 - 100
        const value = e.detail.value;
        // 2. 换算播放进度
        const targetTime = this.data.duration * value / 100;
        console.log('targetTime', targetTime);
        // 3. 设置播放进度
        audioContext.pause();
        // 注意本处的参数为秒
        audioContext.seek(targetTime / 1000);
        // 4. 记录当前播放进度
        this.setData({
            sliderValue: value,
            isSliderChanging: false
        })
    },
    // 监听播放进度条正在改变
    handleSliderChanging: function (e) {
        // console.log('handleSliderChanging', e.detail.value);
        const targetTime = this.data.duration * e.detail.value / 100;
        this.setData({
            isSliderChanging: true,
            currentTime: targetTime
        })
    },
});