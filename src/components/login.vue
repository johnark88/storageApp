<template>
  <div class="login">
    <b-btn id="signIn" @click="showForm" v-if="hideButton">Sign In</b-btn> 
    <b-container>
      <b-row class="justify-content-center">
        <b-col></b-col>
        <b-col lg="6">
          <b-card bg-variant="dark" class="userLoginCard" v-if="showSignIn">
            <b-form @submit.prevent="submit" id="loginForm">
              <b-form-group horizontal id="inputEmail" label="Email address:" label-for="inputEmail">
                <b-form-input id="inputEmail"
                              type="text"
                              v-model="newUser.email"
                              v-validate="'required|email'"
                              placeholder="Enter email" name="Email">
                </b-form-input>
              </b-form-group>

              <b-form-group horizontal id="inputPassword" label="Password" label-for="inputEmail">
                <input class="formInput" v-validate="'required|min:7|alpha_num'" name="password" type="password" placeholder="Enter password" ref="password" id="inputPassword">
              </b-form-group>

              <b-form-group horizontal id="inputPasswordConfirm" label="Confirm Password" label-for="inputPassword">
                <input class="formInput" v-validate="'required|confirmed:password'" name="password_confirmation" type="password" v-model="newUser.password"  placeholder="Confirm password"  data-vv-as="password" id="inputPasswordConfirm" > 
              </b-form-group>
              <div v-show="errors.any()">
                <b-card bg-variant="danger" class="loginErrorCard">
                  <div v-if="errors.has('Email')">
                    <p>{{ errors.first('Email') }}</p>
                  </div>
                  <div v-if="errors.has('password')">
                    <p>{{ errors.first('password') }}</p>
                  </div>
                  <div v-if="errors.has('password_confirmation')">
                    <p>{{ errors.first('password_confirmation') }}</p>
                  </div>
                </b-card>
              </div>
              <div v-if="ShowfirebaseError">
                <b-card class="loginErrorCard">
                  <p> {{ firebaseError[0] }}</p>
                </b-card>
              </div>
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
import { mapGetters } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      firebaseError: [],
      hideButton: true,
      showSignIn: false,
      ShowfirebaseError: false,
      newUser:  {
        password: null,
        email: null,
      },
      nGrok: 'http://ffae935b.ngrok.io',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    user (auth) {
      if(!!auth){
        this.$route.query.redirect;
      }
    }
  },
  methods: {
    getUserProfile() {
      axios.get(`${this.nGrok}/users/${this.userid}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    showForm() {
      // show the sign up form
      this.showSignIn = true;
      // hide the button on sign up selected
      this.hideButton = false;
    },
    submit() {
       this.$validator.validateAll().then((response) => {
          if ( !response ) {
            console.log('Validation returned false');
            return false;
          } else {
            this.login();
          }
        })
        .catch((e) => {
          console.log(e, 'submit function');
        })
      },
      async login() {
        const email = this.newUser.email;
        const password = this.newUser.password;
        const auth = await this.$auth.login(email, password);
        console.log(auth.user.uid, 'auth');
        this.userid = auth.user.uid;
        this.getUserProfile();
        this.$router.push('/user-files');
      },
  },
};
</script>
<style scoped lang="scss">
#signIn {
  background-color: $colorBlue;
  border: $colorBlue;
  margin: 5px;
  padding: 10px;
  width: 7em;
  &:hover {
    background-color: $hoverBlue;
  }
}
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
  .formInput {
    border-radius: 5px;
    width: 20.6em;
    height: 2.3em;
    padding: 5px;

      input:focus {
        outline: none;
      }
  }
  .loginErrorCard {
    margin: 1em;
  }
</style>
