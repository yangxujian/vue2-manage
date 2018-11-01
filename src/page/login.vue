<template>
  <el-form :model="adminForm" :rules="rules" ref="adminForm" label-position="left" label-width="0px" class=" login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="name">
      <el-input type="text" v-model="adminForm.name" clearable  auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="adminForm.password" clearable  auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="submit" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        logining: false,
        adminForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      submit(ev) {
        this.$refs.adminForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            setTimeout(() =>{
              this.$router.push({ path: '/manage' });
              this.$message({
                type: 'success',
                message: '登录成功'
              });
            },1000)
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate3d(-50%,-50%,0);
    border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
