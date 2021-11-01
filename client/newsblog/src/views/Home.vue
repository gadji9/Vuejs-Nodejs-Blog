<template>
  <div class="container gedf-wrapper">
    <div class="row justify-content-center">
      <div class="col-md-6 gedf-main">
        <div class="card gedf-card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  id="posts-tab"
                  data-toggle="tab"
                  href="#posts"
                  role="tab"
                  aria-controls="posts"
                  aria-selected="true"
                  to="/"
                  >Make a publication</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  id="images-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="images"
                  aria-selected="false"
                  href="#images"
                  to="/find"
                  >Find by id</router-link
                >
              </li>
            </ul>
          </div>
          <router-view />
          <!-- Post /////-->
        </div>

        <!--- \\\\\\\Post-->
        <div v-for="blog in NEWS" :key="blog._id" class="card gedf-card">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex justify-content-between align-items-center">
                <div class="mr-2">
                  <img
                    class="rounded-circle"
                    width="45"
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                  />
                </div>
                <div class="ml-2">
                  <div class="h5 m-0">{{ blog.userId.email }}</div>
                  <div class="h6 m-0">{{ blog._id }}</div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div class="card-body">
            <p class="card-text">
              {{ blog.text }}
            </p>
          </div>
          <div v-if="blog.own" class="card-footer d-flex justify-content-between px-3">
            <div>
              <button @click="DeleteBlog(blog._id)" class="btn btn-outline-danger p-1">
                <img width="35" src="../assets/Delete.png" />
              </button>
            </div>
            <div>
              <button @click="EditBlog(blog._id)" class="btn btn-outline-primary p-1">
                <img width="35" src="../assets/Edit.png" />
              </button>
            </div>
          </div>
        </div>
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
  computed: mapGetters(["NEWS"]),
})
export default class Home extends Vue {
  public newsText = "";

  mounted() {
    axios
      .get("http://localhost:3000/api/getNews", {
        headers: {
          Authorization: localStorage.getItem("token") || "some",
        },
      })
      .then((data) => {
        this.A_CHANGE_NEWS(data.data);
      });
  }
  EditBlog(id: number) {
    const newText = prompt('Введите новый текст');
    if(newText){

    axios
      .post(
        "http://localhost:3000/api/patchNews",
        { id: id, text: newText },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "some",
          },
        }
      )
      .then((data) => {
        if (data.data.result == "error") {
          this.A_CHANGE_STATUS_MESSAGE(data.data.msg);
        } else {
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
        }
      });
    }else{
      this.A_CHANGE_STATUS_MESSAGE("Не удалось");
    }
  }
  DeleteBlog(id: number) {
    axios
      .post(
        "http://localhost:3000/api/deleteNews",
        { id: id },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "some",
          },
        }
      )
      .then((data) => {
        if (data.data.result == "error") {
          this.A_CHANGE_STATUS_MESSAGE(data.data.msg);
        } else {
          this.A_CHANGE_STATUS_MESSAGE(data.data.msg);
        }
      });
    axios
      .get("http://localhost:3000/api/getNews", {
        headers: {
          Authorization: localStorage.getItem("token") || "some",
        },
      })
      .then((data) => {
        this.A_CHANGE_NEWS(data.data);
      });
  }
}
</script>

<style>
.h7 {
  font-size: 0.8rem;
}

@media (min-width: 992px) {
  .gedf-main {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}
.gedf-card {
  margin-bottom: 2.77rem;
}
/**Reset Bootstrap*/
.dropdown-toggle::after {
  content: none;
  display: none;
}
.addNews {
  background: none;
  border: none;
}
.home {
  width: 100%;
  height: 100%;
  background-color: red;
}
.text {
  font-size: 15px;
  color: white;
}
</style>
