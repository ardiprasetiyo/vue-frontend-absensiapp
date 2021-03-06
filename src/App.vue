<template>
  <div id="app">
    <router-view
      :linkTo="linkTo"
      :tokenCheck="tokenCheck"
      :getStudent="getStudentData"
      :getStudentAttend="getStudentAttend"
      :syncFCMToken="syncFCMToken"
    />
  </div>
</template>

<script>
/* eslint-disable */

import Vue from "vue";
import Jwt from "@/plugins/JsonWebToken";
import AuthToken from "@/plugins/AuthToken";
import Axios from "@/plugins/Axios";

Vue.use(Jwt);
Vue.use(AuthToken);
Vue.use(Axios);

export default {
  name: "App",
  methods: {
    linkTo(url = "/home") {
      this.$router.push(url);
    },

    async syncFCMToken(FCMToken) {
      const validToken = await this.tokenCheck();
      if (validToken) {
        const accessToken = this.$cookies.get("access-token");
        const { userID } = await this.$jwt.decode(accessToken);
        try {
          const response = await this.$axios({
            method: "PATCH",
            url: process.env.VUE_APP_API_HOST + "/api/v1/fcm",
            data: {
              uid: userID,
              "fcm-token": FCMToken,
            },
            headers: {
              "Access-Token": accessToken,
            },
          });
          if (response.data.statusCode !== 200) {
            console.warn(
              `Error Synchronizing FCM Token : ${response.data.message}`
            );
          }
        } catch (exception) {
          console.warn(`Error Synchronizing FCM Token : ${exception.message}`);
        }
      }
    },

    async getStudentAttend() {
      const validToken = await this.tokenCheck();
      const accessToken = this.$cookies.get("access-token");

      if (validToken) {
        try {
          const requestResponse = await this.$axios({
            method: "GET",
            url: process.env.VUE_APP_API_HOST + "/api/v1/attendance",
            headers: {
              "Access-Token": accessToken,
            },
          });

          if (requestResponse.status !== 200) {
            throw new Error(`Error with status code ${requestResponse.status}`);
          }

          let studentsAttendance = requestResponse.data.data;
          return studentsAttendance;
        } catch (Exception) {
          console.log(Exception.message);
          return false;
        }
      }
    },

    async getStudentData() {
      const accessToken = this.$cookies.get("access-token");
      try {
        const studentData = await this.$axios({
          method: "GET",
          url: process.env.VUE_APP_API_HOST + "/api/v1/student",
          headers: {
            "Access-Token": accessToken,
          },
        });

        if (studentData.status == 200) {
          return studentData.data;
        }

        throw new Error("Internal Server Error");
      } catch (Exception) {
        console.log(Exception.message);
      }
    },

    async generateNewToken(accessToken, refreshToken) {
      try {
        return this.$authtoken.generateToken(accessToken, refreshToken);
      } catch (Exception) {
        console.log(Exception.message);
        return false;
      }
    },

    async tokenCheck() {
      const accessToken = this.$cookies.get("access-token");
      const refreshToken = this.$cookies.get("refresh-token");
      if (!accessToken || !refreshToken) {
        return false;
      }

      try {
        this.$jwt.verify(accessToken, process.env.VUE_APP_PUBLICKEY);
        return true;
      } catch (Exception) {
        if (Exception.message == "jwt expired") {
          let tokenResponse = await this.generateNewToken(
            accessToken,
            refreshToken
          );
          if (!tokenResponse) {
            return false;
          }
          let token = tokenResponse.data.data;
          if (tokenResponse.data.statusCode == 200) {
            let newAccessToken = token.access_token;
            let newRefreshToken = token.refresh_token;
            this.$cookies.remove("access-token");
            this.$cookies.remove("refresh-token");
            this.$cookies.set("access-token", newAccessToken);
            this.$cookies.set("refresh-token", newRefreshToken);
            return true;
          }
          return false;
        }
        return false;
      }
    },
  },
};
</script>

<style scoped></style>