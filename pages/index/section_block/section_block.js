// pages/index/section_block.js
const app = getApp();
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
            console.log(e.currentTarget.dataset.objid);
            wx.request({
              url: app.globalConfig.baseDomain + '/hp_wxapp/cms_gate/content_handler.php',
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                "obj_id": e.currentTarget.dataset.objid
              }
            })
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