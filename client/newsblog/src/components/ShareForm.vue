<template>
  <div class="card-body">
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="posts"
        role="tabpanel"
        aria-labelledby="posts-tab"
      >
        <div class="form-group">
          <label class="sr-only" for="message">post</label>
          <textarea
            v-model="newsText"
            class="form-control"
            id="message"
            rows="3"
            placeholder="What are you thinking?"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="btn-toolbar justify-content-between">
      <div class="btn-group">
        <button @click="CreateBlog" class="btn btn-primary">share</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

import axios from "axios";

@Component({
  methods: {
    ...mapActions(["A_CHANGE_STATUS_MESSAGE", "A_CHANGE_NEWS"]),
  },
})
export default class ShareForm extends Vue {
  public newsText = "";
  CreateBlog() {
    axios
      .post(
        "http://localhost:3000/api/createNews",
        { text: this.newsText },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "some",
          },
        }
      )
      .then((data) => {
        if (data.data.result == "success") {
          this.A_CHANGE_STATUS_MESSAGE(data.data.msg);
          axios
            .get("http://localhost:3000/api/getNews", {
              headers: {
                Authorization: localStorage.getItem("token") || "some",
              },
            })
            .then((data) => {
              this.A_CHANGE_NEWS(data.data);
            });
        } else {
          this.A_CHANGE_STATUS_MESSAGE(data.data.msg);
        }
      });
  }
}
</script>
<style></style>
