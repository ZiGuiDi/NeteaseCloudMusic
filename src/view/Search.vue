<template>
  <div class="box">
    <div class="center">
      <h2>歌曲列表</h2>
      <span>{{ sum }}首歌</span>
    </div>
    <el-table :data="result.songs" style="width: 100%" @cell-click="getMusicId">
      <el-table-column prop="name" label="歌曲名" width="width">
      </el-table-column>
      <el-table-column prop="dt" label="时长" width="150%"> </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="300%">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="300%">
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="limit"
      :pager-count="9"
      layout="prev, pager, next"
      :total="sum || 0"
      class="pagination"
      @current-change="changeSize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      result: [],
      limit: 10,
      offset: 1,
      currentPage: 0,
      musicName: "",
      keywords: "",
    };
  },
  mounted() {
    let { limit, currentPage } = this;
    this.getSearchList(limit, currentPage);
    this.$bus.$on("getMusic", this.getQuery);
  },
  methods: {
    getQuery() {
      let { limit, currentPage } = this;
      this.getSearchList(limit, currentPage);
    },
    async getSearchList(limit, currentPage) {
      let timeStamp = Date.parse(new Date());
      this.musicName = this.$route.query.keywords;
      let result = await this.$API.reqSearch(
        this.musicName,
        limit,
        currentPage,
        timeStamp
      );
      if (result.data.code === 200) {
        this.result = result.data.result;
        result.data.result.songs.forEach((element, index) => {
          // result.data.result.songs
          let m = parseInt(element.dt / 1000 / 60);
          let s = parseInt(
            [element.dt / 1000 / 60 - parseInt(element.dt / 1000 / 60)] * 60
          );
          s = s < 10 ? "0" + s : s;
          this.result.songs[index].dt = `${m}分${s}秒`;
        });
      }
    },
    getMusicId(data) {
      let id = data.id;
      this.$bus.$emit("musicId", id);
    },
    changeSize(page) {
      let { limit, currentPage } = this;
      currentPage = (page - this.offset) * 10;
      this.getSearchList(limit, currentPage);
    },
  },
  computed: {
    sum() {
      return this.result.songCount;
    },
  },
};
</script>

<style scoper>
.box {
  width: 980px;
  margin: 5px auto;
  background-color: #fff;
}
.search {
  width: 200px;
}
.center {
  display: flex;
}
.center span {
  line-height: 72px;
  font-size: 14px;
  margin-left: 20px;
  color: #666;
}
.pagination {
  text-align: center;
}
</style>