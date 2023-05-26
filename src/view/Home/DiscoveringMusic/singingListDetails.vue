<template>
  <div class="top">
    <div class="box">
      <div class="left">
        <img :src="playlist.coverImgUrl" />
      </div>
      <div class="right">
        <div class="songSheet">
          <i>歌单</i>
          <h3>{{ this.playlist.name }}</h3>
        </div>
        <div class="author">
          <img :src="avatarUrl" />
          <span>{{ nickname }}</span>
        </div>
        <div class="nav">
          <span>标签:</span>
          <ul>
            <li v-for="(tag, index) in tags" :key="index">
              <i>{{ tag }}</i>
            </li>
          </ul>
        </div>
        <div class="introduce">
          <span
            >介绍：
            <p>{{ playlist.description }}</p></span
          >
        </div>
      </div>
    </div>
    <div class="center">
      <h2>歌曲列表</h2>
      <span>{{ sum }}首歌</span>
      <p>
        播放:<i>{{ play }}</i
        >次
      </p>
    </div>
    <el-table
      style="width: 100%"
      :data="songs"
      class="elTable"
      @cell-click="getMusicId"
    >
      <el-table-column type="index" width="100%" align="center">
      </el-table-column>
      <el-table-column prop="name" label="歌曲标题" width="300%">
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
  name: "singingListDetails",
  data() {
    return {
      singingListId: "",
      playlist: {},
      avatarUrl: "",
      nickname: "",
      tags: [],
      songs: [],
      limit: 10,
      offset: 1,
      currentPage: 0,
    };
  },
  mounted() {
    this.singingListId = this.$route.query.id;
    let { limit, singingListId, currentPage } = this;
    this.getDetail(singingListId);
    this.getTrackAll(singingListId, limit, currentPage);
  },
  methods: {
    async getDetail(id) {
      let result = await this.$API.reqDetail(id);
      if (result.data.code === 200) {
        this.playlist = result.data.playlist;
        this.avatarUrl = this.playlist.creator.avatarUrl;
        this.nickname = this.playlist.creator.nickname;
        this.tags = this.playlist.tags;
      }
    },
    async getTrackAll(id, limit, currentPage) {
      let result = await this.$API.reqTrack(id, limit, currentPage);
      if (result.data.code === 200) {
        this.songs = result.data.songs;
        this.songs.forEach((element, index) => {
          let m = parseInt(element.dt / 1000 / 60);
          let s = parseInt(
            [element.dt / 1000 / 60 - parseInt(element.dt / 1000 / 60)] * 60
          );
          s = s < 10 ? "0" + s : s;
          this.songs[index].dt = `${m}分${s}秒`;
        });
      }
    },
    changeSize(page) {
      let { limit, singingListId, currentPage } = this;
      currentPage = (page - this.offset) * 10;
      this.getTrackAll(singingListId, limit, currentPage);
    },
    getMusicId(data) {
      let id = data.id;
      this.$bus.$emit("musicId", id);
    },
  },
  computed: {
    sum() {
      return this.playlist.trackCount;
    },
    play() {
      return this.playlist.playCount;
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
}
.left img {
  border: 2px solid #ccc;
  margin-right: 50px;
  width: 208px;
  height: 208px;
}
.songSheet i {
  display: inline-block;
  width: 40px;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  background-color: #d61c1c;
  margin-right: 10px;
  color: wheat;
}
.box h3 {
  display: inline-block;
}
.author {
  display: flex;
  margin-bottom: 10px;
}
.author img {
  width: 35px;
  height: 35px;
}
.author span {
  margin-left: 10px;
  font-size: 14px;
  color: #0c73c2;
  line-height: 35px;
}
.right {
  display: flex;
  flex-direction: column;
}
.nav {
  margin-top: 5px;
  display: flex;
}
.nav ul {
  flex: 1;
  padding: 0;
  margin: 0;
  /* display: flex; */
}
.nav ul li {
  float: left;
  /* width: 44px; */
  border-radius: 44px;
  text-align: center;
  padding: 0;
  margin: 0 5px;
  font-size: 14px;
  background-color: #e7e5e5;
}
.nav ul li i {
  font-style: normal;
  padding: 0 10px;
}
.nav span {
  font-size: 14px;
  color: #5d5b5b;
}
.introduce {
  margin-top: 20px;
}
.introduce span {
  font-size: 14px;
  color: #5d5b5b;
}
.introduce p {
  margin: 0;
  font-size: 14px;
  padding-right: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.elTable {
  font-size: 14px;
  color: black;
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
.center p {
  font-size: 14px;
  line-height: 45px;
  margin-left: 800px;
}
.center p i {
  font-style: normal;
  color: #c20c0c;
  margin: 0 5px;
  font-weight: 700;
}
audio {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>