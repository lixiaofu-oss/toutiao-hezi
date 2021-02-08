<!--  -->
<template>
  <div class="test-container">
    <label for="">
      Id:
      <input type="text" v-model="id" style="height: 25px; width: 150px" placeholder="请输入id"/>
    </label>
    <label for="">
      内容:
      <input
        type="text"
        v-model="container"
        style="height: 25px; width: 300px"
        placeholder="请输入内容"
      />
    </label>
    <br /><br />
    <input type="submit" value="提交" @click="onsumit" />
    <br /><br />

    <table class="">
      <thead>
        <tr>
          <th width="30px">Id</th>
          <th >Container</th>
          <th width="40px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{item.container}}</td>
          <td>
            <a href="" @click="del(item.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      id: "",
      container: "",
      list: [
        { id: 1, container: "将进酒杯莫停" },
        { id: 2, container: "十步杀一人" },
      ],
    };
  },
  methods: {
    onsumit() {
      var add = { id: this.id, container: this.container }; //获取
      this.list.push(add); //添加元素  逻辑
      this.id = this.container = ""; //清空
    },
    del(id) {
      this.list.some((item, i) => {
        if (item.id == id) {
          this.list.splice(i, 1);
          return true;
        }
      });
    },
  },
};
</script>
<style lang='less'>
.test-container {
  .text {
    border: black 1px solid;
    width: 500px;
    height: 150px;
  }
}
</style>