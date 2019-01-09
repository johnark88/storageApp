<template>
  <div class="login">
    <b-container>
      <b-row class="justify-content-center">
        <b-col></b-col>
        <b-col lg="6">
            <b-card bg-variant="dark" class="loginForm">
              
                <b-form-group horizontal
                              label="Email"
                              label-class="text-lg-right"
                              label-for="nestedStreet">
                  <b-form-input id="nestedStreet" v-model="user.email"></b-form-input>
                </b-form-group>
                <b-form-group horizontal
                              label="Password"
                              label-class="text-lg-right"
                              label-for="nestedCity">
                  <b-form-input id="nestedCity" v-model="user.password"></b-form-input>
                </b-form-group>
                <b-button class="loginSubmit" @click="login" type="submit">Submit</b-button>
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
      user:  {
        password: '',
        emaiil: ''
      },
    };
  },
  computed: {
    
  },
  methods: {
    login() {
      if (this.isValid) {
        const email = this.user.email;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          console.log('here')
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
  .login {
    color: white;
  }
  .loginSubmit {
    background-color: $colorBlue;
    border: $colorBlue;
    &:hover {
      background-color: $colorAqua;
    }
  }
</style>
