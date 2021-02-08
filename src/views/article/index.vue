<!--  -->
<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <!-- 
              el-radio 默认把 label
                作为文本和选中之后的 value值
             -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- 
            button 按钮的 click 事件有个默认参数
              当你没有指定参数的时候，它会默认传递一个没用的数据
           -->
          <el-button type="primary" @click="loadArticles(1)" :disabled="loading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- card2 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <!-- 数据列表 -->
      <!-- 
        Table 表格组件
          1.把需要展示的数据列表绑定给 table 组件的data属性
            注意：不用去 v-for 遍历，他它自己会遍历
          2.设立表格列 el-table-colum
            width 可以设定表格列的宽度
            label 可以设定列的标题
            prop 用来设定要渲染的列表项数据字段,只能展示文本
          3.表格里默认只能渲染普通文本，如果需要展示其他内容，例如当个按钮、图片，
              那就组要自定义表格列模板了：element里面
       -->
      <el-table
        :data="articles"
        class="list-table"
        style="width: 100%"
        stripe
        size="mini"
        v-loading="loading"
      >
        <el-table-column prop="image" label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.cover.images[0]"
              fit="cover"
              lazy
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <!-- <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img v-else class="article-cover" src="./no-cover.gif" alt="" /> -->
            <!-- 
              下面这种情况是在运行期间动态改变处理的
                而本地图片必须在打包的时候就存在
             -->
            <!-- <img :src="scope.row.cover.images[0] || './pic_bg.png'" class="article-cover" alt=""> -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <!-- 
            如果组要在自定义列模板中获取当前遍历项数据，那么久在 template 上声明
             slot-scope="scope"
           -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{
              articleStatus[scope.row.status].text
            }}</el-tag>
            <!-- <el-tag v-if="scope.row.status ==0" type="warning">草稿</el-tag>
            <el-tag v-if="scope.row.status ==1">待审核</el-tag>
            <el-tag v-if="scope.row.status ==2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status ==3" type="danger">审核失败</el-tag>
            <el-tag v-if="scope.row.status ==4" type="info">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="$router.push('/publish?id='+scope.row.id.toString())"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <!-- 
        total 用来设定总数居的条数
          它默认按照 10 条每页计算总页码
        page-size 每页显示条目个数，支持，.sync
          修饰符，默认每页10条
       -->
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        background
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
      ></el-pagination>
    </el-card>
    <!-- /card2 -->
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from "@/api/article";
export default {
  name: "ArticleIndex",
  components: {},
  data() {
    return {
      form: {
        name: "",
        data1: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      articles: [], //文章数据列表
      articleStatus: [
        { status: 0, text: "草稿", type: "warning" },
        { status: 1, text: "待审核", type: "" },
        { status: 2, text: "审核通过", type: "success" },
        { status: 3, text: "审核失败", type: "danger" },
        { status: 4, text: "已删除", type: "info" },
      ],
      totalCount: 0, //总数居条数
      pageSize: 10, //每页条数
      status: null, //查询文章的状态，不传就是全部
      channels: [], //文章频道列表
      channelId: null, //查询文章的频道
      rangeDate: null, //筛选的范围日期
      loading: true, //表格数据加载中
      page: 1 //当前页码
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadChannels();
    this.loadArticles(1);
  },
  // 方法集合
  methods: {
    loadArticles(page = 1) {
      //展示加载中
      this.loading = true;
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        //如果rangedate有效，则rangeDate[0]拿过来，如没有就是null
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, //开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null, //截止日期
      }).then((res) => {
        console.log(res);
        const { results, total_count: totalCount } = res.data.data;
        this.articles = results;
        this.totalCount = totalCount;

        //关闭加载中 loading
        this.loading = false;
      });
    },
    onCurrentChange(page) {
      // console.log(page)
      this.loadArticles(page);
    },

    loadChannels() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onDeleteArticle(articleId) {
      // console.log(articleId.toString())
      this.$confirm("确认删除码?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确认执行
          deleteArticle(articleId.toString()).then(() => {
            //删除成功，更新当前页的文章数据列表
            this.loadArticles(this.page)
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      //找到数据接口
      //封装请求方法
      //删除请求调用
      //处理响应结果
    },
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang='less'>
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 60px;
  background-size: cover;
}
</style>