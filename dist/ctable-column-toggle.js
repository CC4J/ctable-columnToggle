var Ctable = {
  _table: '',
  _theads: [],
  _btn: '',
  _checkGroup: $('<ul id="colList" style="display:none; width:200px; overflow: auto; line-height: 32px; position:absolute; top: 40px; left: 0; background:#FFFFFF; border:1px solid #ccc; z-index: 99;padding: 10px 30px;"></ul>'),
  init: function (tableId, btnId, theads) {
    var that = this;
    // 绑定表格
    this._table = $('#' + tableId);
    // 绑定按钮
    this._btn = $('#' + btnId);
    // 绑定表头数据
    this._theads = theads;
    // 设置按钮父容器为相对定位
    this._btn.parent().css('position', 'relative');
    // 将checkbox渲染到 checkGroup中，然后添加到按钮父容器里
    var lis = '';
    for (var i = 0; i < theads.length; i++) {
      lis += '<li style="display:block;font-size:14px;line-heigth:14px;"><input type="checkbox" style="margin-right: 10px;vertical-align: middle;zoom:140%;" data-index="'+ i +'">'+ theads[i] +'</li>'
    }
    this._checkGroup.append(lis);
    this._btn.parent().append(this._checkGroup);
    this._btn.on('click', function () {
      that._checkGroup.toggle(200);
    })
    // checkbox点击事件，对表格进行隐藏
    this._checkGroup.find('input[type="checkbox"]').on('click', function () {
      // 点击的checkbox索引
      var colIdx = this.dataset.index;
      // 当前状态
      var isChecked = $(this).is(':checked');
      // 根据索引，状态对表格进行列隐藏显示操作
      that.toggleColumn(colIdx, isChecked);
    })
  },
  toggleColumn: function (colIdx, isChecked) {
    var trs = this._table.find('tr');
    for (var i = 0; i < trs.length; i++) {
      var tds = $(trs[i]).find('td');
      if (tds[colIdx]) {
        isChecked ? tds[colIdx].style.display = 'none' : tds[colIdx].style.display = 'table-cell';
      }
    }
  }
}