// index.js
Page({
    data:{
        message: 'hello world',
        movies: [
            "穿越寒冬拥抱你",
            "这个杀手不太冷",
            "狙击手",
            "我们的冬奥"
        ],
        count: 0,
    },
    changeMessage: function(){
        // 需要保存数据，响应式，类似react setstate
        this.setData({message: "I am lijie"})
    },
    handleIncrement: function(){
        this.setData({count: this.data.count + 1})
    },
    handleDecrement: function(){
        this.setData({count: this.data.count - 1})
    }
})
