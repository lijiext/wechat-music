// index.js
Page({
    data:{
        message: 'hello world'
    },
    changeMessage: function(){
        // 需要保存数据，响应式，类似react setstate
        this.setData({message: "I am lijie"})
    }
})
