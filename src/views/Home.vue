<template>
  <div>
    <div class="container pl-4 pr-4 pb-4">
      <div class="row mt-4 pt-4 ml-2">
        <div class="col-3 col-md-2 offset-md-2 my-auto">
          <span class="material-icons avatar-default"> account_circle </span>
        </div>
        <div class="col-6 col-md-4">
          <h5 class="text-heading-1-index">
            Halo
            <span class="text-heading-1-semibold-index">
              {{ userFullname || "Mohon menunggu ..." }}</span
            >
          </h5>
          <p>Orang tua siswa</p>
        </div>
        <div class="col-3 my-auto text-center">
          <span @click="logout()" class="material-icons icon-log-out"
            >exit_to_app</span
          >
        </div>
      </div>

      <div class="row">
        <div class="col-10 offset-1">
          <select
            name="nama-siswa"
            id=""
            class="input-sm form-control"
            @change="changeActiveStudent"
          >
            <option value="none" v-if="studentData.length == 0">
              Mohon tunggu ...
            </option>
            <option
              v-for="(student, student_index) in studentData"
              :key="student_index"
              :value="student._id"
            >
              {{ student.fullname }}
            </option>
          </select>
        </div>
      </div>

      <div class="presenceGroup" v-if="activeStudentAttendStats">
        <div
          class="activePresenceGroup"
          v-if="
            !activeStudentAttendStats.leaving_datetime &&
            !activeStudentAttendStats.absence
          "
        >
          <div class="row">
            <div class="col-12">
              <img
                class="img img-fluid pl-4 mx-auto d-block"
                src="@/assets/images/illustration/sudah_tiba 1.svg"
                alt="Responsive image"
              />
              <h4 class="text-center text-heading-2-index">
                <b>Anak Anda Sudah Sampai!</b>
              </h4>
              <p class="text-center text-heading-2-index">
                <span
                  class="text-heading-2-semibold-indext"
                  v-if="activeStudentAttend"
                  >{{
                    studentData.filter((student) => {
                      return student._id == activeStudentAttend;
                    })[0].fullname
                  }}</span
                >
                sudah sampai di sekolah.
              </p>
            </div>
          </div>

          <div class="row ml-4 pl-4">
            <div class="col-2 offset-lg-1 col-md-4 pr-0 text-right">
              <span class="material-icons"> query_builder </span>
            </div>
            <div class="col-7 col-lg-3">
              <p class="text-heading-1-index">
                Hari Ini Pada
                {{
                  this.$moment(
                    activeStudentAttendStats.present_datetime
                  ).format("HH:mm")
                }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="activePresenceGroup"
          v-else-if="activeStudentAttendStats.leaving_datetime"
        >
          <div class="row">
            <div class="col-12">
              <img
                class="img img-fluid pl-4 mx-auto d-block"
                src="@/assets/images/illustration/sudah_tiba 1.svg"
                alt="Responsive image"
              />
              <h4 class="text-center text-heading-2-index">
                <b>Anak Anda Sudah Pulang!</b>
              </h4>
              <p class="text-center text-heading-2-index">
                <span
                  class="text-heading-2-semibold-indext"
                  v-if="activeStudentAttend"
                  >{{
                    studentData.filter((student) => {
                      return student._id == activeStudentAttend;
                    })[0].fullname
                  }}</span
                >
                sudah pulang dari sekolah. Jika belum sampai segera hubungi anak
                anda.
              </p>
            </div>
          </div>

          <div class="row ml-4 pl-4">
            <div class="col-2 offset-lg-1 col-md-4 pr-0 text-right">
              <span class="material-icons"> query_builder </span>
            </div>
            <div class="col-7 col-lg-3">
              <p class="text-heading-1-index">
                Hari Ini Pada
                {{
                  this.$moment(
                    activeStudentAttendStats.leaving_datetime
                  ).format("HH:mm")
                }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="activePresenceGroup"
          v-else-if="activeStudentAttendStats.absence"
        >
          <div class="row">
            <div class="col-12">
              <img
                class="img img-fluid pl-4 mx-auto d-block"
                src="@/assets/images/illustration/sudah_tiba 1.svg"
                alt="Responsive image"
              />
              <h4 class="text-center text-heading-2-index">
                <b>Izin telah terkirim!</b>
              </h4>
              <p class="text-center text-heading-2-index">
                Izin telah dikirimkan
              </p>
            </div>
          </div>

          <div class="row ml-4 pl-4">
            <div class="col-2 offset-lg-1 col-md-4 pr-0 text-right">
              <span class="material-icons"> query_builder </span>
            </div>
            <div class="col-7 col-lg-3">
              <p class="text-heading-1-index">
                Hari Ini Pada
                {{
                  this.$moment(
                    activeStudentAttendStats.absence_datetime
                  ).format("HH:mm")
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="unknownPresenceGroup" v-else>
        <div class="row">
          <div class="col-12">
            <img
              class="img img-fluid pl-4 mx-auto d-block"
              src="@/assets/images/illustration/belum_tiba.svg"
              alt="Responsive image"
            />
            <h4 class="text-center text-heading-2-index">
              <b>Anak Anda Belum Sampai!</b>
            </h4>
            <p class="text-center text-heading-2-index">
              <span
                class="text-heading-2-semibold-indext"
                v-if="activeStudentAttend"
                >{{
                  studentData.filter((student) => {
                    return student._id == activeStudentAttend;
                  })[0].fullname
                }}</span
              >
              belum sampai di sekolah.
            </p>
          </div>
        </div>

        <div class="row text-center">
          <div class="col-8 col-lg-8 mx-auto">
            <button
              @click="linkTo('/permission')"
              class="btn btn-block btn-primary-app"
            >
              BUAT IZIN
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Vue from "vue";
import Axios from "@/plugins/Axios";
import AuthToken from "@/plugins/AuthToken";
import Jwt from "@/plugins/JsonWebToken";
import SweetAlert from "@/plugins/SweetAlert";
import SocketClient from "@/plugins/Socket";
import Moment from "@/plugins/Moment";
import { Plugins } from "@capacitor/core";
const { PushNotifications } = Plugins;

Vue.use(Axios);
Vue.use(AuthToken);
Vue.use(Jwt);
Vue.use(SweetAlert);
Vue.use(SocketClient);
Vue.use(Moment);

export default {
  data() {
    return {
      userFullname: null,
      studentData: [],
      attendanceStatus: null,
      activeStudentAttend: null,
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
    getStudentAttend: {
      type: Function,
    },
    syncFCMToken: {
      type: Function,
    },
  },

  async created() {
    let io = this.$socketClient(process.env.VUE_APP_SOCKET_HOST);
    let accessToken = this.$cookies.get("access-token");
    let decodedToken = this.$jwt.decode(accessToken);
    let userID = decodedToken.userID;

    io.emit("socketInit", { userUniqueID: userID });
    io.on("attendanceUpdate", async () => {
      const studentAttend = await this.getStudentAttend();
      this.attendanceStatus = studentAttend;
    });

    PushNotifications.requestPermission().then((result) => {
      if (result.granted) {
        PushNotifications.register();
      } else {
        console.log("Subscribe disallowed by user");
      }
    });

    PushNotifications.addListener("registration", async (token) => {
      await this.syncFCMToken(token.value);
    });
  },

  destroyed() {
    PushNotifications.removeAllListeners();
  },

  async mounted() {
    const tokenCheck = await this.tokenCheck();
    if (!tokenCheck) {
      this.$cookies.remove("access-token");
      this.$cookies.remove("refresh-token");
      this.linkTo("/login");
      return false;
    }

    let accessToken = this.$cookies.get("access-token");
    let userIdentity = this.$jwt.decode(accessToken);
    this.userFullname = userIdentity.fullname;

    const studentResponse = await this.getStudent();
    if (studentResponse) {
      if (studentResponse.statusCode == 200) {
        this.studentData = studentResponse.data;
        let firstStudent = this.studentData[0];
        this.activeStudentAttend = firstStudent._id;
      }
    }

    const studentAttend = await this.getStudentAttend();
    this.attendanceStatus = studentAttend;
  },

  methods: {
    changeActiveStudent(ev) {
      const target = ev.currentTarget;
      let studentID = target.options[target.selectedIndex].value;
      this.activeStudentAttend = studentID;
    },

    logout() {
      this.$swal
        .fire({
          title: `<h1 class="text-heading-1">Yakin Ingin Keluar?</h1>`,
          html: `<p class="text-paragraph-sweet">Jika iya tekan tombol merah</p>`,
          icon: "warning",
          showConfirmButton: false,
          showDenyButton: true,
          showCancelButton: true,
          cancelButtonText: "Batal",
          denyButtonText: "Keluar",
          denyButtonColor: "#E41010",
          cancelButtonColor: "#FFFFFF",
          customClass: {
            cancelButton: "cancel-text-color",
            denyButton: "deny-button-font",
          },
        })
        .then((result) => {
          if (result.isDenied) {
            this.$cookies.remove("access-token");
            this.$cookies.remove("refresh-token");
            this.linkTo("/login");
          }
        });
    },
  },

  computed: {
    activeStudentAttendStats() {
      if (this.attendanceStatus) {
        let activeStudentStat = this.attendanceStatus.filter(
          (studentAttend) => {
            return studentAttend.studentID == this.activeStudentAttend;
          }
        );

        activeStudentStat = activeStudentStat[0];
        return activeStudentStat.attendanceStatus;
      }

      return false;
    },
  },
};
</script>

<style scoped>
.avatar-default {
  font-size: 51px;
  color: #d4d4d4;
}

.user-avatar {
  border-radius: 100%;
  width: 51px;
  height: 51px;
  background-size: cover;
  background-repeat: no-repeat;
  float: right;
}

.student-avatar {
  border-radius: 100%;
  width: 51px;
  height: 51px;
}

.card-wrap {
  background-color: #27b2ec;
  border: 1px solid rgba(78, 78, 78, 0.08);
  box-shadow: 0px 5px 10px rgba(241, 242, 242, 0.5);
  border-radius: 10px;
  margin: auto;
  height: 198px;
}

.card-wrap-2 {
  border: 1px solid rgba(78, 78, 78, 0.08);
  border-radius: 10px;
  margin: auto;
  min-height: 93px;
  color: black;
  overflow: hidden;
}

.arrow-more {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.attendance-point {
  width: 10px;
  height: 10px;
  margin-top: 8px;
  background-color: #26de81;
  border-radius: 100%;
}

.attendance-home {
  width: 10px;
  height: 10px;
  margin-top: 8px;
  background-color: #45aaf2;
  border-radius: 100%;
}

.card-header {
  background-color: white;
}

.text-heading-1-index {
  font-family: "Baloo 2", cursive;
  font-weight: 300;
}

.text-heading-1-semibold-index {
  font-family: "Baloo 2", cursive;
  font-weight: 800;
}

.text-heading-2-index {
  font-family: "Baloo 2", cursive;
  font-size: 800;
  color: #505050;
}

.text-heading-2-semibold-index {
  font-family: "Baloo 2", cursive;
  font-weight: 100;
}

.card-index {
  background: #ffffff;
  border: 1px solid rgba(227, 227, 227, 0.5);
  box-sizing: border-box;
  box-shadow: 0px 20px 15px -20px rgba(184, 184, 184, 0.3);
  border-radius: 10px;
}

.icon-log-out-index {
  color: rgba(0, 0, 0, 0.5);
}
</style>
