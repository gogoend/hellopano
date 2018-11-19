// pages/index/sectionBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoRead: function (event) {
      wx.navigateTo({
        url: '/pages/read/read',
      })
      console.log(event);
    },

  }
})
