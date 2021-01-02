<template>
  <div>
    <!-- Header -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 mt-5">
          <h2 class="header-login">Halo, Selamat Datang</h2>
        </div>
      </div>
      <!-- Header -->

      <!-- Paragraph -->
      <div class="row">
        <div class="col-12">
          <p class="paragraph-login">
            Memudahkan anda memeriksa kehadiran anak di sekolah
          </p>
        </div>
      </div>
      <p></p>
    </div>
    <!-- Paragraph -->

    <!-- Form Input -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 mt-2">
          <p class="text-error" v-if="loginError">{{ loginError }}</p>
          <label for="username" class="label-login">Username</label>
          <input
            v-bind:class="{ 'border-error': username.isInvalid }"
            type="username"
            class="form-control input-primary-app"
            id="#"
            aria-describedby="#"
            placeholder="Masukan Username"
            v-model="username.value"
            @keypress.enter="submitForm()"
          />
          <div class="text-error" v-if="username.isInvalid">
            <p
              class="mb-0 mt-3 text-error"
              v-for="(user_error, index_uerr) in username.invalidMessage"
              :key="index_uerr"
            >
              {{ user_error }}
            </p>
          </div>
        </div>
        <div class="col-12 mt-3">
          <label for="password" class="label-login">Password</label>
          <input
            v-bind:class="{ 'border-error': password.isInvalid }"
            v-bind:type="password.isShowed ? 'text' : 'password'"
            class="form-control input-primary-app"
            id="#"
            aria-describedby="#"
            placeholder="Masukan Password"
            v-model="password.value"
            @keypress.enter="submitForm()"
          />
          <div v-if="password.isInvalid">
            <p
              class="text-error mb-0 mt-0 mt-3"
              v-for="(password_error, index_perr) in password.invalidMessage"
              :key="index_perr"
            >
              {{ password_error }}
            </p>
          </div>
          <span
            @click="password.isShowed = !password.isShowed"
            class="material-icons field-icon"
          >
            {{ password.isShowed == false ? "visibility" : "visibility_off" }}
          </span>
        </div>
        <div class="col-12 mt-5">
          <button
            @click="submitForm()"
            class="btn btn-block btn-primary-app text-white"
          >
            {{ isSubmitted ? "Tunggu Sebentar" : "Login" }}
          </button>
        </div>
        <!-- <div class="col-12 mt-4">
          <h4 class="text-forgot-password text-center">
            Tidak bisa login karena lupa password?
          </h4>
        </div>
        <div class="col-12 mt-3">
          <button @click="linkTo('/recover-password')" class="btn btn-block btn-secondary-app">
            PULIHKAN PASSWORD
          </button>
        </div> -->
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
    return {
      username: {
        value: "",
        isInvalid: false,
        invalidMessage: [],
      },
      password: {
        value: "",
        isInvalid: false,
        isShowed: false,
        invalidMessage: [],
      },

      isSubmitted: false,
      loginError: "",
    };
  },
  props: {
    linkTo: {
      type: Function,
    },
    tokenCheck: {
      type: Function,
    },
  },
  methods: {
    submitForm() {
      if (this.isSubmitted) {
        return false;
      }

      this.isSubmitted = true;
      this.loginError = "";
      this.username.isInvalid = false;
      this.username.invalidMessage = [];
      this.password.isInvalid = false;
      this.password.invalidMessage = [];

      const isValidForm = this.formValidation();
      if (!isValidForm) {
        return false;
      }

      this.loginApi();
    },

    formValidation() {
      if (this.username.value == "") {
        this.username.isInvalid = true;
        this.username.invalidMessage.push("Username tidak boleh kosong");
      }

      if (this.password.value == "") {
        this.password.isInvalid = true;
        this.password.invalidMessage.push("Password tidak boleh kosong");
      }

      if (this.password.value == "" || this.username.value == "") {
        this.isSubmitted = false;
        return false;
      }

      return true;
    },

    loginApi() {
      this.$axios({
        method: "post",
        url: process.env.VUE_APP_API_HOST + "/api/v1/auth/login",
        data: {
          username: this.username.value,
          password: this.password.value,
        },
      })
        .then((response) => {
          const response_data = response.data;
          console.log(response_data);
          if (response_data.statusCode == 200) {
            const tokens = response_data.data;
            this.$cookies.set("access-token", tokens.access_token);
            this.$cookies.set("refresh-token", tokens.refresh_token);
            this.linkTo("/home");
          } else {
            if (response_data.statusCode !== 200) {
              console.log(response_data);
              this.loginError = response_data.reason;
            }
          }
          this.isSubmitted = false;
        })
        .catch((reason) => {
          this.loginError = reason.message;
          this.isSubmitted = false;
        });
    },
  },

  async mounted() {
    const tokenCheck = await this.tokenCheck();
    if (!tokenCheck) {
      this.$cookies.remove("access-token");
      this.$cookies.remove("refresh-token");
      return false;
    }

    this.linkTo("/home");
  },
};
</script>

<style scoped>
.card-wrapper {
  padding-bottom: 15px;
  border-radius: 10px;
  margin-top: 10%;
}

.header-wrapper {
  height: 300px;
}

.header-wrapper > img {
  position: absolute;
  width: 90%;
  top: 0;
  right: 0;
  opacity: 0.7;
}

.text-greeting {
  line-height: 28px;
}

.password-wrapper {
  width: 100%;
}

.visibility-icon {
  position: absolute;
  right: 40px;
  padding-top: 4.5%;
  color: #889498;
}

.input-error {
  border: solid 1px red !important;
}

.text-error {
  color: #e53935;
}

.border-error {
  border-bottom: solid 1px #e53935 !important ;
}
</style>