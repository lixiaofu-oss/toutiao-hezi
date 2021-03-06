<!--  -->
<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            $route.query.id ? "修改文章" : "发布文章"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        :model="article"
        :rules="fromRules"
        ref="publish-from"
        label-width="60px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="350"
            placeholder="请输入内容..."
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">{{
            $route.query.id ? "修改" : "发表"
          }}</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle,
} from "@/api/article";
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  TextColor,
  ElementTiptap,
} from "element-tiptap";
import { uploadImage } from "@/api/image";

export default {
  name: "PublishIndex",
  components: {
    "el-tiptap": ElementTiptap,
  },
  data() {
    return {
      channels: [], //文章频道列表
      article: {
        title: "", //文章标题
        content: "", //文章内容
        cover: {
          //文章标题
          type: 0, //封面类型  -1：自动，0：无图，1：1张，3：3张
          images: [], //封面图片的地址
        },
        channel_id: null,
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }), //标题
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest(file) {
            //如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData();
            fd.append("image", file);
            //第一个return 是返回 Promise 对象，因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then((res) => {
              //这个return 是返回最后的结果
              return res.data.data.url;
            });
          }, // 图片的上传方法，返回一个Promise<url>
        }),
        new Underline({ bubble: true, menubar: false }), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(),
        new ListItem(),
        new BulletList(), //无序列表
        new OrderedList(), //有序列表
        new TodoItem(),
        new TodoList(), // (与 TodoItem 一起使用)
        new Fullscreen(), //全屏输入
        new Preview(),
        new TextColor(),
      ],
      fromRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "长度在 5 到 30 个字符",
            trigger: "blur",
          },
        ],
        content: [
          { required: true, message: '请输入文章内容',trigger: 'blur' },
          {
            validator(rule, value, callback) {
              console.log("content validator");
              if (value === "<p></p>") {
                // 验证失败
                callback(new Error("请输入文章内容"));
              } else {
                // 验证通过
                callback();
              }
            },
          },
        ],
        channel_id: [{ required: true, message: "请输入文章频道" }],
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadChannels();

    //由于我们让发布和修改使用的同一个组件
    //所以这里要判断
    //如果路由路劲参数中有id， 则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle();
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    loadChannels() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onPublish(draft = false) {
      this.$refs["publish-from"].validate((valid) => {
        //验证失败，停止提交表单
        if (!valid) {
          return;
        }
        //验证通过,提交表单
        // 找到数据接口
        // 封装请求方法
        // 请求提交表单
        //如果是修改文章，则执行修改操作，否则执行添加操作
        const ariticleId = this.$route.query.id;
        if (ariticleId) {
          //执行修改操作
          updateArticle(ariticleId, this.article, draft).then((res) => {
            console.log(res);
            this.$message({
              message: "修改成功",
              type: "success",
            });
            //跳转到内容管理页面
            this.$router.push("/article");
          });
        } else {
          addArticle(this.article, draft).then((res) => {
            // 处理响应结果
            console.log(res);
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}成功`,
              type: "success",
            });
            //跳转到内容管理页面
            this.$router.push("/article");
          });
        }
      });
    },

    //修改文章：加载文章内容
    loadArticle() {
      //找到数据接口
      //封装请求方法
      //请求获取数据
      getArticle(this.$route.query.id).then((res) => {
        //模板绑定展示
        this.article = res.data.data;
      });
    },
  },
};
</script>
<style lang='less'>
</style>