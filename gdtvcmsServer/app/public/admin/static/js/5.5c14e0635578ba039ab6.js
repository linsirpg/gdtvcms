webpackJsonp([5],{"7VIB":function(t,e,a){"use strict";function l(t){a("Uhb2")}Object.defineProperty(e,"__esModule",{value:!0});var i=a("9fOe"),n=a("ghLy"),s=a("VU/8"),o=l,r=s(i.a,n.a,!1,o,null,null);e.default=r.exports},"9bBU":function(t,e,a){a("mClu");var l=a("FeBl").Object;t.exports=function(t,e,a){return l.defineProperty(t,e,a)}},"9fOe":function(t,e,a){"use strict";var l=a("bOdI"),i=a.n(l),n=a("mtWM"),s=a.n(n);e.a={data:function(){var t;return t={SelectData:"",Status:"2",SelectKind:"",limit:10,total1:null,currentPage4:0,offset:"0"},i()(t,"limit",10),i()(t,"tableData",[]),i()(t,"PresetValue","1"),t},watch:{offset:function(){this.GetSArticleInfo(this.offset,this.limit)},limit:function(){this.GetSArticleInfo(this.offset,this.limit)},SelectData:function(t){t||(this.SelectData="",this.GetSArticleInfo(this.offset,this.limit))},SelectKind:function(t){t||(this.SelectKind="",this.GetSArticleInfo(this.offset,this.limit))}},created:function(){this.GetSArticleInfo(this.offset,this.limit)},methods:{buttonChange:function(t,e){var a="";a=t?1:0,s.a.get("/server/Goodstatus?status="+a+"&Id="+e.row.recid).then(function(t){})},del:function(t,e,a){var l=this,i=this;this.$confirm("此操作将永久删除该专题, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l.$message({type:"success",message:"删除成功!"});s.a.get("/productlist/DestroyPreset?RECID="+e.recid).then(function(e){i.GetSArticleInfo(i.offset,i.limit),a.splice(t,1)})}).catch(function(){l.$message({type:"info",message:"已取消删除"})})},GetSArticleInfo:function(t,e){var a=this;s.a.get("/productlist/GetProductlist?offset="+t+"&limit="+e+"&title="+this.SelectData+"&status="+this.Status+"&kind="+this.SelectKind).then(function(t){a.total1=t.data.count;for(var e=0;e<t.data.rows.length;e++)t.data.rows[e].Price=!0,1==t.data.rows[e].status?t.data.rows[e].status=!0:t.data.rows[e].status=!1;var l=t.data.rows;console.log(l),a.tableData=l})},handleSizeChange:function(t){this.limit=t},handleCurrentChange:function(t){this.offset=(t-1)*this.limit},onSubmit:function(){this.GetSArticleInfo(this.offset,this.limit)},handleSuccess:function(t,e){"ok"==t&&this.GetSArticleInfo(this.offset,this.limit)}}}},C4MV:function(t,e,a){t.exports={default:a("9bBU"),__esModule:!0}},Uhb2:function(t,e,a){var l=a("uAFk");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("7d6c330a",l,!0)},bOdI:function(t,e,a){"use strict";e.__esModule=!0;var l=a("C4MV"),i=function(t){return t&&t.__esModule?t:{default:t}}(l);e.default=function(t,e,a){return e in t?(0,i.default)(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}},ghLy:function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-form",{staticClass:"demo-form-inline",staticStyle:{width:"70%"},attrs:{inline:!0}},[a("el-form-item",{staticClass:"ttsearch"},[a("el-input",{attrs:{placeholder:"标题搜索"},model:{value:t.SelectData,callback:function(e){t.SelectData=e},expression:"SelectData"}})],1),t._v(" "),a("el-form-item",{staticClass:"ttsearch"},[a("el-input",{attrs:{placeholder:"kind搜索"},model:{value:t.SelectKind,callback:function(e){t.SelectKind=e},expression:"SelectKind"}})],1),t._v(" "),a("el-form-item",[a("el-form-item",[a("el-select",{staticStyle:{"text-align":"center",width:"100px"},attrs:{placeholder:"请选择"},model:{value:t.Status,callback:function(e){t.Status=e},expression:"Status"}},[a("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"--状态--",value:"2"}}),t._v(" "),a("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"上架",value:"1"}}),t._v(" "),a("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"下架",value:"0"}})],1)],1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.onSubmit()}}},[t._v("查询")])],1),t._v(" "),a("el-form-item",[a("el-upload",{staticClass:"upload-demo",attrs:{action:"/public/presetExcel","on-success":t.handleSuccess}})],1),t._v(" "),a("el-form-item",[a("el-upload",{staticClass:"upload-demo",attrs:{action:"/public/UpdateProductRef","on-success":t.handleSuccess}})],1)],1)],1)]),t._v(" "),a("el-card",{staticClass:"box-card1",staticStyle:{"text-align":"center"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{label:"信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{attrs:{href:t.tableData[e.$index].url,target:"_blank"}},[t._v(t._s(t.tableData[e.$index].title)+"["+t._s(t.tableData[e.$index].productNo)+"]")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"relationCode",prop:"relationCode"}}),t._v(" "),a("el-table-column",{attrs:{prop:"memo",label:"描述",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.memo?a("div",[t._v("\n                  "+t._s(e.row.memo)+"\n                ")]):a("div",[t._v("\n                    未设置\n                ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"imageUrl",label:"图片",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.imageUrl?a("div",[a("img",{staticStyle:{width:"200px"},attrs:{src:JSON.parse(e.row.imageUrl)[0].ServerUrl+JSON.parse(e.row.imageUrl)[0].FilePath,alt:""}})]):a("div",[t._v("\n                    未设置\n                ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"salePrice",label:"价格",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.salePrice?a("div",[t._v("\n                  "+t._s(e.row.salePrice)+"\n                ")]):a("div",[t._v("\n                    未设置\n                ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"sort",label:"排序",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.Price?a("div",[a("el-button",{staticStyle:{border:"1px"},on:{click:function(a){t.ChangePrice(e,this)}}},[a("i",{staticClass:"el-icon-edit"}),t._v(t._s(e.row.sort))])],1):a("div",[a("el-input",{staticStyle:{"text-align":"center",border:"1px solid #ccc","border-radius":"6px"},on:{blur:function(a){t.Blur(e)},focus:function(a){t.focus(e)}},model:{value:e.row.sort,callback:function(a){t.$set(e.row,"sort",a)},expression:"scope.row.sort"}})],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-color":"#409EFF","inactive-color":"#909399"},on:{change:function(a){t.buttonChange(e.row.status,e)}},model:{value:e.row.status,callback:function(a){t.$set(e.row,"status",a)},expression:"scope.row.status"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.edit1(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){t.removegood(e.row,e.$index,t.tableData)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage4,"page-sizes":[10,20,40,60,80,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total1},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},i=[],n={render:l,staticRenderFns:i};e.a=n},mClu:function(t,e,a){var l=a("kM2E");l(l.S+l.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},uAFk:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,"a{text-decoration:none;color:#5a5e66}.cell{text-align:center}.box-card .el-card__body{display:none}.box-card1 .el-card__body{display:block}.el-switch{height:23px;line-height:23px}",""])}});