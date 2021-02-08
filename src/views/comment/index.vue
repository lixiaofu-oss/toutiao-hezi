<!--  -->
<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="所属机构">
          <el-select v-model="form.region" placeholder="请选择所属机构">
            <el-option label="蔡桥路街道派出所" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务" style="width: 230px">
          <el-select v-model="form.region" placeholder="请选择职务">
            <el-option label="辅警" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" style="width: 230px">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label-width="15px">
          <el-col :span="4">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="form.date1"
              style="width: 70%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="4">
            <el-date-picker
              type="date"
              placeholder="结束日期"
              v-model="form.date2"
              style="width: 70%"
            >
            </el-date-picker>
          </el-col>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据列表 -->
      <el-table :data="tableData" stripe style="width: 100%" size="mini">
        <el-table-column prop="serialNumber" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="position" label="职务"> </el-table-column>
        <el-table-column prop="leaveType" label="请假类型" width="180">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间"> </el-table-column>
        <el-table-column prop="leaveTime" label="请假时长/天" width="180">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180">
        </el-table-column>
        <el-table-column>
          <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { myLeaveList } from "@/api/leave";
export default {
  name: "CommentIndex",
  components: {},
  data() {
    return {
      form: {
        name: "",
        region: "",
        value1: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tableData: [
        {
          serialNumber: "",
          name: "",
          position: "",
          leaveType: "",
          startTime: "",
          endTime: "",
          leaveTime: "",
          state: "",
        },
      ],
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    loadLeave() {
      myLeaveList().then((res) => {
        console.log(res);
      });
    },

    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadLeave();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang='less'>
</style>