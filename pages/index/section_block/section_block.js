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
    sectionBlockTap: function(e) {
      switch (e.target.dataset.role) {
        case 'zan':
          {
            console.log(e.target.dataset.role)
          };
          break;
        default:
          {
            wx.navigateTo({
              url: '/pages/read/read?postid=' + e.currentTarget.dataset.objid,
            })
          };
          break;
      }
    }
  }
})