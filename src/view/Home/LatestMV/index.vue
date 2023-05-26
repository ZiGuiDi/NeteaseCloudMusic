<template>
  <div>
    <el-tabs v-model="activeName" class="box">
      <el-tab-pane label="最新MV" name="first">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "LatestMV",
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style scoped>
.box {
  width: 1200px;
  margin-top: 10px;
  margin-left: 30px;
}
</style>