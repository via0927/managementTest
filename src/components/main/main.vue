<template>
    <el-container>
  <el-header>后台管理系统</el-header>
  <el-container>
    <el-aside width="200px" >
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
        >
           <el-menu-item index="1" @click="goIndex()">
                <i class="el-icon-menu"></i>
                <span slot="title">index</span>
            </el-menu-item>
            <el-menu-item index="2"  @click="goTable()">
                <i class="el-icon-menu"></i>
                <span slot="title">table</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goFrom()">
                <i class="el-icon-document"></i>
                <span slot="title">from</span>
            </el-menu-item>
            <el-menu-item index="4" @click="goEditor()">
                <i class="el-icon-setting"></i>
                <span slot="title">editor</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
    name:"Main",
    data(){
        return {

        }
    },
    methods:{
        goIndex(){
            this.$router.push({name:'index'})
        },
        goTable(){
            this.$router.push({name:'table'})
        },
        goFrom(){
          this.$router.push({name:'form'})
        },
        goEditor(){
          this.$router.push({name:'editor'})
        }
    }
}
</script>

<style scoped>
html{
    padding: 0;
    margin: 0;
}
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #fff;
    text-align: center;
    line-height: 100px;
    /* height: 100px; */
    background: #20a0ff;
    height: 100px !important;
    font-size: 24px;
  }
  
    .el-aside {
    /* background-color: #000; */
    color: #333;
    text-align: center;
    line-height: 200px;
    width: 300px !important;
  }
  
  .el-main {
    position: absolute;
    padding: 40px;
    /* margin-left: 300px; */
    background-color: #f2f2f2;
    color: #333;
    /* width: 100%; */
    top: 100px;
    bottom: 0;
    left: 300px;
    right: 0;
    /* left: 0; */
    /* text-align: center; */
    /* line-height: 160px; */
  }
  
  body > .el-container {
    /* margin-bottom: 40px; */
  }
  
</style>