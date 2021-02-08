<template>
  <div class="login-container">
    <!-- 
      el-from 表单组件
      每个表单项都必须使用 el-from-item 组件包裹
     -->
    <div class="login-from-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
    </div>
    <!-- 
      配置 From 表单验证：
        1.必须给 el-from 组件绑定 modle 为表单数据对象
        2.给需要验证的表单项 el-from-item 绑定 prop 属性
            注意：prop 属性组要指定表单对象中的数据对象
        3.给 el-from 组件的 rules 属性配置验证规则

      手动触发表单验证：
        1.给 el-from 设置 ref 起个名字（随便起名，不要重复即可）
        2.通过 ref 获取 el-from 组件，调用组件的 validate 进行验证
     -->
    <el-form
      class="login-from"
      ref="login-from"
      status-icon
      :model="user"
      :rules="fromRules"
    >
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">
          我已阅读并同意用户协议和隐私条款
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onLogin"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user.js"

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "13911111111", // 手机号
        code: "246810", // 验证码
        agree: false //是否同意协议
      },
      loginLoading: false,
      fromRules: {//表单验证规则配置
        //要验证的数据名称：规则列表[]
        mobile: [
          //trigger 用来配置触发校验的时机，有两个选项， 
          //change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
          {
            required: true,
            message: "请输入的手机号",
            trigger: "change",
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            required: true,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          {
            pattern: /^\d{6}$/,
            message: "请输入正确的验证码格式",
            trigger: "change",
          },
        ],
        agree: [
          {
            //自定义校验规则
            //验证通过：callback()
            //验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                //验证通过
                callback()
              } else {
                callback(new Error("请同意用户协议"))
              }
            },
            trigger: "change"
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLogin() {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user;

      // 表单验证
      //validate方法是异步的
      this.$refs["login-from"].validate((valid) => {
        //如果表单验证失败，停止请求提交
        if (!valid) {
          return;
        }

        //验证通过，请求登录
        this.login();
      });
      // 验证通过，提交登录
    },
    login() {
      // 开启登陆中 loading...
      this.loginLoading = true;

      //对于代码中的请求操作
      //1.接口请求可能需要重用
      //2.实际工作中，接口非常容易变动，改起来麻烦
      //我们建议的做法是把所有的请求都封装到函数然后统一的组织到模板中进行管理
      // 这样做的好处：管理维护更方便，也好重用
      login(this.user).then((res) => {
        // console.log(res)
          // 登录成功
          this.$message({
            message: "登录成功",
            type: "success",
          });

          //登录成功，关闭loading...
          this.loginLoading = false;

          //将接口返回的用户相关数据放到本地存储，方便应用数据共享
          //本地存储只能存储字符串
          //如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
          window.localStorage.setItem('user', JSON.stringify(res.data.data))

          // 跳转到首页
          // this.$router.push('/')
          this.$router.push({
            name: 'home'
          })

        })
        .catch((err) => {
          //登录失败
          console.log("登陆失败", err);
          this.$message.error("登录失败，手机号或验证码错误");

          //登录失败，关闭loading...
          this.loginLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column; //水平排列
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-from-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
  }
  .login-head {
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 200px;
    height: 57px;
    background: url("./logo_index.png") no-repeat;
    background-size: contain;
  }
  .login-from {
    background-color: #ffffff;
    padding: 50px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>