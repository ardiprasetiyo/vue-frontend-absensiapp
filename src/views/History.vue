<template>
  <div>
    <div class="container-fluid mt-2 mb-4">
      <div class="row">
        <div class="col-12 mt-2">
          <div class="row">
            <div class="col-1 mt-1">
              <span class="material-icons" @click="linkTo('/home')">
                chevron_left
              </span>
            </div>
            <div class="text-heading-2 col-10">Riwayat</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card card-warrap">
            <div class="card-body">
              <div class="row">
                <h1 class="text-heading-1 col-12">15 Juni 2020</h1>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="tiba mt-2">
                    <div class="row">
                      <div class="col-1">
                        <div class="circleTiba"></div>
                      </div>

                      <p class="teks-paragraph">Tiba pada jam 06:21</p>
                    </div>
                  </div>

                  <div class="pulang mt-2">
                    <div class="row">
                      <div class="col-1">
                        <div class="circlePulang"></div>
                      </div>

                      <p class="teks-paragraph">Pulang pada jam 15:21</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card card-warrap">
            <div class="card-body">
              <div class="row">
                <h1 class="text-heading-1 col-12">15 Juni 2020</h1>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="tiba mt-2">
                    <div class="row">
                      <div class="col-1">
                        <div class="circleTiba"></div>
                      </div>

                      <p class="teks-paragraph">Tiba pada jam 06:21</p>
                    </div>
                  </div>

                  <div class="pulang mt-2">
                    <div class="row">
                      <div class="col-1">
                        <div class="circlePulang"></div>
                      </div>

                      <p class="teks-paragraph">Pulang pada jam 15:21</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card card-warrap">
            <div class="card-body">
              <div class="row">
                <h1 class="text-heading-1 col-12">15 Juni 2020</h1>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="tiba mt-2">
                    <div class="row">
                      <div class="col-1">
                        <div class="circleTiba"></div>
                      </div>

                      <p class="teks-paragraph">Tiba pada jam 06:21</p>
                    </div>
                  </div>

                  <div class="pulang mt-2">
                    <div class="row">
                      <div class="col-1">
                        <div class="circlePulang"></div>
                      </div>

                      <p class="teks-paragraph">Pulang pada jam 15:21</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card card-warrap">
            <div class="card-body">
              <div class="row">
                <h1 class="text-heading-1 col-12">15 Juni 2020</h1>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="tiba mt-2">
                    <div class="row">
                      <div class="col-1">
                        <div class="circleTiba"></div>
                      </div>

                      <p class="teks-paragraph">Tiba pada jam 06:21</p>
                    </div>
                  </div>

                  <div class="pulang mt-2">
                    <div class="row">
                      <div class="col-1">
                        <div class="circlePulang"></div>
                      </div>

                      <p class="teks-paragraph">Pulang pada jam 15:21</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card card-warrap">
            <div class="card-body">
              <div class="row mt-2">
                <h1 class="text-heading-1 col-12">15 Juni 2020</h1>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="tiba">
                    <div class="row mt-1">
                      <div class="col-1">
                        <div class="circleTiba"></div>
                      </div>

                      <p class="text-paragraph col-10">Tiba pada jam 06:21</p>
                    </div>
                  </div>

                  <div class="pulang">
                    <div class="row">
                      <div class="col-1">
                        <div class="circlePulang"></div>
                      </div>

                      <p class="text-paragraph col-10">Pulang pada jam 15:21</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import Axios from "@/plugins/Axios";
import AuthToken from "@/plugins/AuthToken";

Vue.use(Axios);
Vue.use(AuthToken);

export default {
  data() {
    return {};
  },
  props: {
    linkTo: {
      type: Function,
    },
    tokenCheck: {
      type: Function,
    },
  },
  methods: {},

  async mounted() {
    const tokenCheck = await this.tokenCheck();
    if (!tokenCheck) {
      this.$cookies.remove("access-token");
      this.$cookies.remove("refresh-token");
      this.linkTo("/login");
      return false;
    }
  },
};
</script>

<style scoped>
.card-wrapper {
  padding-bottom: 15px;
  border-radius: 10px;
  margin-top: 10%;
}

.text-heading-2 {
  margin: 2px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: black;
}

.text-heading-3 {
  margin: 2px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: white;
}

.card-warrap {
  border: 1px solid rgba(78, 78, 78, 0.08);
  box-shadow: 0px 5px 10px rgba(241, 242, 242, 0.5);
  border-radius: 10px;
  margin: auto;
  margin-top: 30px;
  min-height: 120px;
  background-color: #f1f1f1;
}

.circleTiba {
  width: 10px;
  height: 10px;
  margin-top: 8px;
  background-color: #26de81;
  border-radius: 100%;
}
.circlePulang {
  width: 10px;
  height: 10px;
  margin-top: 8px;
  background-color: #45aaf2;
  border-radius: 100%;
}
.circleTidakHadir {
  width: 10px;
  height: 10px;
  margin-top: 8px;
  background-color: gray;
  border-radius: 100%;
}
.circlePulang {
  width: 10px;
  height: 10px;
  margin-top: 8px;
  background-color: #45aaf2;
  border-radius: 100%;
}
</style>