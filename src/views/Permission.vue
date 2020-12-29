<template>
  <div>
    <div class="container">
      <span @click="linkTo('/home')">
        <div class="row mt-4">
          <div class="col-1">
            <span class="material-icons my-auto">
              <p>arrow_back</p>
            </span>
          </div>
          <div class="col-11 pl-4 mb-4 semi-bold">
            <p>Buat Izin</p>
          </div>
        </div>
      </span>

      <div class="row">
        <div class="col-12 text-regular">
          <p>Nama Anak</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <select
            class="drop-down form-control"
            name="student-id"
            ref="student_id"
          >
            <option
              :value="student._id"
              v-for="(student, st_index) in students"
              :key="st_index"
            >
              {{ student.fullname }}
            </option>
          </select>
        </div>
      </div>

      <div class="row mt-4 text-regular">
        <div class="col-12">
          <p>Kenapa Tidak Hadir</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <select class="drop-down form-control" ref="absence_category">
            <option value="sakit">Sakit</option>
            <option value="izin">Izin</option>
          </select>
        </div>
      </div>

      <div class="row mt-4 pt-2">
        <div class="col-12 text-regular">
          <p>Alasan</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <textarea
            class="text-area form-control"
            name="absence-description"
            cols="47"
            rows="5"
            placeholder="Tambahkan keterangan dikolom ini"
            ref="absence_description"
          ></textarea>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <p class="text-regular">Masukan Bukti</p>
        </div>
        <div class="col-12">
          <div id="image-upload-container" class="row">
            <div class="col-3">
              <input
                class="uploader"
                id="file"
                type="file"
                multiple
                @change="imageUpload"
              />
              <label for="file" class="image-uploader">
                <span class="material-icons camera"> add_a_photo </span>
              </label>
            </div>

            <div
              class="col-3"
              v-for="(imageFile, imageIndex) in fileUploaded"
              :key="imageIndex"
            >
              <div class="row">
                <div class="col-12">
                  <img
                    :src="imageFile.imagesource"
                    :alt="imageFile.filename"
                    class="img img-fluid mx-auto d-block"
                  />
                </div>
                <div class="col-12 mt-2">
                  <p class="text-center small">
                    <b>
                      {{ (imageFile.filesize / 1000000).toFixed(1) + " MB" }}
                    </b>
                    <br />
                    {{ imageFile.filename }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div
              class="col-12"
              v-for="(uploadErr, uploadErrIndex) in fileUploadErrors"
              :key="uploadErrIndex"
            >
              <div class="card">
                <div class="card-body bg-warning p-3">
                  <p class="mb-0 small">
                    Gagal mengupload {{ uploadErr.filename }}, <br />
                    <i
                      ><b>{{ uploadErr.errormessage }}</b></i
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 pt-4">
          <button class="btn-primary-app form-control" @click="submitForm()">
            {{ isSubmitted ? "Mohon Menunggu ..." : "BUAT IZIN" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [],
      isSubmitted: false,
      fileUploadErrors: [],
      fileUploaded: [],
      allowedFileExtensions: [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/bmp",
      ],
      maximumSizeFileUpload: 5, // in MB
    };
  },
  props: {
    linkTo: {
      type: Function,
    },
    tokenCheck: {
      type: Function,
    },
    getStudent: {
      type: Function,
    },
  },
  methods: {
    fileToBase64(fileInstance) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileInstance);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },

    async submitForm() {
      this.isSubmitted = true;
      let activeStudentID = this.$refs.student_id.value;
      let absenceCategory = this.$refs.absence_category.value;
      let absenceDescription = this.$refs.absence_description.value;
      let absenceAttachments = "";

      if (absenceDescription == "") {
        alert("Deskripsi tidak boleh kosong");
        return false;
      }

      if (this.fileUploaded.length > 0) {
        let images = [];
        for (let file of this.fileUploaded) {
          images.push(file.imagesource);
        }
        let filesToString = JSON.stringify(images);
        absenceAttachments = filesToString;
      }

      let dataBody = {
        student_id: activeStudentID,
        absence_category: absenceCategory,
        absence_description: absenceDescription,
        absence_attachments: absenceAttachments,
      };

      let response = await this.$axios({
        method: "POST",
        url: process.env.VUE_APP_API_HOST + "/api/v1/absence",
        data: dataBody,
        headers: {
          "Access-Token": this.$cookies.get("access-token"),
        },
      });

      let responseData = response.data;
      if (responseData.statusCode == 200) {
        alert("Data berhasil dimasukan");
        this.isSubmitted = false;
        this.linkTo("/home");
        return;
      }

      alert(responseData.message);
      this.isSubmitted = false;
    },

    async imageUpload(ev) {
      let imageUploaderInstance = ev.target;
      let files = imageUploaderInstance.files;
      // Set those 2 variable to empty value
      this.fileUploaded = [];
      this.fileUploadErrors = [];

      if (files.length > 3) {
        this.fileUploadErrors.push({
          filename: "",
          errormessage: "Anda hanya boleh memasukan 3 gambar",
        });
        return;
      }

      for (let file of files) {
        let fileName = file.name;
        let fileType = file.type;
        let fileSize = file.size;

        // Check is file extension is forbidden
        if (!this.allowedFileExtensions.includes(fileType)) {
          this.fileUploadErrors.push({
            filename: fileName,
            errormessage: "Jenis file yang diupload tidak sesuai",
          });

          continue;
        }

        // Check is file size larger than 5mb
        if (Math.round(fileSize / 1000) > this.maximumSizeFileUpload * 1000) {
          this.fileUploadErrors.push({
            filename: fileName,
            errormessage: `Ukuran file tidak boleh melebihi ${this.maximumSizeFileUpload} MB`,
          });
          continue;
        }

        // Get the base64 encoded file
        let base64ImageUrl = await this.fileToBase64(file);
        this.fileUploaded.push({
          filename: fileName,
          filetype: fileType,
          filesize: fileSize,
          imagesource: base64ImageUrl,
        });
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

    const getStudents = await this.getStudent();
    let students = getStudents.data;
    this.students = students;
  },
};
</script>

<style scoped>
.header-wrapper {
  height: 300px;
}

.uploader {
  display: none;
}

.image-uploader {
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 25px;
}

.camera {
  font-size: 24px;
  color: #108ae4;
}

.text-regular {
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
}

.semi-bold {
  font-size: 18px;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
}

.text-bold {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
}
</style>