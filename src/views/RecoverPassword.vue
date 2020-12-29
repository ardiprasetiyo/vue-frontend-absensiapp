<template>
  <div>
    <div class="container-fluid p-4">
      <div class="row p-2">
        <div class="col-12 mt-5">
          <div class="row">
            <div class="col-12">
              <img
                src="@/assets/images/illustration/password-recovery.svg"
                alt
                class="img img-fluid mx-auto d-block"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 mt-4">
              <h2 class="text-heading-1 text-center">Terkendala Saat Login</h2>
              <p class="text-paragraph text-center">
                Kami akan mengirimkan sebuah tautan
                pemulihan untuk akun anda melalui
                email dibawah
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label for="input-email" class="input-label mt-4">Email Pemulihan</label>
              <input
                type="email"
                class="form-control email_recovery"
                id="input-email"
                aria-describedby="emailHelp"
                placeholder="Masukan email anda"
              />
              <button @click="forgotPassword " type="button" class="btn btn-block btn-primary-app mt-4" >
                PULIHKAN
                PASSWORD
              </button>
              <div class="text-center mt-4">
                <a href="#!" class="btn-ghost-app"
                @click="linkTo('/login')">KEMBALI LOGIN</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:{
    linkTo:{
      type: Function
    }
  },
  methods: {
    forgotPassword() {
      this.linkTo('/recover-password/confirm');
    }
  },
};
</script>

<style scoped>
</style>