<template>
<div style='width:100%;height:auto;padding-top:35px;margin:0 auto;box-sizing:border-box;' class='left'>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class='one'>
    <el-tab-pane label="专题" name="first" >
<div style='width:70%; float:left; padding-top:30px;margin:0 auto;padding-bottom:30px; '>
<el-form   :model="SpecialProject"  class='demo-table-expand' inline >
  <el-form-item label='专题标题' props = 'title' style='width:100%;text-align:left;'>
       <el-input v-model="SpecialProject.title"></el-input>
  </el-form-item>
  <el-form-item label='专题样式' props = 'pageCss' style='width:100%;text-align:left;'>
         <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="SpecialProject.pageCss">
        </el-input>               
  </el-form-item>
  <el-form-item label='有效时间'   style='width:100%;text-align:left;'>
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="datetime"
          value-format='yyyy-MM-dd HH:mm:ss'
           @change="logTimeChange"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div style='float:left;'>至</div>
      <div class="block">
        <el-date-picker
          v-model="value3"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
  </el-form-item>
  <el-form-item label='专题图片'  style='width:100%;text-align:left;'>
    <template>
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='handleSuccess1' :file-list="fileList1" list-type="picture" :on-remove="handleRemove">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>        
    </template>
  </el-form-item>
</el-form>
</div>
 <el-button type="primary" style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;' @click='save1()' v-show='svzt'>保存</el-button>
    </el-tab-pane>
    <el-tab-pane label="楼层" name="second">
<div style='width:100%; padding-top:30px;padding-bottom:30px; '>
<el-form  class='demo-table-expand right' >
    <el-form-item   class='floor' style='text-align:center;'>
      <template slot-scope="scope">
          <el-table :data="floorMess" border style="width: 100%">
    <el-table-column prop="Title" label="楼层标题" width="220">
    </el-table-column>
    <el-table-column prop="TempId" label="楼层模板" width="200">
    </el-table-column>
    <el-table-column prop="Image" label="楼层图片" width='400'>
          <template slot-scope="scope1">
            <div v-if="floorMess[scope1.$index].Image.length == 0">
               未设置
            </div>
            <div v-else>
              <img :src="floorMess[scope1.$index].Image">
            </div>
          </template>
    </el-table-column>
      <el-table-column prop="BgImage" label="背景图片" width='400'>
          <template slot-scope="scope1">
            <div >
              <img :src="floorMess[scope1.$index].BgImage">
            </div>
          </template>
    </el-table-column>
    <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
        <el-button type="primary" @click="up(scope.row,scope)"  size="small">上移</el-button>
        <el-button type="primary"   @click="down(scope.row,scope)"  size="small">下移</el-button>
        <el-button type="primary" @click="edit(scope.row,scope)"  size="small">编辑</el-button>
        <el-button @click="delFloor(scope.row,scope,floorMess)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      </template>     
  </el-form-item>
</el-form>
        <el-button type="primary" @click="addFloor()"  style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;' >添加楼层</el-button>
</div>      
    </el-tab-pane>
    <el-tab-pane label="推荐" name="four">
<div style='width:100%; padding-top:30px;padding-bottom:30px; '>
<el-form  class='demo-table-expand right' >
    <el-form-item   class='floor' style='text-align:center;'>
      <template slot-scope="scope">
          <el-table :data="recomment" border style="width: 100%">
    <el-table-column prop="Title" label="推荐标题" width="220">
    </el-table-column>
    <el-table-column prop="TempId" label="推荐模板" width="200">
    </el-table-column>
    <el-table-column prop="Image" label="推荐图片" width='400'>

            <template slot-scope="scope1">
            <div v-if="recomment[scope1.$index].Image[0]">
 <img :src="recomment[scope1.$index].Image[0].ServerUrl + recomment[scope1.$index].Image[0].FilePath">
            </div>
            <div v-else>
                未设置
            </div>
          </template>
    </el-table-column>
    <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
        <el-button type="primary" @click="TJedit(scope.row,scope)"  size="small">编辑</el-button>
        <el-button @click="delrecom(scope.row,scope,floorMess)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      </template>     
  </el-form-item>
</el-form>
          <el-button type="primary" @click="addRecommont()" style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;'   >添加推荐</el-button>
</div>      
    </el-tab-pane>
    <el-tab-pane label="广告" name="five">
<div style='width:100%; padding-top:30px;padding-bottom:30px; '>
<el-form class="demo-table-expand fl" :inline='true'  :model="floor" >
  <el-form-item label='广告模板' props = 'AdverValue' class='fl' style='width:100%;text-align:left;' v-if='advertConfig[0]'>
      <el-select v-model="AdverValue" placeholder="选择广告模板" style='float:left;'>
        <el-option label="轮播模板" value="1"></el-option>
        <el-option label="垂直模板" value="2"></el-option>
        <el-option label="水平模板" value="3"></el-option>
        <el-option label="嵌套模板" value="4"></el-option>
      </el-select>
  </el-form-item>
  <el-form-item label='广告信息'  style='width:100%;text-align:left;'>
      <template slot-scope="scope">
         <el-form  class='demo-table-expand right' >
    <el-form-item   class='floor' style='text-align:center;'>
      <template slot-scope="scope">
          <el-table :data="advertConfig" border style="width: 100%">
    <el-table-column prop="Title" label="标题" width="220">
      <template slot-scope="scope">
             <a :href="advertConfig[scope.$index].Url" target="_blank">{{advertConfig[scope.$index].Title}}</a>
      </template>
    </el-table-column>
    <el-table-column prop="Image" label="图片" width='400'>
            <template slot-scope="scope1">
              <div v-if='advertConfig[scope1.$index].Image'>
            <img :src="advertConfig[scope1.$index].Image.ServerUrl+advertConfig[scope1.$index].Image.FilePath">
              </div>
            <div v-else>
              未设置
            </div>
          </template>
    </el-table-column>
    <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
        <el-button type="primary" @click="Advertup(scope.row,scope)"  size="small">上移</el-button>
        <el-button type="primary"   @click="Advertdown(scope.row,scope)"  size="small">下移</el-button>
        <el-button type="primary" @click="Advertedit(scope.row,scope)"  size="small">编辑</el-button>
        <el-button @click="delAdvert(scope.row,scope,floorMess)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      </template>     
  </el-form-item>
</el-form>
      </template>  
  </el-form-item>
</el-form>
          <el-button type="primary" @click="AddAdevrt()" style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;'   >添加</el-button>
</div>      
    </el-tab-pane>
    <el-tab-pane label="限量购" name="six">
<div style='width:100%; padding-top:30px;padding-bottom:30px; '>
<el-form  class='demo-table-expand right' >
    <el-form-item   class='floor' style='text-align:center;'>
      <template slot-scope="scope">
          <el-table :data="limit" border style="width: 100%">
    <el-table-column prop="Title" label="推荐标题" width="220">
    </el-table-column>
    <el-table-column prop="TempId" label="推荐模板" width="200">
    </el-table-column>
    <el-table-column prop="Image" label="推荐图片" width='400'>

            <template slot-scope="scope1">
            <div v-if="limit[scope1.$index].Image[0]">
 <img :src="limit[scope1.$index].Image[0].ServerUrl + limit[scope1.$index].Image[0].FilePath">
            </div>
            <div v-else>
                未设置
            </div>
          </template>
    </el-table-column>
    <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
        <el-button type="primary" @click="LIedit(scope.row,scope)"  size="small">编辑</el-button>
        <el-button @click="delLimit(scope.row,scope,floorMess)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      </template>     
  </el-form-item>
</el-form>
          <el-button type="primary" @click="addlimit()" style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;'   >添加</el-button>
</div>      
    </el-tab-pane>
 <el-tab-pane label="商品" name="three" v-if='showshow1'>
<div style="padding-top:35px;" id='floor'>
<el-form class="demo-table-expand fl" :inline='true'  :model="floor" >
  <el-form-item label='楼层标题' props = 'Title' class='fl' style='width:100%;text-align:left;'>
       <el-input v-model="floor.Title" style='width:40%;float:left;' ></el-input>
  </el-form-item>
  <el-form-item label='楼层模板' props = 'value1' class='fl' style='width:100%;text-align:left;'>
      <el-select v-model="value1" placeholder="请选择活动区域" style='float:left;'>
        <el-option label="水平模板" value="1"></el-option>
        <el-option label="垂直模板" value="2"></el-option>
        <el-option label="水平带边距模板" value="3"></el-option>
        <el-option label="垂直带边距模板" value="4"></el-option>
        <el-option label="轮播模板" value="5"></el-option>
        <el-option label="整屏却切换模板" value="6"></el-option>
        <el-option label="产品展示台模板" value="7"></el-option>
        <el-option label="水平三个无边距模板" value="8"></el-option>
        <el-option label="水平三个带边距模板" value="9"></el-option>
      </el-select>
  </el-form-item>
  <el-form-item label='楼层图片' class='file2' props = 'endTime'  style='width:100%;text-align:left;'>
    <template>
      <!-- http://39.108.137.240:8002/server/file -->
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='handleSuccess' :file-list="fileList" list-type="picture">
        <el-button size="small" type="primary" >点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </template>
  </el-form-item>
  <el-form-item label='背景图片' class='file2' props = 'endTime'  style='width:100%;text-align:left;'>
    <template>
      <!-- http://39.108.137.240:8002/server/file -->
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='bghandleSuccess' :file-list="BgFileList" list-type="picture">
        <el-button size="small" type="primary" >点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </template>
  </el-form-item>
  <el-form-item label='广告信息'  v-show='LC' style='width:100%;text-align:left;' v-if="showshow">

      <template slot-scope="scope" >
      <el-select v-model="LcValue" placeholder="请选择广告模板" style='float:left;' v-if='Arr[0]'>
        <el-option label="轮播模板" value="1"></el-option>
        <el-option label="垂直模板" value="2"></el-option>
        <el-option label="水平模板" value="3"></el-option>
        <el-option label="嵌套模板" value="4"></el-option>
      </el-select>
          <el-table :data="Arr" border style="width: 100%">


    <el-table-column prop="Title" label="标题" >
      <template slot-scope="scope">
             <a :href="Arr[scope.$index].Url" target="_blank">{{Arr[scope.$index].Title}}</a>
            
      </template>
    </el-table-column>
    <el-table-column prop="Image" label="图片" width='400'>

            <template slot-scope="scope1">
                    <div v-if='Arr[scope1.$index].Image'>
        <img :src="Arr[scope1.$index].Image.ServerUrl+Arr[scope1.$index].Image.FilePath">
      </div>
                  <div v-else>

          </div>    
          </template>

    </el-table-column>
    <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
        <el-button type="primary" @click="LcAdvup(scope.row,scope)"  size="small">上移</el-button>
        <el-button type="primary"   @click="LcAdvdown(scope.row,scope)"  size="small">下移</el-button>
        <el-button type="primary" @click="Lcedit(scope.row,scope)"  size="small">编辑</el-button>
        <el-button @click="delLc(scope.row,scope,floorMess)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>



      </el-table>
      </template>  


  </el-form-item>
  <el-form-item label='楼层商品' class='file2' props = 'endTime'  style='width:100%;text-align:left;' v-show='showshow'>
     <el-form >  
        <el-form-item  v-show='showshow' style='width:200px;'>
          <el-input v-model="SelectData" placeholder='标题、编码' style='width:200px;'></el-input>
        </el-form-item>
        <el-form-item style='width:100px;' class='aaa'>
            <el-form-item style='width:100%;'>

            <el-select v-model="Status" placeholder="请选择" style='width:100%;' >
              <el-option label="--状态--" value="2"></el-option>
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item> 
        <el-form-item style='text-align:left;width:70px;'  v-show='showshow'>
          <el-button type="primary" @click='Select' size='samll'>查询</el-button>
        </el-form-item> 
        <el-form-item style='text-align:left;width:70px;padding-right:30px;' >
            <el-button type="primary" @click='add()'  v-if='showshow' size='samll'>添加商品</el-button>
        </el-form-item> 
        <el-form-item style='text-align:left;width:70px;' >
          <div v-show="LC">
            <el-button type="primary" @click='LcAddAdevrt'  v-if='showshow' size='samll'>添加广告</el-button>
            </div>
        </el-form-item> 
      </el-form>
  </el-form-item>
 <el-form-item label=' '  class='floor  floorGoo'   style='width:100%;text-align:left;' v-if='showshow'  :sort-change="changesort">
      <template slot-scope="scope">
          <el-table :data="floorGoods" border style="width: 100%">
        <el-table-column  label="信息" >
          <template slot-scope="scope">
            <a :href="floorGoods[scope.$index].url" target="_blank">{{floorGoods[scope.$index].title}}[{{floorGoods[scope.$index].productNo}}]</a>
          </template>
        </el-table-column>     
        <el-table-column prop="memo"  label="描述" width="300">
        </el-table-column>
    <el-table-column prop="imageUrl" label="图片" width='220'>
          <template slot-scope='scope'>
                            <div v-if='scope.row.imageUrl'>
                  <img :src="JSON.parse(scope.row.imageUrl)[0].ServerUrl+JSON.parse(scope.row.imageUrl)[0].FilePath" alt="" style='width:40px;'>
                </div>
                <div v-else>
                    未设置
                </div>
          </template>
    </el-table-column>
        <!-- :sort-method='sortChange' sortable -->
        <el-table-column prop="salePrice"  label="价格" width="100"   >
            <template slot-scope="scope">
                <div v-if='scope.row.salePrice'>
                  {{scope.row.salePrice}}
                </div>
                <div v-else>
                    未设置
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"  width="180" >
            <template slot-scope="scope" style='position:relative;'>
                <div v-if='scope.row.Price'><el-button style='border:1px;' @click="ChangePrice(scope,this)"><i class="el-icon-edit"></i>{{scope.row.sort}}</el-button></div>
                <div v-else >
                   <el-input style='text-align:center;border:1px solid #ccc;border-radius:6px;' v-model='scope.row.sort'  @blur="Blur(scope)" @focus="focus(scope)" ></el-input>
                </div>
             
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
            <el-switch
            v-model="scope.row.status"
            active-color="#409EFF"
            inactive-color="#909399"
              @change="buttonChange(scope.row.status,scope)"
            >
          </el-switch>            
            </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit1(scope.row)"  size="small">编辑</el-button>
            <el-button @click="removegood(scope.row,scope.$index,floorGoods)" type="danger"  size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </template>     
  </el-form-item>
   <el-form-item label='  '  props = 'endTime' style='box-sizing: border-box;width:100%;' >
     <div class="block" >
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[floorGoodLimit]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="floorGoodCount">
    </el-pagination>
  </div>
  </el-form-item>
</el-form>
<div v-if='LC'>
 <el-button type="primary" @click='savefloor()'  style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;' size='samll'>保存</el-button>

</div>
<div v-if='rjFloor'>
 <el-button type="primary" @click='saveTJ()'  style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;' size='samll'>保存推荐</el-button>

</div>
<div v-if='limitFloor'>
 <el-button type="primary" @click='saveLimit()'  style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;' size='samll'>保存</el-button>

</div>
</div>
    </el-tab-pane>
  </el-tabs>
<el-dialog title="楼层商品" :visible.sync="dialogFormVisible1" id="dl" width='80%' v-if='show' style='left:4%;border-top:1px #fff solid;'>
 <div style="width:50%;float:left;box-sizing:border-box;" >
  <el-input placeholder="标题或编码" v-model="insertcontent" class="input-with-select" style='width:50%;'>
    <el-button slot="append" icon="el-icon-search" @click='search()'></el-button>
  </el-input>
<el-table
    ref="singleTable"
    :data="searchtableData"
    highlight-current-row
    @current-change="handleCurrentChange1"
    style="width: 100%;float:left;" >
    <el-table-column
      property="productNo"
      label="信息"
      style='width:100%;'
      >
    <template slot-scope='scope'>
       {{scope.row.productName}}[{{scope.row.productNo}}]
    </template>
    </el-table-column>
    <!-- <el-table-column
      property="shortDesc"
      label="描述"
      style='width:30%;'
     >
    </el-table-column> -->
    <el-table-column
      property="address"
      label="图片"
      style='width:20%;'
      >
          <template slot-scope='scope'>
                            <div v-if='scope.row.imageUrl'>
                  <img :src="scope.row.productImg" alt="" style='width:20%;'>
                </div>
                <div v-else>
                    未设置
                </div>
          </template>
    </el-table-column>
  </el-table>  
		  <div class="block">
		    <el-pagination  v-if="infototal > 3 "  @current-change="handleCurrentChangeinfo"  :current-page="currentPage4" :page-sizes="[infolimit]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="infototal">
		    </el-pagination>
 		 </div>
  </div>
  <div style='width:50%;float:left;'>
  <el-form :model="ModelGood"  :rules="rules" ref='ModelGood'>
    <el-form-item label="标题" >
      <el-input v-model="ModelGood.title" ></el-input>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="ModelGood.memo" ></el-input>
    </el-form-item>
    <el-form-item label="编码" class='short' prop='productNo'>
      <el-input v-model="ModelGood.productNo"></el-input>
    </el-form-item>
    <el-form-item label="价格"  class='short' prop='salePrice'>
      <el-input v-model="ModelGood.salePrice" ></el-input>
    </el-form-item>
    <el-form-item label="排序"   class='short' prop='sort'>
      <el-input v-model="ModelGood.sort" ></el-input>
    </el-form-item>

    <!-- <el-form-item label="状态"  class='short'>
      <el-select v-model="value" placeholder="请选择活动区域">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="连接" >
      <template>
        <div>
          <el-input placeholder="请输入内容"  v-model="ModelGood.url">
            <el-button slot="append" icon="el-icon-arrow-right"  @click="ProductLink()"></el-button>
          </el-input>
        </div>
      </template>
    </el-form-item>    
      <el-upload class="upload-demo" ref="upload" action="/server/file?act=Product" :on-success='GoodshandleSuccess' :file-list="GoodsfileList" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>              
  </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="save()" v-if='show'>保 存</el-button>
    <el-button type="primary" @click="comfire()" v-else>确定</el-button>
  </div>
</el-dialog>

<el-dialog title="楼层商品" :visible.sync="dialogFormVisible1" id="dl" v-else>
  <div >
  <el-form :model="ModelGood"  :rules="rules" ref='ModelGood'>
    <el-form-item label="标题" >
      <el-input v-model="ModelGood.title" ></el-input>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="ModelGood.memo" ></el-input>
    </el-form-item>
    <el-form-item label="编码" class='short' prop='productNo'>
      <el-input v-model="ModelGood.productNo"></el-input>
    </el-form-item>
    <el-form-item label="价格"  class='short' prop='salePrice'>
      <el-input v-model="ModelGood.salePrice" ></el-input>
    </el-form-item>
    <el-form-item label="排序"   class='short' prop='sort'>
      <el-input v-model="ModelGood.sort" ></el-input>
    </el-form-item>
    <el-form-item label="连接" >
      <template>
        <div>
          <el-input placeholder="请输入内容"  v-model="ModelGood.url">
            <el-button slot="append" icon="el-icon-arrow-right"  @click="ProductLink()" ></el-button>
          </el-input>
        </div>
      </template>
    </el-form-item>    
      <el-upload class="upload-demo" ref="upload" action="/server/file?act=Product" :on-success='GoodshandleSuccess' :file-list="GoodsfileList" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>              
  </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="save()" v-if='show'>保 存</el-button>
    <el-button type="primary" @click="comfire()" v-else>确定</el-button>
  </div>
</el-dialog>



<el-dialog title="专题广告" :visible.sync="Advertdialog" id="dl">
  <el-form :model="advertGood"  >
    <el-form-item label="标题" >
      <el-input v-model="advertGood.Title" ></el-input>
    </el-form-item>
    <el-form-item label="链接" >
      <el-input v-model="advertGood.Url" ></el-input>
    </el-form-item>
    <template>
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='AdverthandleSuccess' :file-list="AdvertfileList" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>        
    </template>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="Advertsave()" v-if='show'>保 存</el-button>
    <el-button type="primary" @click="Advertcomfire()" v-else>确定</el-button>
  </div>
</el-dialog>

<el-dialog title="楼层广告" :visible.sync="Lcdialog" id="dl">
  <el-form :model="advertGood"  >
    <el-form-item label="标题" >
      <el-input v-model="advertGood.Title" ></el-input>
    </el-form-item>
    <el-form-item label="链接" >
      <el-input v-model="advertGood.Url" ></el-input>
    </el-form-item>
    <template>
      <!-- http://39.108.137.240:8002 -->
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='AdverthandleSuccess' :file-list="AdvertfileList" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>        
    </template>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="LcAdvertsave()" v-if='show'>保 存</el-button>
    <el-button type="primary" @click="lccomfire()" v-else>确定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script type="text/javascript">
import axios from "axios";
import moment from "moment";
export default {
  data() {
    var checkSort = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var checkSort2 = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var checkSort1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("产品编号不能为空"));
      } else {
        callback();
      }
    };

    return {
      infooffset:0,
      infolimit: 4,
      searchtableData:[],
      infototal:null,
      insertcontent:'',
      LcValue: "1",
      obj: {},
      removeImg: false,
      File: true,
      True: false,
      pic: true,
      Show: true,
      lcshow: true,
      Status: "2",
      showshow: true,
      showshow1: false,
      activeName2: "first",
      Status: "2",
      advertGood: {
        Title: "",
        Url: "",
        Image: null
      },
      value4: "1",
      value2: "",
      sprice: false,
      value3: "",
      value1: "1",
      floorMess: [],
      Arr: [],
      recomment: [],
      advertConfig: [],
      limit:[],
      adVertNum: null,
      advertImage: null,
      bgImageObj:null,
      fileList1: [], //  楼层图片显示的数组
      fileList: [],
      BgFileList:[],
      AdvertfileList: [],
      GoodsfileList: [], //  商品图片显示数组
      AdverValue: "1",
      AdvertOne: {},
      Image: [],
      svzt: true,
      show: true,
      LC: true,
      LCMess: [],
      rjFloor:true,
      limitFloor:true,
      Advertdialog: false,
      Lcdialog: false,
      value: "0",
      ZtValue: "0",
      Image1: [],
      dialogFormVisible1: false,
      sort: "",
      ModelGood: {
        productNo: "",
        title: "",
        memo: "",
        salePrice: "",
        sort: "99",
        status: "",
        url: "https://gdtvshop.weixinmvp.com/Wap/Shop/ProductDetail.aspx?no=",
        relationCode: "",
        relationKind: "specialactivity"
      },
      SelectData: "",
      currentPage4: 0,
      rules: {
        sort: { validator: checkSort, trigger: "blur" },
        salePrice: { validator: checkSort2, trigger: "blur" },
        productNo: { validator: checkSort1, trigger: "blur" }
      }
    };
  },
  watch: {
    infooffset: function() {
      var This = this;
      this.code = this.$route.params.id;
             axios
          .get(
          "/api/getProductInfo?search=" +
            this.insertcontent+
            "&offset=" +
            this.infooffset +
            "&limit=" +
            this.infolimit 
        )
           .then(function(res) {
            if(res.data.rows){
            res.data.rows.map(function(data) {
              if (data.productImage) {
                data.imageUrl = [];
                data.imageUrl.push(JSON.parse(data.productImage)[0]);
                data.productImg =
                  JSON.parse(data.productImage)[0].ServerUrl +
                  JSON.parse(data.productImage)[0].FilePath +
                  ".thumb." +
                  JSON.parse(data.productImage)[0].FileExt;
              }
              
            });
            This.searchtableData = res.data.rows
            }
                This.infototal = res.data.count;

          });
    },
    LcValue: function() {
      this.lcATcomfire();
    },
    AdverValue: function() {
      this.AdvertTcomfire();
    },
    floorGoodOffset: function() {
      var This = this;
      this.$store.dispatch("GetCodeGoods", {
        title: This.SelectData,
        Status: This.Status
      });
    },
    SelectData: function(old) {
      var This = this;
      if (old) {
      } else {
        this.$store.dispatch("GetCodeGoods", {
          title: This.SelectData,
          Status: This.Status
        });
      }
    }
  },
  created() {
    if (sessionStorage.getItem("key")) {
      this.activeName2 = sessionStorage.getItem("key");
    }
    this.$store.dispatch("GetGoods", {
      id: window.location.href.split("/")[5]
    });
  },
  computed: {
    floor: function() {
      if (this.$store.state.floor.Advert) {
        this.Arr = this.$store.state.floor.Advert.Data;
        if (this.$store.state.floor.Advert.TempId) {
          this.LcValue = this.$store.state.floor.Advert.TempId.toString();
        }
      } else {
        this.Arr = [];
      }
      return this.$store.state.floor;
    },
    Advert: function() {},
    floorGoods: function() {
      return this.$store.state.floorGoods;
    },

    floorGoodLimit: function() {
      return this.$store.state.floorGoodLimit;
    },
    floorGoodCount: function() {
      return this.$store.state.floorGoodCount;
    },

    floorGoodOffset() {
      return this.$store.state.floorGoodOffset;
    },

    SpecialProject: function() {
      if (this.$store.state.specitalPorject.recid) {
        this.floorMess = JSON.parse(
          this.$store.state.specitalPorject.navigationConfig
        );
        var arr = [];

        if (this.$store.state.specitalPorject.recommentConfig) {
          arr.push(
            JSON.parse(this.$store.state.specitalPorject.recommentConfig)
          );
          var arr1 = [
            "水平模板",
            "垂直模板",
            "水平带边距模板",
            "垂直带边距模板",
            "轮播模板",
            "整屏却切换模板",
            "产品展示台模板",
            "水平三个无边距模板",
            "水平三个带边距模板"
          ];

          for (var j = 0; j < arr.length; j++) {
            arr[j].TempId = arr1[j];
          }
          this.recomment = arr;
        }
 
        var arr2 = [];

        if (this.$store.state.specitalPorject.limitedConfig) {
          arr2.push(
            JSON.parse(this.$store.state.specitalPorject.limitedConfig)
          );
          var arr1 = [
            "水平模板",
            "垂直模板",
            "水平带边距模板",
            "垂直带边距模板",
            "轮播模板",
            "整屏却切换模板",
            "产品展示台模板",
            "水平三个无边距模板",
            "水平三个带边距模板"
          ];

          for (var j = 0; j < arr2.length; j++) {
            arr2[j].TempId = arr1[j];
          }
          this.limit = arr2;
        } 
        this.fileList1 = [];
        if (this.$store.state.specitalPorject.advertConfig) {
          this.advertConfig = JSON.parse(
            this.$store.state.specitalPorject.advertConfig
          ).Data;
        }
        if (this.$store.state.specitalPorject.advertConfig) {
          if (
            JSON.parse(this.$store.state.specitalPorject.advertConfig).TempId
          ) {
            this.AdverValue = JSON.parse(
              this.$store.state.specitalPorject.advertConfig
            ).TempId.toString();
          }
        }
        if (
          JSON.parse(this.$store.state.specitalPorject.navigationConfig)
            .length > 0
        ) {
          for (var i = 0; i < this.floorMess.length; i++) {
            if (this.floorMess[i].Image.length > 0) {
              if (!this.floorMess[i].Image[0].ServerUrl) {
                var ServerUrl = "http://cms.weixinmvp.com";
                this.floorMess[i].Image =
                  ServerUrl + this.floorMess[i].Image[0].FilePath;
              } else {
                this.floorMess[i].Image =
                  this.floorMess[i].Image[0].ServerUrl +
                  this.floorMess[i].Image[0].FilePath;
              }
            }
            if(this.floorMess[i].BgImage && this.floorMess[i].BgImage.ServerUrl){
            this.floorMess[i].BgImage = this.floorMess[i].BgImage.ServerUrl +
                  this.floorMess[i].BgImage.FilePath;

            }
            var arr = [
              "水平模板",
              "垂直模板",
              "水平带边距模板",
              "垂直带边距模板",
              "轮播模板",
              "整屏却切换模板",
              "产品展示台模板",
              "水平三个无边距模板",
              "水平三个带边距模板"
            ];
            this.floorMess[i].TempId = arr[this.floorMess[i].TempId - 1];
          }
        }
        if (
          JSON.parse(this.$store.state.specitalPorject.thumbnailUrl).length > 0
        ) {
          var file = {};
          file.url =
            JSON.parse(this.$store.state.specitalPorject.thumbnailUrl)[0]
              .ServerUrl +
            JSON.parse(this.$store.state.specitalPorject.thumbnailUrl)[0]
              .FilePath;
          if (this.File) {
            this.fileList1.push(file);
          } else {
            this.fileList1.push(this.obj);
          }
        }
        if (this.$store.state.specitalPorject.startTime) {
          var timestamp = new Date(
            this.$store.state.specitalPorject.startTime
              .split(".")[0]
              .split("T")
              .join(" ")
          );
          this.value2 = timestamp;
        }

        if (this.$store.state.specitalPorject.endTime) {
          var timestamp1 = new Date(
            this.$store.state.specitalPorject.endTime
              .split(".")[0]
              .split("T")
              .join(" ")
          );
          this.value3 = timestamp1;
        }
        return this.$store.state.specitalPorject;
      } else {
        var specitalPorject1 = {
          recid: "",
          title: "",
          startTime: "",
          endTime: "",
          navigationConfig: [],
          pageCss: ""
        };
        this.$store.state.specitalPorject = specitalPorject1;
        return this.$store.state.specitalPorject;
      }
    }
  },
  methods: {
    ProductLink(href){
      var arr = this.ModelGood.url;
      window.open(arr)
    },
    handleCurrentChangeinfo(currentPage){
      this.infooffset = (currentPage - 1) * this.infolimit;
    },
    search() {
      this.currentPage4 = 0
            this.infototal = 0
            this.infooffset = 0 
      var This = this;
      This.searchtableData = [];
      if (this.insertcontent) {
        axios
          .get(
          "/api/getProductInfo?search=" +
            this.insertcontent+
            "&offset=" +
            this.infooffset +
            "&limit=" +
            this.infolimit 
        )
 .then(function(res) {
            if(res.data.rows){
            res.data.rows.map(function(data) {
              if (data.productImage) {
                data.imageUrl = [];
                data.imageUrl.push(JSON.parse(data.productImage)[0]);
                data.productImg =
                  JSON.parse(data.productImage)[0].ServerUrl +
                  JSON.parse(data.productImage)[0].FilePath +
                  ".thumb." +
                  JSON.parse(data.productImage)[0].FileExt;
              }
              
            });
            This.searchtableData = res.data.rows
            }
                This.infototal = res.data.count;

          });
      } else {
        this.insertcontent = "请输入正确的标题或编码";
      }
    },
    handleCurrentChange1(val) {

      // ModelGood: {
      //   productNo: "",
      //   title: "",
      //   memo: "",
      //   salePrice: "",
      //   sort: "99",
      //   status: "",
      //   url: "https://gdtvshop.weixinmvp.com/Wap/Shop/ProductDetail.aspx?no=",
      //   relationCode: "",
      //   relationKind: "specialactivity"
      // },

 if(val){
       this.GoodsfileList  = []
      this.ModelGood.productNo = val.productNo
      this.ModelGood.title = val.productName
      this.ModelGood.memo = val.shortDesc
      this.ModelGood.sort = val.sort
      this.ModelGood.salePrice = val.salePrice
      this.ModelGood.url = "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no="+val.productNo
       this.advertImage = null;
      this.GoodsfileList = [];
      if(val.imageUrl[0]){
      this.advertImage = val.imageUrl[0]
      }
      var obj = {};
      obj.url = val.productImg
      this.GoodsfileList.push(obj);
 }
    },
    up(item, all) {
      var This = this;
      // 交换数组元素
      var swapItems = function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      };
      if (all.$index != 0) {
        var Array = JSON.parse(
          this.$store.state.specitalPorject.navigationConfig
        );
        swapItems(Array, all.$index, all.$index - 1);
        this.$store.state.specitalPorject.navigationConfig = JSON.stringify(
          Array
        );

        axios
          .post("/server/FloorUpdate", {
            RECID: this.$store.state.specitalPorject.recid,
            param: JSON.stringify(Array)
          })
          .then(function(res) {
            This.open3();
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      }
    },
    Advertup(item, all) {
      var This = this;
      // 交换数组元素
      var swapItems = function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      };
      if (all.$index != 0) {
        var Array = this.advertConfig;
        swapItems(Array, all.$index, all.$index - 1);
        var adObj = {};
        adObj.Data = Array;
        adObj.TempId = Number(this.AdverValue);
        var UpdateOjb = {};
        UpdateOjb.advertConfig = JSON.stringify(adObj);
        axios
          .post("/server/UpdateSpecialSubject", {
            RECID: this.$store.state.specitalPorject.recid,
            param: UpdateOjb
          })
          .then(function(res) {
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      }
    },
    LcAdvup(item, all) {
      var This = this;
      // 交换数组元素
      var swapItems = function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      };
      if (all.$index != 0) {
        var Array = this.Arr;
        swapItems(Array, all.$index, all.$index - 1);

        var objArr = JSON.parse(
          this.$store.state.specitalPorject.navigationConfig
        );
        var obj = objArr[this.$store.state.Index];
        obj.Advert.Data = this.Arr;
        axios
          .post("/server/FloorUpdate", {
            RECID: this.$store.state.specitalPorject.recid,
            param: JSON.stringify(objArr)
          })
          .then(function(res) {
            This.open3();
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });

            This.$store.dispatch("GetCodeGoods", {
              title: This.SelectData,
              Status: This.Status
            });
          });
      }
    },
    down(item, all) {
      var This = this;
      var Array = JSON.parse(
        this.$store.state.specitalPorject.navigationConfig
      );
      if (
        all.$index ==
        JSON.parse(this.$store.state.specitalPorject.navigationConfig).length -
          1
      ) {
      } else {
        var swapItems = function(arr, index1, index2) {
          arr[index1] = arr.splice(index2, 1, arr[index1])[0];
          return arr;
        };

        swapItems(Array, all.$index, all.$index + 1);

        this.$store.state.specitalPorject.navigationConfig = JSON.stringify(
          Array
        );
        axios
          .post("/server/FloorUpdate", {
            RECID: this.$store.state.specitalPorject.recid,
            param: JSON.stringify(Array)
          })
          .then(function(res) {
            This.open3();
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      }
    },
    Advertdown(item, all) {
      var This = this;
      var Array = this.advertConfig;
      if (all.$index == this.advertConfig.length - 1) {
      } else {
        var swapItems = function(arr, index1, index2) {
          arr[index1] = arr.splice(index2, 1, arr[index1])[0];
          return arr;
        };

        swapItems(Array, all.$index, all.$index + 1);
        var adObj = {};
        adObj.Data = Array;
        adObj.TempId = Number(this.AdverValue);
        var UpdateOjb = {};
        UpdateOjb.advertConfig = JSON.stringify(adObj);
        axios
          .post("/server/UpdateSpecialSubject", {
            RECID: this.$store.state.specitalPorject.recid,
            param: UpdateOjb
          })
          .then(function(res) {
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      }
    },

    LcAdvdown(item, all) {
      var This = this;
      var Array = this.Arr;
      if (all.$index == this.Arr.length - 1) {
      } else {
        var swapItems = function(arr, index1, index2) {
          arr[index1] = arr.splice(index2, 1, arr[index1])[0];
          return arr;
        };

        swapItems(Array, all.$index, all.$index + 1);
        var adObj = {};
        adObj.Data = Array;
        adObj.TempId = Number(this.AdverValue);
        var UpdateOjb = {};
        UpdateOjb.advertConfig = JSON.stringify(adObj);
      }
    },

    buttonChange(num, item) {
      var num1 = "";
      if (num) {
        num1 = 1;
      } else {
        num1 = 0;
      }

      axios
        .get("/server/Goodstatus?status=" + num1 + "&Id=" + item.row.recid)
        .then(function(res) {});
    },
    changesort() {},
    Select() {
      var This = this;
      this.$store.dispatch("GetCodeGoods", {
        title: This.SelectData,
        Status: This.Status
      });
    },
    handleCurrentChange(currentPage) {
      this.$store.state.floorGoodOffset =
        (currentPage - 1) * this.$store.state.floorGoodLimit;
    },
    ChangePrice(item, This) {
      this.True = false;
      item.row.Price = false;
      var This = this;
      setTimeout(function() {
        if (!This.True) {
          item.row.Price = true;
        }
      }, 1000);
    },
    savefloor() {
      // 修改
      this.showshow = true;
      var This = this;
      if (this.$store.state.Index || this.$store.state.Index == "0") {
        var objArr = JSON.parse(
          this.$store.state.specitalPorject.navigationConfig
        );
        var obj = objArr[this.$store.state.Index];
        obj.Title = this.floor.Title;
        obj.TempId = Number(this.value1);
        if (this.Image1.length > 0) {
          obj.Image = this.Image1;
        }
        if(this.bgImageObj){
          obj.BgImage = this.bgImageObj
        }
        axios
          .post("/server/FloorUpdate", {
            RECID: this.$store.state.specitalPorject.recid,
            param: JSON.stringify(objArr)
          })
          .then(function(res) {
            This.open3();
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      } else {
        //保存
        var obj = {};
        obj.TempId = Number(this.value1);
        obj.Title = this.floor.Title;
        obj.Image = this.Image1;
        obj.Code = this.$store.state.floorCode;
        if (this.$store.state.specitalPorject.navigationConfig.length > 0) {
          this.LCMess = JSON.parse(
            this.$store.state.specitalPorject.navigationConfig
          );
        } else {
          this.LCMess = [];
        }
        this.LCMess.push(obj);
        var Id = null;
        if (this.$store.state.specitalPorject.recid) {
          Id = this.$store.state.specitalPorject.recid;
        } else {
          Id = this.$store.state.recid;
        }
        this.lcshow = false;

        axios
          .post("/server/FloorUpdate", {
            RECID: Id,
            param: JSON.stringify(this.LCMess)
          })
          .then(function(res) {
            This.open3();
            if (This.$store.state.specitalPorject.recid) {
              This.$store.dispatch("GetGoods", {
                id: This.$store.state.specitalPorject.recid
              });
            } else {
              This.$store.dispatch("GetGoods", { id: This.$store.state.recid });
            }
          });
      }
    },
    handleClick(tab) {
      var Num = "first";
      if (tab.index == "1" || tab.index == 0 || tab.index == 2 || tab.index == 3 || tab.index == 4) {
        this.showshow1 = false;
        this.currentPage4 = 0;
      }
      if (tab.index == "1" && this.Show == false) {
      }

      sessionStorage.setItem("key", tab.name);
    },
    handleSuccess(response, flielist) {
      this.fileList = [];
      var file = {};
      file.url = response.ServerUrl + response.FilePath;
      this.fileList.push(file);
      this.Image1 = [];
      this.Image1.push(response);
    },

    add() {
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
      this.searchtableData = [];
      this.insertcontent = ''
      this.infototal = null
      this.show = true;
      this.advertImage = null;
      this.dialogFormVisible1 = true;
      this.GoodsfileList = [];
      this.ModelGood.productNo = "";
      this.ModelGood.title = "";
      this.ModelGood.memo = "";
      this.ModelGood.salePrice = "";
      this.ModelGood.sort = "99";
      this.ModelGood.status = "";
      this.ModelGood.url = "";
      this.ModelGood.imageUrl = null;
      if (this.$store.state.floor.Code) {
        this.ModelGood.relationCode = this.$store.state.floor.Code;
      } else {
        this.ModelGood.relationCode = this.$store.state.floorCode;
      }
      this.ModelGood.kind = "specialactivity";
      if (this.$store.state.specitalPorject) {
        this.ModelGood.relationKind = this.$store.state.specitalPorject.kind;
      }
    },

    save() {
      var This = this;
      this.$refs["ModelGood"].validate(valid => {
        if (valid) {
          this.dialogFormVisible1 = false;
          this.ModelGood.status = this.value;
          if (!this.ModelGood.salePrice) {
            delete this.ModelGood.salePrice;
          }
          if (this.ModelGood.recid) {
            delete this.ModelGood.recid;
          }
          var ARR = [];
          ARR.push(this.advertImage);
          if (ARR[0]) {
            this.ModelGood.imageUrl = JSON.stringify(ARR);
          }
          this.ModelGood.url =
            "https://gdtvshop.weixinmvp.com/Wap/Shop/ProductDetail.aspx?no=" +
            this.ModelGood.productNo;

          axios
            .post("/server/addOne", {
              param: this.ModelGood
            })
            .then(function(res) {
              This.open5();
              let obj = {};
              This.$store.dispatch("GetCodeGoods", {
                title: This.SelectData,
                Status: This.Status
              });
              obj.recid = res.data.recid;
              for (var attr in This.ModelGood) {
                obj[attr] = This.ModelGood[attr];
              }
              if (This.$store.state.floorGoods) {
              } else {
                This.$store.state.floorGoods = [];
              }
              This.$store.state.floorGoods.push(obj);
            });
        } else {
          this.dialogFormVisible1 = true;
          return;
        }
      });
    },
    edit1(item) {
      this.show = false;
      this.Good = item;
      this.dialogFormVisible1 = true;
      this.GoodsfileList = [];
      this.advertImage = null;
      if (item.imageUrl) {
        var ARROBJ = {};
        ARROBJ.url =
          JSON.parse(item.imageUrl)[0].ServerUrl +
          JSON.parse(item.imageUrl)[0].FilePath;
        this.GoodsfileList.push(ARROBJ);
      }
      for (var attr in item) {
        this.ModelGood[attr] = item[attr];
      }
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
    },

    comfire() {
      var This = this;
      this.$refs["ModelGood"].validate(valid => {
        if (valid) {
          this.dialogFormVisible1 = false;
          // this.Good 修改单条数据
          for (var attr in this.ModelGood) {
            this.Good[attr] = this.ModelGood[attr];
          }
          if (this.ModelGood.salePrice) {
          } else {
            delete this.ModelGood.salePrice;
          }
          var ARR = [];
          if (this.advertImage) {
            ARR.push(this.advertImage);
            this.Good.imageUrl = JSON.stringify(ARR);
            this.ModelGood.imageUrl = JSON.stringify(ARR);
          } else {
            this.ModelGood.imageUrl = null;
          }
          if (this.Good.imageUrl) {
            this.ModelGood.imageUrl = this.Good.imageUrl;
          }
          axios
            .post("/server/update", {
              RECID: this.Good.recid,
              param: this.ModelGood
            })
            .then(function(res) {
              This.open4();
              This.GoodsfileList = [];
            });
        } else {
          this.dialogFormVisible1 = true;
          return;
        }
      });
    },
    removegood(item, index, all) {
      var This = this;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          var This = this;
          all.splice(index, 1);
          axios
            .get("/server/deleteOne?RECID=" + item.recid)
            .then(function(res) {
              This.open7();
              This.$store.dispatch("GetCodeGoods", {
                title: This.SelectData,
                Status: This.Status
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          this.advertImage = null;
        });
    },
    sortClick() {},
    logTimeChange(val) {},
    cancel() {
      this.dialogFormVisible1 = false;
      this.Lcdialog = false;
      this.Advertdialog = false;
      this.ModelGood.productNo = "";
      this.ModelGood.title = "";
      this.ModelGood.memo = "";
      this.ModelGood.salePrice = "";
      this.ModelGood.sort = "";
      this.ModelGood.status = "";
      this.ModelGood.url = "";
      this.ModelGood.relationCode = this.$store.state.floor.Code;
      this.ModelGood.kind = "specialactivity";
      this.advertGood.Title = "";
      this.advertGood.Url = "";
      this.advertGood.Image = "";
    },
    ////////////////////////////////////
    edit(item, row) {
      this.LC = true;
      // sessionStorage.setItem("key", "three");
      this.showshow1 = true;
      this.lcshow = true;
      this.rjFloor = false;
      this.limitFloor = false;
      var arr = [
        "水平模板",
        "垂直模板",
        "水平带边距模板",
        "垂直带边距模板",
        "轮播模板",
        "整屏却切换模板",
        "产品展示台模板",
        "水平三个无边距模板",
        "水平三个带边距模板"
      ];
      for (var z = 0; z < arr.length; z++) {
        if (item.TempId == arr[z]) {
          this.value1 = (z + 1).toString();
        }
      }
      this.showshow = true;
      this.activeName2 = "three";
      var This = this;
      this.$store.state.Index = row.$index;
      this.$store.state.floor = item;
      // BgFileList
      this.fileList = [];
      this.BgFileList = [];
      var file = {};
      file.url = this.$store.state.floor.Image;
      this.fileList.push(file);
      if(this.$store.state.floor.BgImage){
      var bgflie = {};
      bgflie.url = this.$store.state.floor.BgImage;
      this.BgFileList.push(bgflie)
      }
      this.$store.state.Code = item.Code;
      this.SelectData = "";
      this.Status = "2";
      this.$store.dispatch("GetCodeGoods", {
        title: This.SelectData,
        Status: This.Status
      });
    },
    TJedit(item, row) {
      // sessionStorage.setItem("key", "three");
      this.LC = false;
      this.rjFloor = true,
      this.limitFloor = false;
      this.showshow1 = true;
      this.lcshow = true;
      var arr = [
        "水平模板",
        "垂直模板",
        "水平带边距模板",
        "垂直带边距模板",
        "轮播模板",
        "整屏却切换模板",
        "产品展示台模板",
        "水平三个无边距模板",
        "水平三个带边距模板"
      ];
      for (var z = 0; z < arr.length; z++) {
        if (item.TempId == arr[z]) {
          this.value1 = (z + 1).toString();
        }
      }
      this.showshow = true;
      this.activeName2 = "three";
      var This = this;
      this.$store.state.Index = row.$index;
      this.$store.state.floor = item;
      this.fileList = [];
      var file = {};
      if (this.$store.state.floor.Image[0]) {
        file.url =
          this.$store.state.floor.Image[0].ServerUrl +
          this.$store.state.floor.Image[0].FilePath;
        this.fileList.push(file);
      }

      this.$store.state.Code = item.Code;
      this.SelectData = "";
      this.Status = "2";
      this.$store.dispatch("GetCodeGoods", {
        title: This.SelectData,
        Status: This.Status
      });
    },
    LIedit(item, row) {
      // sessionStorage.setItem("key", "three");
      this.LC = false;
       this.activeName2 = "three";
      this.showshow1 = true;
      this.lcshow = true;
      this.rjFloor = false,
      this.limitFloor = true;
      var arr = [
        "水平模板",
        "垂直模板",
        "水平带边距模板",
        "垂直带边距模板",
        "轮播模板",
        "整屏却切换模板",
        "产品展示台模板",
        "水平三个无边距模板",
        "水平三个带边距模板"
      ];
      for (var z = 0; z < arr.length; z++) {
        if (item.TempId == arr[z]) {
          this.value1 = (z + 1).toString();
        }
      }
      this.showshow = true;
      var This = this;
      this.$store.state.Index = row.$index;
      this.$store.state.floor = item;
      this.fileList = [];
      var file = {};
      if (this.$store.state.floor.Image[0]) {
        file.url =
          this.$store.state.floor.Image[0].ServerUrl +
          this.$store.state.floor.Image[0].FilePath;
        this.fileList.push(file);
      }

      this.$store.state.Code = item.Code;
      this.SelectData = "";
      this.Status = "2";
      this.$store.dispatch("GetCodeGoods", {
        title: This.SelectData,
        Status: This.Status
      });
    },
    handleSuccess1(response, filelist1) {
      this.fileList1 = [];
      this.File = false;
      this.Image = [];
      this.Image.push(response);

      this.obj.url = response.ServerUrl + response.FilePath;
      this.fileList1.push(this.obj);
      this.removeImg = false;
    },
    addFloor() {
      // sessionStorage.setItem("key", "three");
      this.lcshow = true;
      this.showshow = false;
      this.rjFloor = false;
      this.limitFloor = false;
      this.fileList = [];
      this.$store.state.floorGoodCount = 0;
      for (var attr1 in this.$store.state.floor) {
        this.$store.state.floor[attr1] = "";
      }
      var This = this;
      this.$store.state.floorGoods = null;
      axios.get("/server/UuId").then(function(res) {
        This.$store.state.floorCode = res.data;
        This.$store.state.Code = res.data;
      });
      this.$store.state.Index = "";
      this.showshow1 = true;
      this.activeName2 = "three";
    },
    delFloor(item, row, all) {
      var This = this;
      this.$confirm("此操作将永久删除楼, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          var FloorArr = JSON.parse(
            this.$store.state.specitalPorject.navigationConfig
          );
          FloorArr.splice(row.$index, 1);
          axios
            .get("/server/DelFloorCode?GoodCode=" + item.Code)
            .then(function(res) {});
          axios
            .post("/server/FloorUpdate", {
              RECID: this.$store.state.specitalPorject.recid,
              param: JSON.stringify(FloorArr)
            })
            .then(function(res) {
              This.$store.dispatch("GetGoods", {
                id: This.$store.state.specitalPorject.recid
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delLimit(item, row, all) {
      var This = this;
      this.$confirm("此操作将永久删除楼, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
           this.limit = null
            this.$store.state.specitalPorject.limitedConfig = null
          axios
            .get("/server/DelFloorCode?GoodCode=" + item.Code)
            .then(function(res) {});
          axios
            .post("/server/LimitUpdate", {
              RECID: this.$store.state.specitalPorject.recid,
              param: this.$store.state.specitalPorject
            })
            .then(function(res) {
              This.$store.dispatch("GetGoods", {
                id: This.$store.state.specitalPorject.recid
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delrecom(item, row, all) {
      var This = this;
      this.$confirm("此操作将永久删除楼, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.recomment = null
            this.$store.state.specitalPorject.recommentConfig = null
          axios
            .get("/server/DelFloorCode?GoodCode=" + item.Code)
            .then(function(res) {});
          axios
            .post("/server/LimitUpdate", {
              RECID: this.$store.state.specitalPorject.recid,
              param: this.$store.state.specitalPorject
            })
            .then(function(res) {
              This.$store.dispatch("GetGoods", {
                id: This.$store.state.specitalPorject.recid
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    FBack() {
      this.$router.push({ name: "Home" });
    },
    open1() {
      this.$notify({
        title: "成功",
        message: "专题添加成功",
        type: "success"
      });
    },
    open2() {
      this.$notify({
        title: "成功",
        message: "专题修改成功",
        type: "success"
      });
    },
    open3() {
      this.$notify({
        title: "成功",
        message: "楼层添加成功",
        type: "success"
      });
    },
    open4() {
      this.$notify({
        title: "成功",
        message: "商品修改成功",
        type: "success"
      });
    },
    open5() {
      this.$notify({
        title: "成功",
        message: "商品添加成功",
        type: "success"
      });
    },
    open6() {
      this.$notify({
        title: "成功",
        message: "商品修改成功",
        type: "success"
      });
    },
    open7() {
      this.$notify({
        title: "成功",
        message: "商品删除成功",
        type: "success"
      });
    },
    open(a, b) {
      this.$notify({
        title: a,
        message: b,
        type: "success"
      });
    },
    err(a, b) {
      this.$notify.error({
        title: a,
        message: b
      });
    },
    Blur(item) {
      var This = this;
      if (isNaN(item.row.sort)) {
        this.err("失败", "不能包含字母，请重新输入");
      } else {
        if (this.sort != item.row.sort) {
          axios
            .post("/server/update", {
              RECID: this.Good.recid,
              param: {
                sort: this.Good.sort
              }
            })
            .then(function(res) {
              This.open("成功", "排序修改成功");
              item.row.Price = true;
            });
        }
        item.row.Price = true;
      }
    },
    focus(item) {
      this.Good = item.row;
      this.sort = item.row.sort;
      this.True = true;
    },
    handleRemove() {
      this.removeImg = true;
    },
    sortChange(a, b) {
      // let oldTime = new Date(a.date).getTime() / 1000;
      // let newime = new Date(b.date).getTime() / 1000;
      // if (oldTime - newime > 0) {
      //   // console.log(b.date)
      //   return true;
      // } else {
      //   console.log(b.date);
      //   return false;
      // }
      // console.log(b.length)
      //   // console.log(a)
      //   // console.log(b);
      //   function bubbleSort(arr) {
      //     var len = arr.length;
      //     for (var i = 0; i < len; i++) {
      //       for (var j = 0; j < len - 1 - i; j++) {
      //         if (arr[j].salePrice > arr[j + 1].salePrice) {
      //           //相邻元素两两对比
      //           var temp = arr[j + 1]; //元素交换
      //           arr[j + 1] = arr[j];
      //           arr[j] = temp;
      //         }
      //       }
      //     }
      //     return arr;
      //   }
      //   function bubbleSort1(arr) {
      //     var len = arr.length;
      //     for (var i = 0; i < len; i++) {
      //       for (var j = 0; j < len - 1 - i; j++) {
      //         if (arr[j].salePrice < arr[j + 1].salePrice) {
      //           //相邻元素两两对比
      //           var temp = arr[j + 1]; //元素交换
      //           arr[j + 1] = arr[j];
      //           arr[j] = temp;
      //         }
      //       }
      //     }
      //     return arr;
      //   }
      //   // console.log(this.floorGoods);
      //   for(var i = 0;i<this.floorGoods.length;i++){
      //     // console.log(Number(this.floorGoods[i].salePrice))
      //     if(b.length > 7){
      //      bubbleSort(this.floorGoods)
      //      console.log(111)
      //     }else{
      //        bubbleSort1(this.floorGoods)
      //        console.log(222)
      //     }
      //   }
    },
    save1() {
      this.$store.state.show = "true";
      var This = this;
      if (this.$store.state.specitalPorject.recid) {
        var obj = {};
        if (this.Image.length > 0) {
          obj.TempId = Number(this.value);
          obj.title = this.SpecialProject.title;
          obj.thumbnailUrl = JSON.stringify(this.Image);
          obj.startTime = this.value2;
          obj.pageCss = this.SpecialProject.pageCss;
          obj.endTime = this.value3;
        } else {
          obj.status = this.value;
          obj.title = this.SpecialProject.title;
          obj.pageCss = this.SpecialProject.pageCss;
          // obj.startTime = moment(this.value2).add(8, "h");
          // obj.endTime = moment(this.value3).add(8, "h");
           obj.startTime = this.value2;
           obj.endTime = this.value3;
        }
        if (this.removeImg) {
          obj.thumbnailUrl = "[]";
        }
obj.status = this.$store.state.specitalPorject.status;
        axios
          .post("/server/UpdateSpecialSubject", {
            RECID: this.$store.state.specitalPorject.recid,
            param: obj
          })
          .then(function(res) {
            This.GoodsfileList = [];
            This.open2();
          });
      } else {
        var obj = {};
        obj.status = this.ZtValue;
        obj.title = this.SpecialProject.title;
        obj.thumbnailUrl = JSON.stringify(this.Image);
        obj.startTime = this.value2;
        obj.endTime = this.value3;
        obj.pageCss = this.SpecialProject.pageCss;
        obj.navigationConfig = "[]";
        obj.kind = "specialactivity";
        var Time = new Date();
        obj.createDate = Time;
        obj.updateDate = Time;
        if (this.removeImg) {
          obj.thumbnailUrl = "[]";
        }
        axios
          .post("/server/creatSpecialSubject", { param: obj })
          .then(function(res) {
            This.$store.state.recid = res.data.recid;
            This.$store.state.specitalPorject.recid = res.data.recid;
            This.open1();
          });
      }
    },
    AddAdevrt() {
      this.Image = null;
      this.show = true;
      this.Advertdialog = true;
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
    },
    Advertedit(item, row) {
      this.adVertNum = row.$index;
      for (var att in item) {
        this.AdvertOne[att] = item[att];
      }
      this.show = false;
      this.advertImage = item.Image;
      this.AdvertfileList = [];
      if (item.Image) {
        var AdvertObj = {};
        AdvertObj.url = item.Image.ServerUrl + item.Image.FilePath;
        this.AdvertfileList.push(AdvertObj);
      }
      var objObj = {};
      for (var attr in item) {
        objObj[attr] = item[attr];
      }
      this.advertGood.Title = objObj.Title;
      this.advertGood.Url = objObj.Url;
      this.advertGood.Image = this.advertImage;
      this.Advertdialog = true;
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
    },
    bghandleSuccess(request) {
      this.BgImage = [];
      var obj = {};
      this.BgFileList = [];
      obj.url = request.ServerUrl + request.FilePath;
      this.BgFileList.push(obj);
      this.bgImageObj = request;
    },
    AdverthandleSuccess(request) {
      this.AdvertfileList = [];
      var obj = {};
      obj.url = request.ServerUrl + request.FilePath;
      this.AdvertfileList.push(obj);
      this.advertImage = request;
    },
    Advertcomfire() {
      var This = this;
      this.advertGood.Image = this.advertImage;
      this.AdvertOne.Image = this.advertImage;
      this.Advertdialog = false;
      this.advertConfig[this.adVertNum] = this.advertGood;

      var adObj = {};
      adObj.Data = this.advertConfig;
      adObj.TempId = Number(this.AdverValue);
      var UpdateOjb = {};
      UpdateOjb.advertConfig = JSON.stringify(adObj);
      axios
        .post("/server/UpdateSpecialSubject", {
          RECID: this.$store.state.specitalPorject.recid,
          param: UpdateOjb
        })
        .then(function(res) {
          This.$store.dispatch("GetGoods", {
            id: This.$store.state.specitalPorject.recid
          });
        });
    },
    AdvertTcomfire() {
      var This = this;
      var adObj = {};
      adObj.Data = this.advertConfig;
      adObj.TempId = Number(this.AdverValue);
      var UpdateOjb = {};
      UpdateOjb.advertConfig = JSON.stringify(adObj);
      axios
        .post("/server/UpdateSpecialSubject", {
          RECID: this.$store.state.specitalPorject.recid,
          param: UpdateOjb
        })
        .then(function(res) {
          This.$store.dispatch("GetGoods", {
            id: This.$store.state.specitalPorject.recid
          });
        });
    },

    Advertsave() {
      var This = this;
      this.Advertdialog = false;
      if (this.advertImage) {
        this.advertGood.Image = this.advertImage;
      }
      this.advertConfig.push(this.advertGood);
      var adObj = {};
      adObj.Data = this.advertConfig;
      adObj.TempId = Number(this.AdverValue);
      var UpdateOjb = {};
      UpdateOjb.advertConfig = JSON.stringify(adObj);
      axios
        .post("/server/UpdateSpecialSubject", {
          RECID: this.$store.state.specitalPorject.recid,
          param: UpdateOjb
        })
        .then(function(res) {
          This.$store.dispatch("GetGoods", {
            id: This.$store.state.specitalPorject.recid
          });
        });
    },
    delAdvert(item, row, all) {
      var This = this;
      this.$confirm("此操作将永久删除楼, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.advertConfig.splice(row.$index, 1);
          var adObj = {};
          adObj.Data = this.advertConfig;
          adObj.TempId = Number(this.AdverValue);
          var UpdateOjb = {};
          UpdateOjb.advertConfig = JSON.stringify(adObj);
          axios
            .post("/server/UpdateSpecialSubject", {
              RECID: this.$store.state.specitalPorject.recid,
              param: UpdateOjb
            })
            .then(function(res) {
              This.$store.dispatch("GetGoods", {
                id: This.$store.state.specitalPorject.recid
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    Lcedit(item, row) {
      this.adVertNum = row.$index;
      var OB = {};
      for (var att in item) {
        OB[att] = item[att];
      }
      this.AdvertOne = OB;
      this.show = false;
      this.advertImage = item.Image;
      this.AdvertfileList = [];
      if (item.Image) {
        var AdvertObj = {};
        AdvertObj.url = item.Image.ServerUrl + item.Image.FilePath;
        this.AdvertfileList.push(AdvertObj);
      }
      var objObj = {};
      for (var attr in item) {
        objObj[attr] = item[attr];
      }
      for (var a in objObj) {
        this.advertGood[a] = objObj[a];
      }
      this.advertGood.Image = this.advertImage;
      this.Lcdialog = true;
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
    },
    lccomfire() {
      var This = this;

      this.advertGood.Image = this.advertImage;
      this.AdvertOne.Image = this.advertImage;
      this.Advertdialog = false;
      var sj = {};
      for (var attr in this.advertGood) {
        sj[attr] = this.advertGood[attr];
      }

      this.Arr[this.adVertNum] = sj;
      this.Lcdialog = false;
      var objArr = JSON.parse(
        this.$store.state.specitalPorject.navigationConfig
      );
      var obj = objArr[this.$store.state.Index];
      obj.Advert.Data = this.Arr;
      obj.Advert.TempId = Number(this.LcValue);
      axios
        .post("/server/FloorUpdate", {
          RECID: this.$store.state.specitalPorject.recid,
          param: JSON.stringify(objArr)
        })
        .then(function(res) {
          This.open3();
          This.$store.dispatch("GetGoods", {
            id: This.$store.state.specitalPorject.recid
          });

          This.$store.dispatch("GetCodeGoods", {
            title: This.SelectData,
            Status: This.Status
          });
        });
    },
    lcATcomfire() {
      var This = this;
      var objArr = JSON.parse(
        this.$store.state.specitalPorject.navigationConfig
      );

      if (this.$store.state.Index) {
        var objArr = JSON.parse(
          this.$store.state.specitalPorject.navigationConfig
        );
        var obj = objArr[this.$store.state.Index];
      } else {
        var objArr = this.LCMess;
        var obj = objArr[this.LCMess.length - 1];
      }
      if (obj.Advert) {
        obj.Advert.TempId = Number(this.LcValue);
      } else {
        obj.Advert = {};
        obj.Advert.TempId = Number(this.LcValue);
      }
      axios
        .post("/server/FloorUpdate", {
          RECID: this.$store.state.specitalPorject.recid,
          param: JSON.stringify(objArr)
        })
        .then(function(res) {
          This.$store.dispatch("GetGoods", {
            id: This.$store.state.specitalPorject.recid
          });

          This.$store.dispatch("GetCodeGoods", {
            title: This.SelectData,
            Status: This.Status
          });
        });
    },
    delLc(item, row, all) {
      var This = this;
      this.$confirm("此操作将永久删除楼, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          var objArr = JSON.parse(
            this.$store.state.specitalPorject.navigationConfig
          );
          var obj = objArr[this.$store.state.Index];
          obj.Advert.Data = this.Arr;
          obj.Advert.Data.splice(row.$index, 1);
          axios
            .post("/server/FloorUpdate", {
              RECID: this.$store.state.specitalPorject.recid,
              param: JSON.stringify(objArr)
            })
            .then(function(res) {
              This.open3();
              This.$store.dispatch("GetGoods", {
                id: This.$store.state.specitalPorject.recid
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    LcAddAdevrt() {
      this.Image = null;
      this.show = true;
      this.Lcdialog = true;
      this.AdvertfileList = [];
      this.advertImage = null;
      this.advertGood.Title = "";
      this.advertGood.Url = "";
      this.advertGood.Image = "";
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
    },
    LcAdvertsave() {
      this.Lcdialog = false;
      var This = this;
      var obj = null;
      this.Advertdialog = false;
      if (this.advertImage) {
        this.advertGood.Image = this.advertImage;
      }
      if (this.$store.state.Index || this.$store.state.Index == 0) {
        var objArr = JSON.parse(
          this.$store.state.specitalPorject.navigationConfig
        );
         obj = objArr[this.$store.state.Index];
      } else {
        var objArr = this.LCMess;
         obj = this.LCMess[this.LCMess.length - 1];
      }
      if (!obj.Advert) {
        obj.Advert = {};
      }
      obj.Advert.Data = this.Arr;
      obj.Advert.TempId = this.LcValue;

      var sj = {};
      for (var attr in this.advertGood) {
        sj[attr] = this.advertGood[attr];
      }

      obj.Advert.Data.push(sj);
      axios
        .post("/server/FloorUpdate", {
          RECID: this.$store.state.specitalPorject.recid,
          param: JSON.stringify(objArr)
        })
        .then(function(res) {
          This.open3();
          This.$store.dispatch("GetGoods", {
            id: This.$store.state.specitalPorject.recid
          });
          This.$store.dispatch("GetCodeGoods", {
            title: This.SelectData,
            Status: This.Status
          });
        });
    },
    
    addlimit() {
      this.LC = false;
      this.rjFloor = false;
      this.limitFloor = true;
      // sessionStorage.setItem("key", "three");
      this.lcshow = true;
      this.showshow = false;
      this.fileList = [];
      this.$store.state.floorGoodCount = 0;
      for (var attr1 in this.$store.state.floor) {
        this.$store.state.floor[attr1] = "";
      }
      var This = this;
      this.$store.state.floorGoods = null;
      axios.get("/server/UuId").then(function(res) {
        This.$store.state.floorCode = res.data;
        This.$store.state.Code = res.data;
      });
      this.$store.state.Index = "";
      this.showshow1 = true;
      this.activeName2 = "three";
    },
    addRecommont() {
      this.LC = false;
      this.rjFloor = true;
      this.limitFloor = false;
      // sessionStorage.setItem("key", "three");
      this.lcshow = true;
      this.showshow = false;
      this.fileList = [];
      this.$store.state.floorGoodCount = 0;
      for (var attr1 in this.$store.state.floor) {
        this.$store.state.floor[attr1] = "";
      }
      var This = this;
      this.$store.state.floorGoods = null;
      axios.get("/server/UuId").then(function(res) {
        This.$store.state.floorCode = res.data;
        This.$store.state.Code = res.data;
      });
      this.$store.state.Index = "";
      /////
      this.showshow1 = true;
      this.activeName2 = "three";
      //////
      // this.$router.push({name:'floor'})
    },
    saveTJ() {
      // 修改
      this.showshow = true;
      var This = this;
      // this.DataShow = true
      if (this.$store.state.Index || this.$store.state.Index == "0") {

        var objArr = JSON.parse(
          this.$store.state.specitalPorject.recommentConfig
        );

        objArr.Title = this.floor.Title;
        objArr.TempId = Number(this.value1);
        if (this.Image1.length > 0) {
          objArr.Image = this.Image1;
        }

        var UpdateOjb = {};
        UpdateOjb.recommentConfig = JSON.stringify(objArr);
        axios
          .post("/server/UpdateSpecialSubject", {
            RECID: this.$store.state.specitalPorject.recid,
            param: UpdateOjb
          })
          .then(function(res) {
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      } else {
        var obj = {};
        obj.TempId = Number(this.value1);
        obj.Title = this.floor.Title;
        obj.Image = this.Image1;
        obj.Code = this.$store.state.floorCode;
        var Id = null;
        if (this.$store.state.specitalPorject.recid) {
          Id = this.$store.state.specitalPorject.recid;
        } else {
          Id = this.$store.state.recid;
        }
        this.lcshow = false;
        var UpdateOjb = {};
        UpdateOjb.recommentConfig = JSON.stringify(obj);
        axios
          .post("/server/UpdateSpecialSubject", {
            RECID: this.$store.state.specitalPorject.recid,
            param: UpdateOjb
          })
          .then(function(res) {
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      }
    },
    saveLimit() {
      // 修改
      this.showshow = true;
      var This = this;
      if (this.$store.state.Index || this.$store.state.Index == "0") {

        var objArr = JSON.parse(
          this.$store.state.specitalPorject.limitedConfig
        );

        objArr.Title = this.floor.Title;
        objArr.TempId = Number(this.value1);
        if (this.Image1.length > 0) {
          objArr.Image = this.Image1;
        }

        var UpdateOjb = {};
        UpdateOjb.limitedConfig = JSON.stringify(objArr);
        axios
          .post("/server/UpdateSpecialSubject", {
            RECID: this.$store.state.specitalPorject.recid,
            param: UpdateOjb
          })
          .then(function(res) {
                This.open('成功', '修改成功')
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      } else {
        var obj = {};
        obj.TempId = Number(this.value1);
        obj.Title = this.floor.Title;
        obj.Image = this.Image1;
        obj.Code = this.$store.state.floorCode;
        var Id = null;
        if (this.$store.state.specitalPorject.recid) {
          Id = this.$store.state.specitalPorject.recid;
        } else {
          Id = this.$store.state.recid;
        }
        this.lcshow = false;
        var UpdateOjb = {};
        UpdateOjb.limitedConfig = JSON.stringify(obj);
        axios
          .post("/server/UpdateSpecialSubject", {
            RECID: this.$store.state.specitalPorject.recid,
            param: UpdateOjb
          })
          .then(function(res) {
             This.open('成功', '修改成功')
            This.$store.dispatch("GetGoods", {
              id: This.$store.state.specitalPorject.recid
            });
          });
      }
    },
    // 商品图片上传成功回调函数
    GoodshandleSuccess(request) {
      this.GoodsfileList = [];
      var obj = {};
      obj.url = request.ServerUrl + request.FilePath;
      this.GoodsfileList.push(obj);
      this.advertImage = request;
    }
  }
};
</script>
<style type="text/css">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  text-align: center;
  color: black;
}
.demo-table-expand .el-form-item {
  width: 50%;
}
.el-form-item__content {
  width: 70%;
}
.demo-table-expand .floor {
  width: 100%;
}
.el-upload-list--picture .el-upload-list__item-thumbnail {
  width: auto;
}
.right .el-form-item__label {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding-left: 40%;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  font-weight: 600;
  color: black;
}
.block {
  float: left;
}
.right .el-form-item__content {
  width: 100%;
}
.el-form-item__label {
  color: black;
}
.floorGoo .el-form-item__content {
  width: 90%;
}
#floor #dl .el-form-item {
  width: 100%;
}
#floor #dl .short {
  width: 48%;
}
#dl .el-form-item__content {
  width: 80%;
}
#floor .demo-table-expand label {
  width: 8%;
}
#floor .demo-table-expand .el-form-item__label {
  width: 90px;
}

#floor #seach .el-form {
  width: 100%;
}

#floor #seach .el-form .el-form-item {
  width: 30%;
  float: left;
}
a {
  text-decoration: none;
  color: #5a5e66;
}
.upload-demo {
  width: 60%;
}
.upload-demo img {
  width: 200px;
}

.el-dialog__body {
  padding-top: 0;
  overflow:hidden;
}
#floor .el-upload img {
  width: 2;
}

.cell {
  text-align: center;
}
.one .el-upload-list--picture .el-upload-list__item-thumbnail {
  width: 250px;
}

#dl .el-input {
  width: 80%;
}
#dl .el-form {
  padding-left: 30px;
  box-sizing: border-box;
}
.el-dialog__header {
  height: 40px;
  line-height: 40px;
}
.edit .el-tabs__content {
  border: 1px solid #dfe4ed;
}
.aa .el-form-item__content {
  width: 100%;
}
.aaa .el-form-item__content {
  width: 100%;
}
.sta .el-form-item__content {
  width: 100%;
}
.floor input {
  border: 0px;
  text-align: center;
}
.el-submenu .el-menu-item {
  min-width: 10%;
}
.el-tabs__content {
  min-height: 600px;
}
.el-upload-list--picture
  .el-upload-list__item.is-success
  .el-upload-list__item-name {
  display: none;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
a {
  text-decoration: none;
  color: #5a5e66;
}
.cell img {
  width: 200px;
}
</style>
