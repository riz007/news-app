<template>
  <div class="row">
    <h1>News Headlines</h1>
    <div v-if="headlines">
      <template v-for="(headline, index) in headlines.articles">
        <div class="card column" :key="index">
          <img class="news-image" :src="setHeadlineImage(headline.urlToImage)" alt="news-image">
          <div class="container">
            <a :href="headline.url" target="_blank" rel="noopener">
              <h4 class="truncate"><b>{{ headline.title }}</b></h4> 
            </a>
            <p class="truncate">{{ headline.description }}</p> 
          </div>
        </div>
      </template>
    </div>
    <div v-else>
      <PlaceholderLoading />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import defaultImage from '../assets/default-image.png';
const PlaceholderLoading = () => import('../components/PlaceholderLoading.vue');
export default {
  name: 'Home',
  components: {
    PlaceholderLoading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(['headlines']),
  },
  created() {
    this.getAllHeadLines();
  },
  methods: {
    getAllHeadLines() {
      this.isLoading = true;
      this.$store.dispatch("GET_ALL_HEADLINES").then(() => {
        this.isLoading = false;
      });
    },
    setHeadlineImage(imageUrl) {
      return imageUrl ? imageUrl : defaultImage;
    }
  },
  
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.column {
  float: left;
  width: 25%;
  padding: 10px;
  margin: 20px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  height: 400px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
img {
  border-radius: 5px 5px 0 0;
}
.container {
  padding: 2px 16px;
}
.news-image {
  object-fit: contain;
  height: 300px;
  max-width: 100%;
}
.truncate {
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>