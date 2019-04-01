<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="待办事项" prop="name">
        <el-input v-mode="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="事项类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">常规</el-radio>
          <el-radio label="2">紧急</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="提醒方式" prop="way">
        <el-checkbox-group v-model="ruleForm.way">
          <el-checkbox label="短信" name="type"></el-checkbox>
          <el-checkbox label="电话" name="type"></el-checkbox>
          <el-checkbox label="邮件" name="type"></el-checkbox>
          <el-checkbox label="微信" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
       
      <el-form-item label="提醒时间" prop="date">
         <el-time-picker
          v-model="ruleForm.date"
          placeholder="请选择提醒时间">
        </el-time-picker>
      </el-form-item>

      <el-form-item label="重复提醒" prop="delivery">
        <el-switch v-model="ruleForm.delivery"  @change="changeOnOff"></el-switch>
      </el-form-item>

      <el-form-item label="重复时间" :required="redStar" >
        <el-col :span="11">
          <el-form-item prop="startDate">
            <el-date-picker :disabled="forbidden" type="date" placeholder="选择开始日期" 
              v-model="ruleForm.startDate" :picker-options="pickerOptionsStart" style="width: 100%;" 
              @change="startTimeChange">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endDate">
            <el-date-picker :disabled="forbidden" type="date" placeholder="选择结束日期" 
              :picker-options="pickerOptionsOver" @change="endTimeChange"
              v-model="ruleForm.endDate" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="重复周期" prop="period">
        <el-select :disabled="forbidden" :required="redStar" v-model="ruleForm.period" placeholder="选择重复周期">
          <el-option label="每日提醒" value="1"></el-option>
          <el-option label="每周提醒" value="2"></el-option>
          <el-option label="每月提醒" value="3"></el-option>
          <el-option label="工作日提醒" value="4"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="其他信息" prop="other">
        <el-input type="textarea" v-model="ruleForm.other"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
        <el-button @click="resetFrom('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'form',
  data () {
    return {
      period: [
        {required: true, message: '请选择重复周期', trigger: 'change'}
      ],
      starDate: [
        {type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}
      ],
      endDate: [
        {type: 'date', required: true, message: '请选择结束日期', trigger: 'change'}
      ],
      pickerOptionsOver:{
        disableDate(time) {
          return tim.getTime() < 1488297600000 || time.getTime() >= Date.now();
        }
      },
      pickerOptionsStart: {
          disabledDate (time) {
            return time.getTime() < 1488297600000 || time.getTime() >= Date.now();
          }
        },
      formName:false,
      forbidden:true,
      redStar:false,
      ruleForm: {
          name: '',
          type: '',
          way: [],
          date: '',
          period: '',
          starDate: '',
          endDate: '',
          delivery: false,
          other: '',
      },
      rules:{
        name:[
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        type:[
          {required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        way:[
          {type: 'array', required: true, message: '请至少选择一个提醒方式', trigger: 'change' }
        ],
        date:[
          { type: 'date', required: true, message: '请选择提醒时间', trigger: 'change' }
        ],
        period:[],
        starDate:[
          {}
        ],
        endDate:[ ],
        delivery:[],
        other:[
          {required: true, message: '请填写其他信息', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    // this.$http.get("")
    // .then(res => {
    //   console.log(res)
    // })
    // .catch( err => {
    //   console.log(err)
    // })
  },
  methods:{
    onSubmit(formName){
      this.$refs[formName].validate((vaild) => {
        if(vaild){
          let para = Object.assign({},this.ruleForm) //将所有表单里面的内容都合并到para
          console.log(para);
          this.$message({
            message:"提交成功",
            type:"success"
          })
        }else {
          return false;
        }
      })
    },
    getDate(strDate){ //将时间改为 YYYY-MM-DD
      let st = strDate;
      let a = st.split(" ");
      let b = a[0].split("-");
      let date = new Date(b[0],b[1] - 1,b[2]);
      return date;
    },
    //开始时间禁止晚于结束时间
    startTimeChange(val){
      const startTime = this.getDate(val);
      this.pickerOptionsOver ={
        disableDate(time){
          return time.getTime() <= startTime || time.getTime() >= Date.now();
        }
      }
    },
    //开始时间禁止早于结束时间
    endTimeChange(val){
      let endTime = this.getDate(val);
      this.pickerOptionsStart = {
        disableDate(time) {
          return time.getTime() <1488297600000 || time.getTime() >= endTime;
        }
      }
    },
    resetFrom(formName) {
        this.$refs[formName].resetFields();
    },
    changeOnOff(val){
      if(val === true){
        //开启重复提醒功能。给表单添加相应的规则
        this.forbidden = false;
        this.redStar = true;
        this.$set(this.rules, "starDate", this.starDate); //给rules追加属性规则
          this.$set(this.rules, "endDate", this.endDate);
          this.$set(this.rules, "period", this.period);
          this.$refs['ruleForm'].validate();
      } else{
        //关闭提醒功能
        this.forbidden = true;
        this.redStar = false;
        this.$set(this.rules, "starDate", [{type: 'date', required: false, trigger: 'change'}]); //给rules追加属性规则
          this.$set(this.rules, "endDate", [{type: 'date', required: false, trigger: 'change'}]);
          this.$set(this.rules, "period", [{}]);
          this.$refs['ruleForm'].validate();
      }
    },
  }
}
</script>

