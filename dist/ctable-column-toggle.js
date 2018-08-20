;(function (global) {
  "use strict"
  var CcTable = function (el) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
  }
  CcTable.prototype = {
    init : function (json) {
      var that = this 
      var json=json || {};
      json.theadData=json.theadData || []        
      if(!json.btnId || !json.theadData) return  
      // 绑定按钮
      json._btn = typeof json.btnId === 'string' ? document.querySelector(json.btnId) : json.btnId
      // 设置按钮父容器为相对定位
      json._btn = $(json.btnId)
      var btnParent = json._btn.parent()
      btnParent.css('position', 'relative')
      //创建选择框列表
      var ulStyle = json.ulStyle || 'display:none; width:200px; overflow: auto; line-height: 32px; position:absolute; top: 40px; left: 0; background:#FFFFFF; border:1px solid #ccc; z-index: 99;padding: 10px 30px;'
      var liStyle = json.liStyle || 'display:block;font-size:14px;line-heigth:14px;'
      var _checkGroup = $('<ul id="colList" style="'+ ulStyle +'"></ul>')
      // 将checkbox渲染到 checkGroup中，然后添加到按钮父容器里
      var lis = '';
      for (var i = 0; i < json.theadData.length; i++) {
        lis += '<li style="'+ liStyle +'"><input type="checkbox" style="margin-right: 10px;vertical-align: middle;zoom:140%;" data-index="'+ i +'">'+ json.theadData[i] +'</li>'
      }
      _checkGroup.append(lis);
      btnParent.append(_checkGroup);
      json._btn.on('click', function () {
        _checkGroup.toggle(200);
      })
      // checkbox点击事件，对表格进行隐藏
      _checkGroup.find('input[type="checkbox"]').on('click', function () {
        // 点击的checkbox索引
        var colIdx = this.dataset.index;
        // 当前状态
        var isChecked = $(this).is(':checked');
        // 根据索引，状态对表格进行列隐藏显示操作
        that.toggleColumn(colIdx, isChecked);
      })
    },
    toggleColumn : function (colIdx, isChecked) {
      var trs = $(this.el).find('tr');
      for (var i = 0; i < trs.length; i++) {
        var tds = $(trs[i]).find('td');
        if (tds[colIdx]) {
          isChecked ? tds[colIdx].style.display = 'none' : tds[colIdx].style.display = 'table-cell';
        }
      }
    }
  }

  //兼容CommonJs规范
  if (typeof module !== 'undefined' && module.exports) module.exports = CcTable;
 
  //兼容AMD/CMD规范
  if (typeof define === 'function') define(function() { return CcTable; });

  //注册全局变量，兼容直接使用script标签引入该插件
  global.CcTable = CcTable;

})(this)