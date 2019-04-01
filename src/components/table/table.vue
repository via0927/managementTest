<template>
  <div class="table-contain">
    <el-row>
      <el-col :span="24">
        <!-- 表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input placeholder="姓名" v-model="formInline.user.name" style="width:140px;"></el-input>
          </el-form-item>
          <!-- //时间 -->
          <el-form-item label="年份">
            <el-col>
              <el-date-picker type="year" v-model="formInline.user.date" align="right" placeholder="选择年份"  style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 地址 -->
          <el-form-item label="地址">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="formInline.user.address"
            ></el-cascader>
          </el-form-item>
          <!-- 籍贯 -->
          <el-form-item label="籍贯">
            <el-select v-model="formInline.user.place" clearable placeholder="请选择">
              <el-option
                v-for="item in places"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <a href="javascript:;" id="download" 
            style="background-color:#409EFF;color: #fff;padding: 12px 10px!important;margin-left: 10px!important;border-radius:4px " 
            @click="download()" download="download.csv">导出数据</a>
        </el-form>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            prop="date"
            label="出生日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
      <!-- 修改的弹框 -->
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-date-picker
             v-model="form.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeValue()" :loading="editLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 const ERR_OK = "000";
export default {
  name: 'Table',
  data () {
    return {
      editLoading:false,
      dialogFormVisible:false,
      formInline:{
        user:{
          name:"",
          date:"",
          address:[],
          place:''
        }
      },
      currentPage:4,
      tableData: [],
      places: [],
      options:[],
      form:{
        name:'',
        address:'',
        date:"",
      }
    }
  },
   created () {
      this.$http.get('/api/getTable').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.tableData = response.datas; //请求过来的表单的内容
          console.log(this.tableData);
        }
      });
      this.$http.get('/api/getOptions').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.options = response.datas;  //请求过来的地址的选项
          this.places = response.places;  //请求过来的籍贯的数据
        }
      });
    },
  methods:{
    changeValue(){
      this.$confirm("确认提交吗？","提示",{
        confirmButtonText:"确认",
        concelButtonText:"取消",
        cancelButtonClass:"cancel"
      }).then(() =>{
        this.editLoading = true;
        let date = this.form.date;
        if(typeof date === "object"){
          date = [date.getFullYear(),(date.getMonth()+1),(date.getDate())].join("-");
          this.form.date = date;
        }

        this.tableData.splice(this.table_index,1,this.form);
        this.$message({
          message:"操作成功！",
          type:"success"
        });
        this.editLoading = false;
        this.dialogFormVisible = false;
      }).catch(() =>{

      })
    },
    onSubmit(){
      this.$message("数据模拟，到时候这是一个请求");
    },
    download(){
      // console.log("下载")
      var obj = document.getElementById("download");
      var str = "姓名,出生日期,地址\n";
      for(var i = 0; i < this.tableData.length;i++){
        var item = this.tableData[i];
        str += item.name + ',' + item.date + "," + item.address;
      }
      console.log(obj);
      str = encodeURIComponent(str);
      console.log(str);
      obj.href = "data:text/csv;charset=utf-8,\ufeff"+str;
      obj.download = "download.csv"
    },
    handleDelete (index, row) {
        console.log(index.row,2222);
        alert(1);
        this.tableData.splice(index, 1);
        this.$message({
          message: "操作成功！",
          type: 'success'
        });
      },
      handleEdit (index, row) {
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
        this.table_index = index;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
       handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
  }
}
</script>
<style lang="scss" scoped>

</style>



