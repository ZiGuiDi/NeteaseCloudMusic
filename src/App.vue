<template>
  <div>
    <Top></Top>
    <router-view></router-view>
    <audio controls autoplay :src="musicUrl" v-if="$route.meta.isShow"></audio>
  </div>
</template>

<script>
import Top from "./components/Top.vue";
export default {
  name: "App",
  data() {
    return {
      musicUrl: "",
    };
  },
  components: {
    Top,
  },
  mounted() {
    this.$bus.$on("musicId", this.getMusicId);
  },
  methods: {
    async getDynamic(id) {
      let result = await this.$API.reqDynamic(id);
      if (result.data.code === 200) {
        this.musicUrl = result.data.data[0].url;
      }
    },
    getMusicId(id) {
      this.getDynamic(id);
    },
  },
};
</script>

<style >
li {
  list-style: none;
}
audio {
  display: block;
  margin: 0 auto;
  width: 1000px;
}
</style>
