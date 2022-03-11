// components/content-header/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: 'Default Title'
        },
        subTitle: {
            type: String,
            value: '更多'
        },
        showRight: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        showMore:function () {
            this.triggerEvent('showMore');
        }
    }
})
