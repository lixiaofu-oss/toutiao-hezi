<!--  -->
<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <AppAside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <!-- 
            class 样式处理
              {
                css类名：布尔值
              }
              true：作用类名
              false：不作用类名
           -->
          <i
            :class="{
              'el-icon-s-unfold': isCollapse,
              'el-icon-s-fold': !isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>中卫市恒力电控服务有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="" />
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!-- <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
            <!-- 
              组件默认是不识别原生事件的，除非内部做了处理
             -->
            <el-dropdown-item icon="el-icon-s-release" @click.native="onLogout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import AppAside from "./componens/aside";
import { getUserProfile } from "@/api/user";
export default {
  // import引入的组件需要注入到对象中才能使用
  name: "LayoutIndex",
  components: {
    AppAside,
  },
  data() {
    // 这里存放数据
    return {
      user: {}, //当前登录用户信息
      isCollapse: false, //侧边菜单栏展开状态
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //组件初始化好，请求获取用户资料
    this.loadUserProfile();
  },
  // 方法集合
  methods: {
    //除了登录接口，其他所有接口都需要授权才能请求使用
    //或者说，除了登录接口，其他接口都需要提供你的身份令牌才能获取数据
    loadUserProfile() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
      });
    },

    onLogout() {
      this.$confirm("确认退出码?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //把用户的登录状态清除
          window.localStorage.removeItem("user");
          //跳转到登录页面
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang='less'>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}
.header {
  // background-color: #b3c0d1;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.main {
  background-color: #e9eef3;
}
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>