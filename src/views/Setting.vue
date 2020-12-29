<template>
  <div>
    <div
      class="background background-pattern mt-0 mb-4 pl-4 pr-4"
      style="background-repeat: no-repeat"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mt-4 pl-0">
            <div class="row" @click="linkTo('/home')">
              <div class="col-1">
                <span class="material-icons" style="color: white">
                  arrow_back
                </span>
              </div>
              <div class="col-10">
                <h1 class="text-heading-2">Setting</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mt-2">
          <div class="profile"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mt-3">
          <h2 class="text-heading-setting">Asep Ahmad Firdaus</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mt-1">
          <p class="text-paragraph">@ahmadfirdaus</p>
        </div>
      </div>

      <div class="row">
        <div class="col-11 mt-4 mx-auto">
          <span @click="settingPhoneNumber()">
            <div class="row">
              <div class="card card-wrapper col-12 mx-auto mt-3">
                <div class="card-body pt-3 pb-3 pl-1 pr-1 mt-1">
                  <div class="row my-auto">
                    <div class="col-1 my-auto">
                      <span class="material-icons"> call </span>
                    </div>
                    <div class="number col-10 my-auto">
                      <div class="row my-auto mt-4 mb-4">
                        <div class="heading-label col-12">Nomor Telepon</div>
                        <div class="label col-12">08122321414</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-11 mt-1 mx-auto">
          <span @click="settingEmail()">
            <div class="row">
              <div class="card card-wrapper col-12 mx-auto mt-3">
                <div class="card-body pt-3 pb-3 pl-1 pr-1">
                  <div class="row my-auto">
                    <div class="col-1 my-auto">
                      <span class="material-icons"> email </span>
                    </div>
                    <div class="number col-10 my-auto">
                      <div class="row">
                        <div class="heading-label col-12">Alamat E-Mail</div>
                        <div class="label col-12">asepahmad11@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-11 mt-1 mx-auto">
          <span @click="settingPass()">
            <div class="row">
              <div class="card card-wrapper col-12 mx-auto mt-3">
                <div class="card-body pt-3 pb-2 pl-1 pr-1">
                  <div class="row my-auto">
                    <div class="col-1 my-auto">
                      <span class="material-icons"> lock </span>
                    </div>
                    <div class="number col-10 my-auto">
                      <div class="row">
                        <div class="heading-label col-12">Password</div>
                        <div
                          class="label col-12"
                          style="font-size: 18px !important"
                        >
                          ***********
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SweetAlert from "@/plugins/SweetAlert";

Vue.use(SweetAlert);

export default {
  data() {
    return {
      userAvatar:
        "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
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
    closePanel() {
      this.isShowSwipePanel = false;
    },
    showSwipePanel() {
      this.isShowSwipePanel = true;
    },
    logout() {
      this.$cookies.remove("access-token");
      this.$cookies.remove("refresh-token");
      this.linkTo("/login");
    },
    async settingPhoneNumber() {
      const swalResponse = await this.$swal.fire({
        title: '<h1 class="text-heading-1">Ganti Nomor</h1>',
        html: `<input type="text" name="phone-number" class="form-control input-primary-app " placeholder="Masukan Nomor Baru"></input>`,
        confirmButtonText: "Ganti Nomor",
        preConfirm() {
          return {
            phoneNumber: document.querySelector("input[name=phone-number]")
              .value,
          };
        },
      });
      const inputValue = swalResponse.value;

      if (inputValue) {
        if (inputValue.phoneNumber == "") {
          this.$swal.fire({
            title: "Nomor Jangan Kosong",
            text: "Nomor jangan sampai kosong",
            icon: "error",
            confirmButtonText: "Kembali",
          });
          return;
        } else {
          this.$swal.fire({
            title: "Nomor Berhasil Di Ubah",
            text: "Nomor anda berhasil di ubah",
            icon: "success",
            confirmButtonText: "Kembali",
          });
        }
      }
    },
    async settingEmail() {
      const swalResponse = await this.$swal.fire({
        title: '<h1 class="text-heading-1">Ganti Email</h1>',
        html: `<input type="email" name="email" class="form-control input-primary-app " placeholder="Masukan Email Baru"></input>`,
        confirmButtonText: "Ganti Email",
        preConfirm() {
          return {
            email: document.querySelector("input[name=email]").value,
          };
        },
      });

      const inputValue = swalResponse.value;
      if (inputValue) {
        if (inputValue.email == "") {
          this.$swal.fire({
            title: "Email Kosong",
            text: "Email Jangan Sampai Kosong",
            icon: "error",
            confirmButtonText: "Kembali",
          });
          return;
        } else {
          this.$swal.fire({
            title: "Email Berhasil Di Ubah",
            text: "Email anda berhasil di ubah",
            icon: "success",
            confirmButtonText: "Kembali",
          });
        }
      }
    },
    async settingPass() {
      const swalResponse = await this.$swal.fire({
        title: `<h1 class="text-heading-1">Ganti Password</h1>`,
        html:
          `<input type="password" name="old-password" class="form-control input-primary-app " placeholder="Masukan Password Lama"></input>` +
          `<input type="password" name="new-password" class="form-control input-primary-app mt-4" placeholder="Masukan Password Baru"></input>` +
          `<input type="password" name="confirm-password" class="form-control input-primary-app mt-4" placeholder="Masukan Konfirmasi Password"></input>`,
        preConfirm() {
          return {
            oldPassword: document.querySelector("input[name=old-password]")
              .value,
            newPassword: document.querySelector("input[name=new-password]")
              .value,
            confirmPassword: document.querySelector(
              "input[name=confirm-password]"
            ).value,
          };
        },
      });
      const inputValue = swalResponse.value;
      if (inputValue) {
        if (
          inputValue.oldPassword == "" ||
          inputValue.newPassword == "" ||
          inputValue.confirmPassword == ""
        ) {
          this.$swal.fire({
            title: "Password Kosong",
            text: "Password Jangan Sampai Kosong",
            icon: "error",
            confirmButtonText: "Cool",
          });
          return;
        }

        // Cek apakah password baru sama dengan password lama, jika ya tampilkan error
        if (inputValue.newPassword == inputValue.oldPassword) {
          this.$swal.fire({
            title: "Password Baru Sama",
            text: "Password baru tidak boleh sama",
            icon: "error",
            confirmButtonText: "Kembali",
          });
        } else if (inputValue.confirmPassword === inputValue.newPassword) {
          this.$swal.fire({
            title: "Password Di Ubah",
            text: "Password berhasil di ubah",
            icon: "success",
            confirmButtonText: "Kembali",
          });
        } else {
          this.$swal.fire({
            title: "Password Tidak Sama",
            text: "Password harus sama dengan password baru",
            icon: "error",
            confirmButtonText: "Kembali",
          });
        }

        return;
      }
    },
  },

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
.text-heading-setting {
  font-family: "Baloo 2", cursive;
  font-weight: 600;
  margin: auto;
  padding: auto;
  color: white;
  text-align: center;
  font-size: 18px !important;
}
.text-heading-2 {
  color: white;
  margin-top: 2px;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  font-weight: 600;
}
.background {
  background-position: center;
  background-size: 120%;
  height: 245px !important;
}
.profile {
  background-image: url("/static/images/PBACSF0.jpg");
  border-radius: 100%;
  width: 90px;
  height: 90px;
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
  padding: auto;
  background-color: white;
}

.background-pattern {
  background-image: url("/static/images/pattern.jpg");
}
.text-paragraph {
  font-size: 14px !important;
  text-align: center;
  font-weight: 600 !important;
  color: white;
}
.card-wrapper {
  /* height: 62px; */
  margin-top: 0px;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 1, 0.1);
  border: 0px;
}
.number {
  margin: auto;
  padding: auto;
}
.heading-label {
  font-family: "Baloo 2", cursive;
  font-weight: normal;
  font-size: 12px;
}
.label {
  font-family: "Baloo 2", cursive;
  font-weight: 600;
  font-size: 14px;
}
</style>