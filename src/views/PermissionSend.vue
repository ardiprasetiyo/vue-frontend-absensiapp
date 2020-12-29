<template>
  <div>
    <div class="position-absolute wrapper d-block">
      <div class="my-auto wrapper-content">
        <div class="container-fluid p-4 mx-auto d-block">
          <div class="row p-2">
            <div class="col-12">
              <div class="row">
                <div class="col-12 img_send">
                  <img
                    src="@/assets/images/illustration/permission-sent.svg"
                    alt
                    class="img img-fluid mx-auto d-block"
                  />
                </div>
              </div>
              <div class="row text-center">
                <div class="col-12 mt-4">
                  <h2 class="text-heading-1">Izin Telah Di Buat</h2>
                  <p class="text-paragraph">
                    Permintaan izin telah berhasil dibuat.
                    Semoga anak anda dapat beraktifitas
                    kembali di sekolah!
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-block btn-primary-app mt-2"
                    @click="linkTo('/recover-password')"
                  >PULIHKAN PASSWORD</button>
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
    tokenCheck: {
      type: Function
    }
  },
  methods: {},
  async mounted() {
    const tokenCheck =  await this.tokenCheck()
    if( !tokenCheck ){
      this.$cookies.remove("access-token");
      this.$cookies.remove("refresh-token");
      this.linkTo("/login")
      return false
    }
  },
};
</script>

<style scoped>
</style>