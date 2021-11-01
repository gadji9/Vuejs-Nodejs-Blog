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
          <label class="sr-only" for="message">Find</label>
          <input v-model="id" class="form-control" placeholder="Id" />
        </div>
      </div>
    </div>
    <div class="btn-toolbar justify-content-between">
      <div class="btn-group">
        <button @click="CreateBlog" class="btn btn-primary">Find</button>
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
    ...mapActions(["A_CHANGE_NEWS", "A_CHANGE_STATUS_MESSAGE"]),
  },
})
export default class ShareForm extends Vue {
  public id = "";
  CreateBlog() {
    axios
      .post(
        "http://localhost:3000/api/find",
        { id: this.id },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "some",
          },
        }
      )
      .then((data) => {
        if (data.data.result == "success") {
          this.A_CHANGE_NEWS(data.data.blog);
          console.log(data.data.blog);
          this.A_CHANGE_STATUS_MESSAGE(data.data.msg);
        } else {
          this.A_CHANGE_STATUS_MESSAGE(data.data.msg);
        }
      });
  }
}
</script>
<style></style>
