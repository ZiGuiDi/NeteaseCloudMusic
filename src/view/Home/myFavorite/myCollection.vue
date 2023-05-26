<template>
  <div>
    <h1>我的喜欢</h1>
    <el-table :data="songs" style="width: 100%" @cell-click="getMusicId">
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
  name: "myCollection",
  data() {
    return {
      songs: [],
      limit: 10,
      offset: 1,
      currentPage: 0,
      uid: "",
      sum: "",
    };
  },
  mounted() {
    this.$bus.$on("emitUid", this.getUid);
    this.getLikeList();
  },
  methods: {
    async getUserDetail(uid) {
      let result = await this.$API.reqUserDetail(uid);
      let id = result.data.playlist[0].id;
      let likeSongs = await this.$API.reqTrack(
        id,
        this.limit,
        this.currentPage
      );
      this.songs = likeSongs.data.songs;
      this.songs.forEach((element, index) => {
        let m = parseInt(element.dt / 1000 / 60);
        let s = parseInt(
          [element.dt / 1000 / 60 - parseInt(element.dt / 1000 / 60)] * 60
        );
        s = s < 10 ? "0" + s : s;
        this.songs[index].dt = `${m}分${s}秒`;
      });
    },
    getUid(uid) {
      this.getUserDetail(uid);
      this.uid = uid;
    },
    changeSize(page) {
      this.currentPage = (page - this.offset) * 10;
      this.getUserDetail(this.uid);
    },
    getMusicId(data) {
      let id = data.id;
      this.$bus.$emit("musicId", id);
    },
    async getLikeList() {
      setTimeout(async () => {
        let result = await this.$API.reqLikeList(this.uid);
        this.sum = result.data.ids.length;
      }, 500);
    },
  },
};
</script>

<style scoped>
.pagination {
  text-align: center;
}
</style>