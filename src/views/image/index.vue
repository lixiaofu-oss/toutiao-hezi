<!--  -->
<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        > -->
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" size="mini" @change="onCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
          >上传素材</el-button
        >
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(img, index) in images"
          :key="index"
          class="image-item"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="img.url"
            fit="cover"
          >
          </el-image>
          <div
          class="image-action">
            <el-button type="warning"
            :icon="img.is_collected ? 'el-icon-star-on':'el-icon-star-off'"
            circle
            size="mini"
            @click="onCollect(img)"
            :loading="img.loading"
            ></el-button>
            <!-- <i
              :class="{
                'el-icon-star-on': img.is_collected,
                'el-icon-star-off': !img.is_collected
              }"
              @click="onCollect(img)"
            ></i> -->
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
      </el-row>

     <!-- 分页 -->
      <!-- 
        分页数据改变以后，页码不会变化
        它需要单独处理高亮的页码
       -->
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="onPageChange"
        > 
      </el-pagination>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <!-- 
        upload 组件本身就支持请求提交上传操作，说白了你使用它不用自己去发请求，他会自己发
        请求方法：默认就是POST
        请求路径：action，必须写完整路径
        请求头： headers
       -->
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :show-file-list="false"
        multiple
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage } from "@/api/image";
export default {
  name: "ImageIndex",
  components: {},
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return {
      collect: "false", //默认查询全部素材列表
      images: [], //图片素材列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
      totalCount: 0, //总数居条数
      pageSize: 20, //每页条数
      page: 1, //当前页码
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    loadImages(page=1) {
      //重置高亮页码，防止数据页码不对应
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
        
      }).then((res) => {
        const results = res.data.data.results
        results.forEach(img => {
          //img 对象本来没有 loading 数据
          //这里手动的往里面添加该数据是用来控制每个收藏按钮的
          img.loading = false
        });
        this.images = results
        this.totalCount = res.data.data.total_count;
      });
    },

    onCollectChange() {
      this.loadImages(1);
    },

    onUploadSuccess() {
      //关闭对话框
      this.dialogUploadVisible = false;
      //更新素材列表
      this.loadImages(this.page);
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onPageChange(page){
      this.loadImages(page)
    },

    onCollect(img){
      //展示 loading 
      img.loading = true
      collectImage(img.id,!img.is_collected).then(res=>{
        //更新视图状态
        img.is_collected = !img.is_collected
        console.log(res);
        // 关闭 loading
        img.loading = false
      })
     /*  if (img_collect) {
        //已收藏，取消收藏
        collectImage(img.id,false)
      }else{
        //没有收藏，添加收藏
        collectImage(img.id,true)
      } */
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //页面初始化加载第 1 页数据
    this.loadImages(1);
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang='less'>
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item{
  position: relative;
}
.image-action{
  font-size: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: cyan;
  height: 30px;
  width: 100px;
  background-color: rgba(204, 204, 204, 0.5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
</style>