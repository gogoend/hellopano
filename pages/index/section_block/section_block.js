// pages/index/section_block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post: Object
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
        url: '/pages/read/read?postid=' + event.target.dataset.objid,
      })
      console.log(event);
    },
    zan:function(event){
      //console.log(event)
    },
    conout: function (event) {
      console.log(event.target.dataset)
    }
  }
})
