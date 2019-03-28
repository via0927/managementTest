<template>
    <div class="container">
        <div class="index-title">
            <span>今日系统安全指数：</span>
            <el-rate v-model="value1" show-text class="starts"></el-rate>
        </div>
        <div class="index-contain">
             <v-charts></v-charts>
        </div>
    </div>
</template>
<script>
import charts from './echarts.vue';
export default {
    name: 'Index',
    data(){
        return {
            value1:null
        }
    },
    components:{
        'v-charts': charts
    }
}
</script><style lang="scss" scoped>
    *{
        padding: 0;
        margin: 0;

    }
    body{
        // background: rebeccapurple;
    }
  .container{
    //   background: red;
      width: 100%;
      height: 100%;
  }
  .index-title{
      background: #fff;
      height: 60px;
      line-height: 60px;
      span{
          padding-left: 10px;
          margin: 0;
          display: inline-block;
        //   width: 100px;
      }
      .starts{
          display: inline;
      }
  }
  .index-contain{

  }
</style>


