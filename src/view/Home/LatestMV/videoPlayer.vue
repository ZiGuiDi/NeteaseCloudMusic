<template>
  <div class="box">
    <video :src="mvUrl" autoplay controls class="videoStyle"></video>
  </div>
</template>

<script>
export default {
  name: "videoPlayer",
  data() {
    return {
      mvUrl: "",
    };
  },
  mounted() {
    let mvId = this.$route.query.id;
    this.getMvUrl(mvId);
    this.getMvDetail(mvId);
  },
  methods: {
    async getMvUrl(id) {
      let ruselt = await this.$API.reqMvUrl(id);
      this.mvUrl = ruselt.data.data.url;
    },
    async getMvDetail(id) {
      let ruselt = await this.$API.reqMDetail(id);
      console.log(ruselt);
    },
  },
};
</script>

<style scoped>
.box {
  /* display: flex; */
  justify-content: center;
}
.videoStyle {
  /* margin: 0 auto; */
  margin-left: 12%;
  height: 500px;
}
</style>