webpackJsonp([4],{"26dS":function(t,e,i){"use strict";function a(t){i("VxtB")}Object.defineProperty(e,"__esModule",{value:!0});var n=i("iFcm"),l=i("N/05"),o=i("VU/8"),s=a,r=o(n.a,l.a,!1,s,null,null);e.default=r.exports},"9bBU":function(t,e,i){i("mClu");var a=i("FeBl").Object;t.exports=function(t,e,i){return a.defineProperty(t,e,i)}},C4MV:function(t,e,i){t.exports={default:i("9bBU"),__esModule:!0}},"N/05":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view-content"},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("el-form",{staticClass:"demo-form-inline",staticStyle:{width:"70%"},attrs:{inline:!0,model:t.formInline}},[i("el-form-item",{staticClass:"ttsearch"},[i("el-input",{attrs:{placeholder:"标题搜索"},model:{value:t.SelectData,callback:function(e){t.SelectData=e},expression:"SelectData"}})],1),t._v(" "),i("el-form-item",[i("el-form-item",[i("el-select",{staticStyle:{"text-align":"center",width:"100px"},attrs:{placeholder:"请选择"},model:{value:t.Status,callback:function(e){t.Status=e},expression:"Status"}},[i("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"--状态--",value:"2"}}),t._v(" "),i("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"上架",value:"1"}}),t._v(" "),i("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"下架",value:"0"}})],1)],1)],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")])],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("添加")])],1),t._v(" "),i("el-form-item",{attrs:{id:"Excel"}},[i("el-upload",{staticClass:"upload-demo",attrs:{action:"/public/Excel","on-success":t.handleSuccess1}},[i("el-button",{attrs:{type:"primary"}},[t._v("EXCEL导入")])],1)],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.OPEN}},[t._v("CMS数据同步")])],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.ExcelDownLoad}},[t._v("专场模板下载")])],1)],1)],1)]),t._v(" "),i("el-card",{staticClass:"box-card1"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("el-table",{staticStyle:{width:"auto"},attrs:{data:t.tableData,border:""}},[i("el-table-column",{attrs:{prop:"recid",label:"ID",width:"80"}}),t._v(" "),i("el-table-column",{attrs:{prop:"title",label:"标题",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("a",{attrs:{href:"https://dvcms.weixinmvp.com/Mass/180312specialactivity/#!/home/"+e.row.recid,target:"_blank"}},[t._v(t._s(e.row.title))])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"thumbnailUrl",label:"图片",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.thumbnailUrl?i("div",[i("img",{attrs:{src:e.row.thumbnailUrl}})]):i("div",[t._v("\n                    未设置\n                ")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"时间",width:""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-date-picker",{attrs:{change:t.timeChange(e.row.timeRange,e),type:"datetimerange","range-separator":"至","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.row.timeRange,callback:function(i){t.$set(e.row,"timeRange",i)},expression:"scope.row.timeRange"}})]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"status",label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-switch",{attrs:{"active-color":"#409EFF","inactive-color":"#909399"},on:{change:function(i){t.buttonChange(e.row.status,e)}},model:{value:e.row.status,callback:function(i){t.$set(e.row,"status",i)},expression:"scope.row.status"}})]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"status",label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.preview(e)}}},[t._v("预览")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){t.edit(e)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(i){t.del(e.$index,e.row,t.tableData)}}},[t._v("删除")])]}}])})],1)],1)]),t._v(" "),i("div",{staticClass:"block"},[i("el-pagination",{attrs:{"page-sizes":[10,20,40,60,80,100],"page-size":t.limit,"current-page":t.currentPage4,layout:"total, sizes, prev, pager, next, jumper",total:t.total1},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{staticStyle:{"max-width":"540px",left:"50%","margin-left":"-5%",height:"800px",overflow:"hidden"},attrs:{title:t.dialogTitle,visible:t.dialogTableVisible,center:!0,modal:!1},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[i("iframe",{staticStyle:{height:"800px",border:"0px"},attrs:{src:t.iFrameUrl,width:"100%;"}})])],1)},n=[],l={render:a,staticRenderFns:n};e.a=l},PRLs:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,"body .el-date-range-picker,body .el-picker-panel,body .el-popper,element.style{left:200px}.box-card{width:100%}.view-content{width:98%;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.el-card__body{display:none}.demo-form-inline .el-form-item{margin-bottom:8px}.cell img{width:80px;height:40px}.block{width:100%;height:40px;line-height:40px;font-size:16px}.cell{text-align:center}.el-table__body{margin:0 auto}.view-content .block{width:50%;padding:30px}.ttsearch .el-form-item__content{width:100%}.el-submenu .el-menu-item{min-width:10%}.el-switch{height:23px;line-height:23px}a{text-decoration:none;color:#5a5e66}#Excel .el-upload-list{display:none}.el-dialog{width:100%;height:1000px;max-height:1000px;padding:0;margin:0}",""])},VxtB:function(t,e,i){var a=i("PRLs");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("45bc6cae",a,!0)},bOdI:function(t,e,i){"use strict";e.__esModule=!0;var a=i("C4MV"),n=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=function(t,e,i){return e in t?(0,n.default)(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}},iFcm:function(t,e,i){"use strict";var a=i("bOdI"),n=i.n(a),l=i("mvHQ"),o=i.n(l),s=i("mtWM"),r=i.n(s),c=i("PJh5");i.n(c);e.a={data:function(){return{Status:"2",value3:!0,total1:null,offset:"0",dialogTitle:"121212",limit:10,iFrameUrl:"/specialactivity/#!/home/302",dialogTableVisible:!1,formInline:{user:"",region:""},SelectData:"",tableData:[],currentPage4:1}},methods:n()({preview:function(t){this.iFrameUrl="/specialactivity/#!/home/"+t.row.recid,this.dialogTitle=t.row.title,this.dialogTableVisible=!0},timeChange:function(t,e){var i=this;if(this.tableData[e.$index].startTime!=this.tableData[e.$index].timeRange[0]||this.tableData[e.$index].endTime!=this.tableData[e.$index].timeRange[1]){var a={startTime:this.tableData[e.$index].timeRange[0],endTime:this.tableData[e.$index].timeRange[1]};r.a.post("/server/UpdateSpecialSubject",{RECID:e.row.recid,param:a}).then(function(t){e.row.startTime=i.tableData[e.$index].timeRange[0],e.row.endTime=i.tableData[e.$index].timeRange[1]})}},change:function(t){var e="";t.row.status?(e=0,t.row.status=!1):(e=1,t.row.status=!0),r.a.get("/server/status?status="+e+"&Id="+t.row.recid).then(function(){})},cancel:function(){this.SelectData="",this.GetSpecialSubjectPagination(this.offset,this.limit)},GetSpecialSubjectPagination:function(t,e){var i=this;r.a.get("/server/GetSpecialSubjectPagination?offset="+t+"&limit="+e+"&title="+this.SelectData+"&Status="+this.Status).then(function(t){i.total1=t.data.count;for(var e=t.data.rows,a=0;a<t.data.rows.length;a++)JSON.parse(t.data.rows[a].thumbnailUrl).length>=1?e[a].thumbnailUrl=JSON.parse(t.data.rows[a].thumbnailUrl)[0].ServerUrl+JSON.parse(t.data.rows[a].thumbnailUrl)[0].FilePath:e[a].thumbnailUrl="",t.data.rows[a].startTime||(e[a].startTime="未设置"),t.data.rows[a].endTime||(e[a].endTime="未设置"),1==t.data.rows[a].status?t.data.rows[a].status=!0:t.data.rows[a].status=!1;i.tableData=e})},onSubmit:function(){this.GetSpecialSubjectPagination(this.offset,this.limit)},handleSizeChange:function(t){this.limit=t},handleCurrentChange:function(t){this.offset=(t-1)*this.limit},del:function(t,e,i){},edit:function(t){this.$store.state.show=!0;var e=window.location.href.split("#")[0]+"#/edit/"+t.row.recid;window.open(e),this.$store.dispatch("GetGoods",{id:t.row.recid})},handleSuccess1:function(t){this.GetSpecialSubjectPagination(this.offset,this.limit),this.open3()},open3:function(){this.$notify({title:"成功",message:"数据导入成功",type:"success"})},add:function(){sessionStorage.setItem("id",""),this.$store.state.show=!1;var t={recid:"",title:"",startTime:"",endTime:"",navigationConfig:"[]"};this.$store.state.specitalPorject=t;var e=window.location.href.split("#")[0]+"#/edit";window.open(e)},OPEN:function(){window.open("https://cms.weixinmvp.com/api/Product/Synchro")},buttonChange:function(t,e){var i="";i=t?1:0,r.a.get("/server/status?status="+i+"&Id="+e.row.recid).then(function(){})},ExcelDownLoad:function(){window.location.href=location.origin+"/template/spectialTemplate.xlsx"}},"del",function(t,e,i){var a=this,n=this;this.$confirm("此操作将永久删除该专题, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$message({type:"success",message:"删除成功!"});for(var t=[],i=0;i<JSON.parse(e.navigationConfig).length;i++)t.push(JSON.parse(e.navigationConfig)[i].Code);r.a.get("/server/DestroySpecialSubject?RECID="+e.recid).then(function(t){n.GetSpecialSubjectPagination(n.offset,n.limit)}),r.a.get("/server/deleteGoods?CodeArr="+o()(t)).then(function(t){})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})}),watch:{offset:function(){this.GetSpecialSubjectPagination(this.offset,this.limit)},limit:function(){this.GetSpecialSubjectPagination(this.offset,this.limit)},SelectData:function(t){t||(this.SelectData="",this.GetSpecialSubjectPagination(this.offset,this.limit))}},created:function(){this.offset="0",this.GetSpecialSubjectPagination(this.offset,this.limit)}}},mClu:function(t,e,i){var a=i("kM2E");a(a.S+a.F*!i("+E39"),"Object",{defineProperty:i("evD5").f})},mvHQ:function(t,e,i){t.exports={default:i("qkKv"),__esModule:!0}},qkKv:function(t,e,i){var a=i("FeBl"),n=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}}});