<template>
  <div class="login">
    <b-container>
      <b-row class="justify-content-center">
        <b-col></b-col>
        <b-col lg="6">
          <b-card bg-variant="dark" class="userLoginCard">
            <b-form @submit="checkForm" id="loginForm" novalidate>
              <b-form-group horizontal id="inputEmail" label="Email address:" label-for="inputEmail">
                <b-form-input id="inputEmail"
                              type="email"
                              v-model="user.email"
                              required
                              placeholder="Enter email">
                </b-form-input>
              </b-form-group>
              <b-form-group horizontal id="inputPassword" label="Password:" label-for="inputPassword">
                <b-form-input id="inputPassword"
                              type="password"
                              v-model="user.password"
                              required
                              placeholder="Enter password">
                </b-form-input>
              </b-form-group>
              <p></p>
              <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul class="errorList">
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </p>
              <p></p>
              <b-button class="loginSubmit" type="submit">Submit</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
  name: 'login',
  data() {
    return {
      errors: [],
      user:  {
        password: null,
        email: null,
      },
    };
  },
  computed: {
    
  },
  methods: {
   
    login() {
      console.log('Log in here');
      console.log(this.user);
      // const email = this.user.email;
      // const password = this.user.password;
      // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      //   // Handle Errors here.
      //   console.log('here')
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      // });
    },
  },
};
</script>
<style scoped lang="scss">
  .userLoginCard {
    color: white;
    font-size: 18px;
  }
  .loginSubmit {
    background-color: $colorBlue;
    border: $colorBlue;
    &:hover {
      background-color: $colorAqua;
    }
  }
  .errorList {
    list-style: none;
    margin-left: -2.3em;
  }
</style>
