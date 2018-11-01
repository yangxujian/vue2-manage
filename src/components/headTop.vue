<template>
  <div class="header_container">
    <el-row style="margin:0 10px;">
      <el-col :span="6" class='logo'>
        <img src="../images/logo.png" alt="">
        <span class='title'>优觉后台管理系统</span>
      </el-col>
    </el-row>
    <div class="header_right">
      <theme-picker></theme-picker>
      <el-dropdown @command="handleCommand" placement='start'>
        <img src="https://elm.cangdu.org/img/default.jpg" class="avator">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="singout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
    import themePicker from 'src/components/themePicker'
    export default {
        data(){
          return{

          }
        },
        components: {
      		themePicker,
      	},
        //实例创建后调用
        created() {
            // `this` 指向 vm 实例
        },
        //定义函数
        methods:{
          handleCommand(command) {
          	if (command == 'home') {
          		this.$router.push('/manage');
          	}else if(command == 'singout'){
          		console.log(111)
            }
          },
        },
    }
</script>

<style lang='scss' scoped>
  .header_container{
    width: 100%;
    height: 60px;
    // min-width:960px;
    padding: 5px;
    background: #324057;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    color: #fff;
    border-bottom: 1px solid #1F2D3D;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 60px;
    .logo{
      min-width: 400px;
      margin-left: 10px;
      img{
        height: 50px;
        width: 50px;
        margin-right: 5px;
        vertical-align: middle;
        display: inline-block;
      }
      .title{
        vertical-align: middle;
        font-size: 22px;
        font-family: cursive;
        letter-spacing: 3px;
      }
    }
    .avator{
      width: 36px;
      height: 36px;
      vertical-align: middle;
      margin-left: 20px;
  		border-radius: 50%;
  		margin-right: 37px;
	   }
  }
</style>
