webpackJsonp([3],{"9bBU":function(t,e,o){o("mClu");var a=o("FeBl").Object;t.exports=function(t,e,o){return a.defineProperty(t,e,o)}},C4MV:function(t,e,o){t.exports={default:o("9bBU"),__esModule:!0}},O3CU:function(t,e,o){"use strict";var a=o("mvHQ"),i=o.n(a),l=o("bOdI"),s=o.n(l),r=o("mtWM"),n=o.n(r);e.a={data:function(){var t,e=function(t,e,o){isNaN(e)?o(new Error("请输入数字值")):o()},o=function(t,e,o){isNaN(e)?o(new Error("请输入数字值")):o()},a=function(t,e,o){if(!e)return o(new Error("产品编号不能为空"));o()};return t={Image:[],CMSTags:{},infototal:null,infooffset:0,infolimit:4,Good:"",show:!0,sort:null,SelectData:"",Status:"2"},s()(t,"show",!0),s()(t,"value","0"),s()(t,"value0",""),s()(t,"value1",""),s()(t,"insertcontent",""),s()(t,"searchtableData",[]),s()(t,"RECID",""),s()(t,"limit",10),s()(t,"offset",0),s()(t,"code",""),s()(t,"fileList1",[]),s()(t,"currentPage4",0),s()(t,"CMSRECID",""),s()(t,"total1",null),s()(t,"activeName2","first"),s()(t,"tableData",[]),s()(t,"dialogFormVisible1",!1),s()(t,"ModelGood",{productNo:"",title:"",memo:"",salePrice:"",sort:"",status:"",url:"",relationCode:"",relationKind:"article"}),s()(t,"rules",{SORT:{validator:e,trigger:"blur"},salePrice:{validator:o,trigger:"blur"},PRODUCT_NO:{validator:a,trigger:"blur"}}),t},watch:{infooffset:function(){var t=this;this.code=this.$route.params.id,n.a.get("/api/getProductInfo?search="+this.insertcontent+"&offset="+this.infooffset+"&limit="+this.infolimit).then(function(e){e.data.rows&&(e.data.rows.map(function(t){t.productImage&&(t.imageUrl=[],t.imageUrl.push(JSON.parse(t.productImage)[0]),t.productImg=JSON.parse(t.productImage)[0].ServerUrl+JSON.parse(t.productImage)[0].FilePath+".thumb."+JSON.parse(t.productImage)[0].FileExt)}),t.searchtableData=e.data.rows),t.infototal=e.data.count})},offset:function(){var t=this;this.code=this.$route.params.id,n.a.get("articleinfo/GetCmsProductRef?Code="+this.$route.params.id+"&offset="+this.offset+"&limit="+this.limit+"&title="+this.SelectData+"&status="+this.Status).then(function(e){for(var o=0;o<e.data.rows.length;o++)e.data.rows[o].Price=!0,1==e.data.rows[o].status?e.data.rows[o].status=!0:e.data.rows[o].status=!1;t.tableData=e.data.rows,t.total1=e.data.count})},SelectData:function(t){if(t);else{this.SelectData="";var e=this;n.a.get("/articleinfo/GetCmsProductRef?Code="+this.$route.params.id+"&offset="+this.offset+"&limit="+this.limit+"&title="+this.SelectData+"&status="+this.Status).then(function(t){for(var o=0;o<t.data.rows.length;o++)t.data.rows[o].Price=!0,1==t.data.rows[o].status?t.data.rows[o].status=!0:t.data.rows[o].status=!1;e.tableData=t.data.rows,e.total1=t.data.count})}}},methods:{ProductLink:function(t){var e=this.ModelGood.url;window.open(e)},search:function(){this.currentPage4=0,this.infototal=0,this.infooffset=0;var t=this;t.searchtableData=[],this.insertcontent?n.a.get("/api/getProductInfo?search="+this.insertcontent+"&offset="+this.infooffset+"&limit="+this.infolimit).then(function(e){e.data.rows&&(e.data.rows.map(function(t){t.productImage&&(t.imageUrl=[],t.imageUrl.push(JSON.parse(t.productImage)[0]),t.productImg=JSON.parse(t.productImage)[0].ServerUrl+JSON.parse(t.productImage)[0].FilePath+".thumb."+JSON.parse(t.productImage)[0].FileExt)}),t.searchtableData=e.data.rows),t.infototal=e.data.count}):this.insertcontent="请输入正确的标题或编码"},handleCurrentChange1:function(t){if(t){this.fileList1=[],this.ModelGood.productNo=t.productNo,this.ModelGood.title=t.productName,this.ModelGood.memo=t.shortDesc,this.ModelGood.sort=t.sort,this.ModelGood.salePrice=t.salePrice,this.ModelGood.url="https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no="+t.productNo,this.Image=[],this.fileList1=[],t.imageUrl[0]&&(this.Image=t.imageUrl);var e={};e.url=t.productImg,this.fileList1.push(e)}},handleCurrentChangeinfo:function(t){this.infooffset=(t-1)*this.infolimit},open:function(t,e){this.$notify({title:t,message:e,type:"success"})},handleClick:function(t){sessionStorage.setItem("key",t.name)},cancel:function(){this.dialogFormVisible1=!1,this.ModelGood.productNo="",this.ModelGood.title="",this.ModelGood.memo="",this.ModelGood.salePrice="",this.ModelGood.sort="",this.ModelGood.status="",this.ModelGood.url="",this.ModelGood.relationCode=this.code,this.fileList1=[]},save:function(){var t=this,e=this;this.$refs.ModelGood.validate(function(o){if(!o)return void(t.dialogFormVisible1=!0);t.dialogFormVisible1=!1,t.ModelGood.status=t.value,1==t.Image.length?t.ModelGood.imageUrl=i()(t.Image):delete t.ModelGood.imageUrl,t.ModelGood.salePrice||delete t.ModelGood.salePrice,t.ModelGood.recid&&delete t.ModelGood.recid,n.a.post("/articleinfo/addOne",{param:t.ModelGood}).then(function(t){var o={};o.recid=t.data.recid;for(var a in e.ModelGood)o[a]=e.ModelGood[a];1==e.Image.length?o.imageUrl=i()(e.Image):o.imageUrl=null,e.tableData||(e.tableData=[]),o.status=!0,o.Price=!0,e.tableData.unshift(o),e.open("成功","保存成功")})})},comfire:function(){var t=this,e=this;this.$refs.ModelGood.validate(function(o){if(!o)return void(t.dialogFormVisible1=!0);t.dialogFormVisible1=!1;for(var a in t.ModelGood)t.Good[a]=t.ModelGood[a];t.ModelGood.salePrice||delete t.ModelGood.salePrice,t.Image.length?(t.ModelGood.imageUrl=i()(t.Image),t.Good.imageUrl=i()(t.Image)):delete t.ModelGood.imageUrl,n.a.post("/articleinfo/update",{RECID:t.Good.recid,param:t.ModelGood}).then(function(t){e.open("成功","保存成功"),e.Image=[]})})},edit1:function(t){if(this.show=!1,this.Good=t,this.fileList1=[],this.dialogFormVisible1=!0,this.Good.imageUrl){var e={};e.url=JSON.parse(this.Good.imageUrl)[0].ServerUrl+JSON.parse(this.Good.imageUrl)[0].FilePath,this.fileList1.push(e)}for(var o in t)this.ModelGood[o]=t[o];setTimeout(function(){var t=document.getElementsByClassName("v-modal")[0];document.getElementsByTagName("body")[0].removeChild(t)},20)},add:function(){this.Image=[],this.searchtableData=[],this.insertcontent="",this.infototal=0,this.fileList1=[],setTimeout(function(){var t=document.getElementsByClassName("v-modal")[0];document.getElementsByTagName("body")[0].removeChild(t)},20),this.show=!0,this.dialogFormVisible1=!0,this.ModelGood.productNo="",this.ModelGood.title="",this.ModelGood.memo="",this.ModelGood.salePrice="",this.ModelGood.sort="99",this.ModelGood.status="",this.ModelGood.url="",this.ModelGood.relationCode=this.code,this.dialogFormVisible1=!0},handleSuccess1:function(t){this.Image=[],this.fileList1=[],this.Image.push(t);var e={};e.url=t.ServerUrl+t.FilePath,this.fileList1.push(e)},onSubmit:function(){var t=this;n.a.get("/articleinfo/GetCmsProductRef?Code="+this.$route.params.id+"&offset="+this.offset+"&limit="+this.limit+"&title="+this.SelectData+"&status="+this.Status).then(function(e){for(var o=0;o<e.data.rows.length;o++)e.data.rows[o].Price=!0,1==e.data.rows[o].status?e.data.rows[o].status=!0:e.data.rows[o].status=!1;t.tableData=e.data.rows,t.total1=e.data.count})},save1:function(){var t=this;this.$route.params.id||this.code?n.a.post("/articleinfo/UpdateArtical",{RECID:this.CMSTags.recid,param:this.CMSTags}).then(function(e){t.open("成功","保存成功")}):(this.CMSTags.createDate=new Date,this.CMSTags.updateDate=new Date,this.CMSTags.typeId=0,this.CMSTags.status=1,n.a.post("/articleinfo/creat",{param:this.CMSTags}).then(function(e){t.code=e.data.recid,t.CMSTags.recid=e.data.recid,t.open("成功","保存成功")}))},handleCurrentChange:function(t){this.offset=(t-1)*this.limit},err:function(t,e){this.$notify.error({title:t,message:e})},Blur:function(t){var e=this;isNaN(t.row.sort)?this.err("失败","不能包含字母，请重新输入"):(this.sort!=t.row.sort&&n.a.post("/articleinfo/update",{RECID:t.row.recid,param:t.row}).then(function(t){e.open("成功","排序修改成功")}),t.row.Price=!0)},focus:function(t){this.sort=t.row.SORT},ChangePrice:function(t,e){t.row.Price=!1},buttonChange:function(t,e){var o="";o=t?1:0,n.a.get("/articleinfo/Goodstatus?status="+o+"&Id="+e.row.recid).then(function(t){})},removegood:function(t,e,o){var a=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$message({type:"success",message:"删除成功!"});var i=a;o.splice(e,1),i.total1-=1,n.a.get("/articleinfo/deleteOne?RECID="+t.recid).then(function(t){})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})}},created:function(){if(sessionStorage.getItem("key")&&(this.activeName2=sessionStorage.getItem("key")),this.$route.params.id){this.activeName2="two";var t=this;this.code=this.$route.params.id,n.a.get("articleinfo/GetCmsProductRef?Code="+this.$route.params.id+"&offset="+this.offset+"&limit="+this.limit+"&title="+this.SelectData+"&status="+this.Status).then(function(e){for(var o=0;o<e.data.rows.length;o++)e.data.rows[o].Price=!0,1==e.data.rows[o].status?e.data.rows[o].status=!0:e.data.rows[o].status=!1,null==e.data.rows[o].imageUrl||e.data.rows[o].imageUrl;t.tableData=e.data.rows,t.total1=e.data.count}),n.a.get("articleinfo/GetOneSArticleInfo?RECID="+this.$route.params.id).then(function(e){t.CMSTags=e.data,t.ModelGood.relationKind=e.data.kind})}else this.activeName2="first"}}},Q8m2:function(t,e,o){var a=o("nFS+");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);o("rjj0")("2a588679",a,!0)},bOdI:function(t,e,o){"use strict";e.__esModule=!0;var a=o("C4MV"),i=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=function(t,e,o){return e in t?(0,i.default)(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}},"hFA/":function(t,e,o){"use strict";function a(t){o("Q8m2")}Object.defineProperty(e,"__esModule",{value:!0});var i=o("O3CU"),l=o("kBVR"),s=o("VU/8"),r=a,n=s(i.a,l.a,!1,r,null,null);e.default=n.exports},kBVR:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"productTag",staticStyle:{width:"100%",height:"auto","padding-top":"35px",margin:"0 auto"}},[o("el-tabs",{staticClass:"one",attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName2,callback:function(e){t.activeName2=e},expression:"activeName2"}},[o("el-tab-pane",{attrs:{label:"专题",name:"first"}},[o("div",{staticStyle:{width:"70%",float:"left","padding-top":"30px",margin:"0 auto","padding-bottom":"30px"}},[o("el-form",{staticClass:"demo-table-expand",attrs:{model:t.CMSTags,inline:""}},[o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"标题",props:"TITLE"}},[o("el-input",{model:{value:t.CMSTags.title,callback:function(e){t.$set(t.CMSTags,"title",e)},expression:"CMSTags.title"}})],1),t._v(" "),o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"描述",props:"TITLE"}},[o("el-input",{model:{value:t.CMSTags.shortDesc,callback:function(e){t.$set(t.CMSTags,"shortDesc",e)},expression:"CMSTags.shortDesc"}})],1),t._v(" "),o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"排序",props:"showOrder"}},[o("el-input",{model:{value:t.CMSTags.showOrder,callback:function(e){t.$set(t.CMSTags,"showOrder",e)},expression:"CMSTags.showOrder"}})],1),t._v(" "),o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"KIND",props:"TITLE"}},[o("el-input",{model:{value:t.CMSTags.kind,callback:function(e){t.$set(t.CMSTags,"kind",e)},expression:"CMSTags.kind"}})],1),t._v(" "),o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"链接",props:"TITLE"}},[o("el-input",{model:{value:t.CMSTags.url,callback:function(e){t.$set(t.CMSTags,"url",e)},expression:"CMSTags.url"}})],1),t._v(" "),o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"概要",props:"summary"}},[o("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:t.CMSTags.summary,callback:function(e){t.$set(t.CMSTags,"summary",e)},expression:"CMSTags.summary"}})],1),t._v(" "),o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"内容",props:"summary"}},[o("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:t.CMSTags.content,callback:function(e){t.$set(t.CMSTags,"content",e)},expression:"CMSTags.content"}})],1)],1)],1),t._v(" "),o("el-button",{staticStyle:{float:"right",position:"absolute",right:"30px",bottom:"30px","box-shadow":"1px 1px 1px #ccc"},attrs:{type:"primary"},on:{click:function(e){t.save1()}}},[t._v("保存")])],1),t._v(" "),o("el-tab-pane",{attrs:{label:"商品",name:"two"}},[o("el-card",{staticClass:"box-card"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("el-form",{staticClass:"demo-form-inline",staticStyle:{width:"70%"},attrs:{inline:!0}},[o("el-form-item",{staticClass:"ttsearch"},[o("el-input",{attrs:{placeholder:"标题、编码"},model:{value:t.SelectData,callback:function(e){t.SelectData=e},expression:"SelectData"}})],1),t._v(" "),o("el-form-item",[o("el-form-item",[o("el-select",{staticStyle:{"text-align":"center",width:"100px"},attrs:{placeholder:"请选择"},model:{value:t.Status,callback:function(e){t.Status=e},expression:"Status"}},[o("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"--状态--",value:"2"}}),t._v(" "),o("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"上架",value:"1"}}),t._v(" "),o("el-option",{staticStyle:{"text-align":"center"},attrs:{label:"下架",value:"0"}})],1)],1)],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")])],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.add()}}},[t._v("添加")])],1)],1)],1)]),t._v(" "),o("div",{staticStyle:{width:"100%","padding-bottom":"30px"}},[o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[o("el-table-column",{attrs:{label:"信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("a",{attrs:{href:t.tableData[e.$index].url,target:"_blank"}},[t._v(t._s(t.tableData[e.$index].title)+"["+t._s(t.tableData[e.$index].productNo)+"]")])]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"memo",label:"描述",width:"300"}}),t._v(" "),o("el-table-column",{attrs:{prop:"imageUrl",label:"图片",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.imageUrl?o("div",[o("img",{attrs:{src:JSON.parse(e.row.imageUrl)[0].ServerUrl+JSON.parse(e.row.imageUrl)[0].FilePath,alt:""}})]):o("div",[t._v("\n                    未设置\n                ")])]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"salePrice",label:"价格",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.salePrice?o("div",[t._v("\n                  "+t._s(e.row.salePrice)+"\n                ")]):o("div",[t._v("\n                    未设置\n                ")])]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"sort",label:"排序",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.Price?o("el-button",{staticStyle:{border:"0px"},on:{click:function(o){t.ChangePrice(e,this)}}},[o("i",{staticClass:"el-icon-edit"}),t._v(t._s(e.row.sort))]):o("el-input",{staticStyle:{"text-align":"center",border:"0px"},on:{blur:function(o){t.Blur(e)},focus:function(o){t.focus(e)}},model:{value:e.row.sort,callback:function(o){t.$set(e.row,"sort",o)},expression:"scope.row.sort"}})]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"status",label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-switch",{attrs:{"active-color":"#409EFF","inactive-color":"#909399"},on:{change:function(o){t.buttonChange(e.row.status,e)}},model:{value:e.row.status,callback:function(o){t.$set(e.row,"status",o)},expression:"scope.row.status"}})]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"",label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(o){t.edit1(e.row)}}},[t._v("编辑")]),t._v(" "),o("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(o){t.removegood(e.row,e.$index,t.tableData)}}},[t._v("删除")])]}}])})],1),t._v(" "),o("div",{staticClass:"block"},[o("el-pagination",{attrs:{"current-page":t.currentPage4,"page-sizes":[t.limit],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.total1},on:{"current-change":t.handleCurrentChange}})],1)],1)],1)],1),t._v(" "),t.show?o("el-dialog",{staticStyle:{left:"4%","border-top":"1px #fff solid"},attrs:{title:"楼层商品",visible:t.dialogFormVisible1,id:"dl",width:"80%"},on:{"update:visible":function(e){t.dialogFormVisible1=e}}},[o("div",{staticStyle:{width:"50%",float:"left","box-sizing":"border-box"}},[o("el-input",{staticClass:"input-with-select",staticStyle:{width:"50%"},attrs:{placeholder:"标题或编码"},model:{value:t.insertcontent,callback:function(e){t.insertcontent=e},expression:"insertcontent"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(e){t.search()}},slot:"append"})],1),t._v(" "),o("el-table",{ref:"singleTable",staticStyle:{width:"100%",float:"left"},attrs:{data:t.searchtableData,"highlight-current-row":""},on:{"current-change":t.handleCurrentChange1}},[o("el-table-column",{staticStyle:{width:"100%"},attrs:{property:"productNo",label:"信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n     "+t._s(e.row.productName)+"["+t._s(e.row.productNo)+"]\n    ")]}}])}),t._v(" "),o("el-table-column",{staticStyle:{width:"20%"},attrs:{property:"address",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.imageUrl?o("div",[o("img",{staticStyle:{width:"20%"},attrs:{src:e.row.productImg,alt:""}})]):o("div",[t._v("\n                    未设置\n                ")])]}}])})],1),t._v(" "),o("div",{staticClass:"block"},[t.infototal>3?o("el-pagination",{attrs:{"current-page":t.currentPage4,"page-sizes":[t.infolimit],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.infototal},on:{"current-change":t.handleCurrentChangeinfo}}):t._e()],1)],1),t._v(" "),o("div",{staticStyle:{width:"50%",float:"left"}},[o("el-form",{ref:"ModelGood",attrs:{model:t.ModelGood,rules:t.rules}},[o("el-form-item",{attrs:{label:"标题"}},[o("el-input",{model:{value:t.ModelGood.title,callback:function(e){t.$set(t.ModelGood,"title",e)},expression:"ModelGood.title"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"描述"}},[o("el-input",{model:{value:t.ModelGood.memo,callback:function(e){t.$set(t.ModelGood,"memo",e)},expression:"ModelGood.memo"}})],1),t._v(" "),o("el-form-item",{staticClass:"short",attrs:{label:"编码",prop:"productNo"}},[o("el-input",{model:{value:t.ModelGood.productNo,callback:function(e){t.$set(t.ModelGood,"productNo",e)},expression:"ModelGood.productNo"}})],1),t._v(" "),o("el-form-item",{staticClass:"short",attrs:{label:"价格",prop:"salePrice"}},[o("el-input",{model:{value:t.ModelGood.salePrice,callback:function(e){t.$set(t.ModelGood,"salePrice",e)},expression:"ModelGood.salePrice"}})],1),t._v(" "),o("el-form-item",{staticClass:"short",attrs:{label:"排序",prop:"sort"}},[o("el-input",{model:{value:t.ModelGood.sort,callback:function(e){t.$set(t.ModelGood,"sort",e)},expression:"ModelGood.sort"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"连接"}},[[o("div",[o("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.ModelGood.url,callback:function(e){t.$set(t.ModelGood,"url",e)},expression:"ModelGood.url"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-arrow-right"},on:{click:function(e){t.ProductLink()}},slot:"append"})],1)],1)]],2),t._v(" "),o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"图片"}},[[o("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"/server/file","on-success":t.handleSuccess1,"file-list":t.fileList1,"list-type":"picture"}},[o("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),o("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)]],2)],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.cancel()}}},[t._v("取 消")]),t._v(" "),t.show?o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.save()}}},[t._v("保 存")]):o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.comfire()}}},[t._v("确定")])],1)]):o("el-dialog",{attrs:{title:"楼层商品",visible:t.dialogFormVisible1,id:"dl"},on:{"update:visible":function(e){t.dialogFormVisible1=e}}},[o("el-form",{ref:"ModelGood",attrs:{model:t.ModelGood,rules:t.rules}},[o("el-form-item",{attrs:{label:"标题"}},[o("el-input",{model:{value:t.ModelGood.title,callback:function(e){t.$set(t.ModelGood,"title",e)},expression:"ModelGood.title"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"描述"}},[o("el-input",{model:{value:t.ModelGood.memo,callback:function(e){t.$set(t.ModelGood,"memo",e)},expression:"ModelGood.memo"}})],1),t._v(" "),o("el-form-item",{staticClass:"short",attrs:{label:"编码",prop:"productNo"}},[o("el-input",{model:{value:t.ModelGood.productNo,callback:function(e){t.$set(t.ModelGood,"productNo",e)},expression:"ModelGood.productNo"}})],1),t._v(" "),o("el-form-item",{staticClass:"short",attrs:{label:"价格",prop:"salePrice"}},[o("el-input",{model:{value:t.ModelGood.salePrice,callback:function(e){t.$set(t.ModelGood,"salePrice",e)},expression:"ModelGood.salePrice"}})],1),t._v(" "),o("el-form-item",{staticClass:"short",attrs:{label:"排序",prop:"sort"}},[o("el-input",{model:{value:t.ModelGood.sort,callback:function(e){t.$set(t.ModelGood,"sort",e)},expression:"ModelGood.sort"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"连接"}},[[o("div",[o("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.ModelGood.url,callback:function(e){t.$set(t.ModelGood,"url",e)},expression:"ModelGood.url"}},[o("el-button",{attrs:{slot:"append",icon:"el-icon-arrow-right"},on:{click:function(e){t.ProductLink()}},slot:"append"})],1)],1)]],2),t._v(" "),o("el-form-item",{staticStyle:{width:"100%","text-align":"left"},attrs:{label:"图片"}},[[o("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"/server/file","on-success":t.handleSuccess1,"file-list":t.fileList1,"list-type":"picture"}},[o("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),o("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)]],2)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.cancel()}}},[t._v("取 消")]),t._v(" "),t.show?o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.save()}}},[t._v("保 存")]):o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.comfire()}}},[t._v("确定")])],1)],1)],1)},i=[],l={render:a,staticRenderFns:i};e.a=l},mClu:function(t,e,o){var a=o("kM2E");a(a.S+a.F*!o("+E39"),"Object",{defineProperty:o("evD5").f})},mvHQ:function(t,e,o){t.exports={default:o("qkKv"),__esModule:!0}},"nFS+":function(t,e,o){e=t.exports=o("FZ+f")(!1),e.push([t.i,".demo-table-expand label{width:20%}.content{width:84%;-webkit-box-sizing:border-box;box-sizing:border-box}#floor .upload-demo{position:relative;height:160px}#floor .el-upload .el-button{position:absolute;bottom:8px;left:0}#floor .el-upload-list{position:absolute;top:0;left:0}#floor .el-upload__tip{position:absolute;bottom:0;left:120px}.el-upload-list--picture .el-upload-list__item-thumbnail{width:400px}.content{width:88%;margin:0 auto}body .el-date-range-picker,body .el-picker-panel,body .el-popper,element.style{left:200px}.box-card{width:100%}.view-content{width:98%;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto}.el-card__body{display:none}.demo-form-inline .el-form-item{margin-bottom:8px}.cell img{width:80px;height:40px}.block{width:100%;height:40px;line-height:40px;font-size:16px}.el-table__body{margin:0 auto}.view-content .block{width:50%;padding:30px}.ttsearch .el-form-item__content{width:100%}.demo-table-expand{font-size:0}.demo-table-expand label{width:100px;text-align:center;color:#000}.demo-table-expand .el-form-item{width:50%}.el-form-item__content{width:70%}.demo-table-expand .floor{width:100%}.el-upload-list--picture .el-upload-list__item-thumbnail{width:auto}.floor .cell img{height:60px;width:280px}.right .el-form-item__label{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:left;padding-left:40%;height:60px;line-height:60px;font-size:20px;font-weight:600;color:#000}.block{float:left}.right .el-form-item__content{width:100%}.el-form-item__label{color:#000}.floorGoo .el-form-item__content{width:90%}#floor #dl .el-form-item{width:100%}#floor #dl .short{width:48%}#dl .el-form-item__content{width:80%}#floor .demo-table-expand label{width:8%}#floor .demo-table-expand .el-form-item__label{width:90px}#floor #seach .el-form{width:100%}#floor #seach .el-form .el-form-item{width:30%;float:left}a{text-decoration:none;color:#5a5e66}.upload-demo{width:60%}.upload-demo img{width:200px}.el-dialog__body{padding-top:0}#floor .el-upload img{width:2}.cell{text-align:center}.one .el-upload-list--picture .el-upload-list__item-thumbnail{width:250px}#dl .el-input{width:80%}#dl .el-form{padding-left:30px;-webkit-box-sizing:border-box;box-sizing:border-box}.el-dialog__header{height:40px;line-height:40px}.edit .el-tabs__content{border:1px solid #dfe4ed}.aa .el-form-item__content,.aaa .el-form-item__content,.sta .el-form-item__content{width:100%}.floor input{border:0;text-align:center}.el-tabs__content{border:1px solid #ccc}.el-submenu .el-menu-item{min-width:10%}.el-switch{height:23px;line-height:23px}",""])},qkKv:function(t,e,o){var a=o("FeBl"),i=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}}});