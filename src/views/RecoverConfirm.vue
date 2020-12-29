<template>
  <div>
    <div class="position-absolute wrapper d-block">
      <div class="my-auto wrapper-content">
        <div class="container-fluid p-4 mx-auto d-block">
          <div class="row p-2">
            <div class="col-12">
              <div class="row">
                <div class="col-12 img_email_cek">
                  <img
                    src="@/assets/images/illustration/check-email.svg"
                    alt
                    class="img img-fluid mx-auto d-block"
                  />
                </div>
              </div>
              <div class="row text-center">
                <div class="col-12 mt-4">
                  <h2 class="text-heading-1">Periksa Email Anda</h2>
                  <p class="text-paragraph">
                    Kami telah mengirim tautan pemulihan,
                    silahkan cek email anda
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-block btn-primary-app"
                    @click="linkTo('/Login')"
                  >KEMBALI KE HALAMAN LOGIN</button>
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
export default {
  data() {
    return {};
  },
  props: {
    linkTo: {
      type: Function,
    },
  },
  methods: {},
};
</script>

<style scoped>
</style>