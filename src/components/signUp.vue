<template>
  <div class="signUp">
    <b-btn id="signUp" @click="showForm" v-if="hideButton">Sign Up</b-btn> 
    <b-container>
      <b-row class="justify-content-center">
        <b-col></b-col>
        <b-col lg="6">
          
          <b-card bg-variant="dark" class="userLoginCard" v-if="showSignup">
            <b-form @submit.prevent="submit" id="loginForm">
               <b-form-group horizontal id="inputName" label="Your Name:" label-for="inputName">
                <b-form-input id="inputName"
                              type="text"
                              v-model="user.name"
                              v-validate="'required'"
                              placeholder="Enter your name" name="Name">
                </b-form-input>
              </b-form-group>
              <b-form-group horizontal id="inputEmail" label="Email address:" label-for="inputEmail">
                <b-form-input id="inputEmail"
                              type="text"
                              v-model="user.email"
                              v-validate="'required|email'"
                              placeholder="Enter email" name="Email">
                </b-form-input>
              </b-form-group>

              <b-form-group horizontal id="inputPassword" label="Password" label-for="inputEmail">
                <input class="formInput" v-validate="'required|min:7|alpha_num'" name="password" type="password" placeholder="Enter password" ref="password" id="inputPassword">
              </b-form-group>

              <b-form-group horizontal id="inputPasswordConfirm" label="Confirm Password" label-for="inputPassword">
                <input class="formInput" v-validate="'required|confirmed:password'" name="password_confirmation" type="password" v-model="user.password"  placeholder="Confirm password"  data-vv-as="password" id="inputPasswordConfirm" > 
              </b-form-group>
               <div v-show="errors.any()">
                <b-card class="loginErrorCard">
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
export default {
  name: 'signUp',
  data() {
    return {
      firebaseError: [],
      hideButton: true,
      showSignup: false,
      ShowfirebaseError: false,
      user:  {
        password: null,
        email: null,
        name: null,
      },
    };
  },
  methods: {
    showForm() {
      // show the sign up form
      this.showSignup = true;
      // hide the button on sign up selected
      this.hideButton = false;
    },
    submit() {
       this.$validator.validateAll().then((response) => {
          if ( !response ) {
            console.log('Validation returned false');
            return false;
          } else {
            this.signUp();
          }
        })
        .catch((e) => {
          console.log(e, 'submit function');
        })
      },
      signUp() {
        const email = this.user.email;
        const password = this.user.password;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          this.firebaseError.push(error.message);

          if (this.firebaseError != null) {
           
            this.ShowfirebaseError = true; 
             console.log(this.ShowfirebaseError, 'error')
          }
          console.log(this.firebaseError);
        });
      },
      newUser() {
        // get user name and some google profile data to save
        // save to firebase db

      },
      signOut() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
        });
      }
  },
};
</script>
<style scoped lang="scss">
#signUp {
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
    color: white;
    background-color: $dangerRed;
  }
</style>
