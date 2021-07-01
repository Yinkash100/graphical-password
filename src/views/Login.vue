<template>
  <div class="container">
    <div v-if="loading" class="loader">
      <Loader />
    </div>
    <div class="signup">
      <form class="form" @submit.prevent="login">
        <h1>Login</h1>
        <div v-if="formError.status" class="form__error">
          <img src="/icons/alarm.png" alt="">
          {{  formError.message }}
        </div>
        <div class="form__group">
          <label for="email" class="form__label">Email</label>
          <input v-model="userCredentials.email" id="email" type="text"  class="form__input" placeholder="Email">
          <div v-if="emailError.status" class="errorMessage">{{ emailError.error }}</div>
        </div>
        <div class="form__group u-margin-top-small">
          <div class="u-bold-text">Please select three images in order that you'll remember.</div>
          <div class="u-bold-text">This would be your graphical password</div>
          <div class="form__group img-pswd">
            <div v-for="(img, index) in passwordImageList" :key="index" class="img-pswd-main">
              <button v-if="img.selected === true" class="btn btn-close" @click="clickImage(img)"> x </button>
              <p v-if="img.position != 0" class="click-counter">{{ img.position }}</p>
              <img
                  :src="`/images/${img.name}`"
                  class="img-main-img"
                  :class="img.selected ? 'img-unclickable': 'img-clickable'"
                  @click="clickImage(img)">
            </div>
          </div>
          <div ref="pswd-error1" v-if="showPasswordError.status && showPasswordError.error === 'incomplete-image'" class="errorMessage">
            Please select three images as password
          </div>
          <div ref="pswd-error2" v-if="showPasswordError.status && showPasswordError.error === 'complete-image'" class="errorMessage">
            You can only select three images
            <br>To select a new image, please unselect some first
          </div>
        </div>
        <div class="form__group u-align-right">
          <button class="btn btn-secondary">Login</button>
        </div>
      </form>
      Have no account yet? <router-link to="/signup">Sign up</router-link>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Loader from "../components/Loader";
export default {
  name: 'Signup',
  components: {Loader},
  data(){
    return {
      userCredentials: {
        email: ''
      },
      loading: false,
      passwordCompleted: false,
      passwordImageList: [
        {
          id: 1,
          name: 'airplane.jpg',
          selected: false,
          position: 0
        },
        {
          id: 2,
          name: 'baloon.jpg',
          selected: false,
          position: 0
        },
        {
          id: 3,
          name: 'cup.jpg',
          selected: false,
          position: 0
        },
        {
          id: 4,
          name: 'headset.jpg',
          selected: false,
          position: 0
        },
        {
          id: 5,
          name: 'ice_cream.jpg',
          selected: false,
          position: 0
        },
        {
          id: 6,
          name: 'money.jpg',
          selected: false,
          position: 0
        },
        {
          id: 7,
          name: 'orange.jpg',
          selected: false,
          position: 0
        },

        {
          id: 8,
          name: 'puppy.jpg',
          selected: false,
          position: 0
        },

        {
          id: 9,
          name: 'television.jpg',
          selected: false,
          position: 0
        }
      ],
      selectedPswdImg: [],
      showPasswordError: {
        status: false,
        error: ''
      },
      usernameError: {
        status: false,
        error: ''
      },
      emailError: {
        status: false,
        error: ''
      },
      formError: {
        status: false,
        message: ''
      }
    }
  },
  beforeMount(){
    if(this.$cookies.get('username')){
      this.$router.push('/dashboard')
    }
  },
  methods: {
    clickImage(img){
      this.showPasswordError.status = false
      this.showPasswordError.error = ''
      if(this.isPswdSelected(img)){
        this.unselectImage(img)
        return
      }
      this.selectImage(img)
    },
    selectImage(image){
      if(!(this.selectedPswdImg.length <= 2)) {
        this.showPasswordError.status = true
        this.showPasswordError.error = 'complete-image'
        // this.$refs.scrollToView({behavior: 'smooth'})
        return
      }
      this.passwordImageList.find(x => x.id === image.id).selected = true
      this.selectedPswdImg.push(image)
      this.formatNumbering();
    },
    isPswdSelected(img){
      return img.selected;
    },
    unselectImage(image){
      this.passwordImageList.find(x => x.id === image.id).selected = false
      this.selectedPswdImg = this.selectedPswdImg.filter(x => x.id !== image.id)
      this.formatNumbering()
    },
    formatNumbering(){
      let count = 1;
      this.passwordImageList.forEach(x=>x.position = 0)

      this.selectedPswdImg.forEach(obj => {
        this.passwordImageList.find( x => x.id === obj.id).position = count;
        count++;
      })
    },
    login(){
      this.formError.message = false;
      this.emailError.status = false;
      this.showPasswordError.status = false;
      if(!(!this.validateEmail() || !this.validatePassword())){
        this.loading = true;
        this.userCredentials.password = this.selectedPswdImg;
        axios
            .post('/user/login', this.userCredentials)
            .then((resp)=>{
              this.userCredentials.email = ''
              this.userCredentials.password = ''
              this.selectedPswdImg = []
              this.$cookies.set('username', resp.data.user.username)
              this.$router.push('/dashboard')

            })
            .catch(err => {
              if(err.response.status === 400){
                this.formError.message = "Invalid username or password"
                this.formError.status = true
                this.loading = false;
                window.scroll(0,0)
              }
              console.log(err)
            });
      }

    },
    validateEmail(){
      if(this.userCredentials.email === ''){
        this.emailError.status = true
        this.emailError.error = 'Please input an email'
        return false
      }
      else {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(String(this.userCredentials.email).toLowerCase())) {
          return true;
        }
        else{
          this.emailError.status = true
          this.emailError.error = 'Invalid Email'
          return false
        }
      }


    },
    validatePassword() {
      if(this.selectedPswdImg.length === 3){
        return true
      }
      else {
        this.showPasswordError.status = true
        this.showPasswordError.error = 'complete-image'
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 10px;
}

.signup{
  max-width: 500px;
  padding:70px 25px;
  margin: 40px auto;
  border: 1px solid $color-grey;
  border-radius: 25px;
  @include respond(tab-port){
    padding:20px 10px;
    margin: 20px auto;
  }
}
h1 {
  color: $color-secondary;
  padding-bottom: 25px;
  @include respond(tab-port){
    padding-bottom: 10px;
  }
}
.form__group{
  text-align: left;
}
.img {
  &-pswd {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &-main {
      min-width: calc(100% / 3);
      width: calc(100% / 3);
      position: relative;
    }
  }
  &-main {
    &-img {
      width: 100%;
      height: auto;
    }
  }
}
.btn-close{
  display: block;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  top: 10px;
  right: 10px;
  background: lightgrey;
  color: white;
  padding: 3.25px 7.5px;
  font-weight: 600;
  border-radius: 50%;
}
.click-counter {
  display: block;
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 40px;
  font-weight: 600;
}
.img-clickable {
  cursor: pointer;
}
.img-unclickable {
  cursor: not-allowed;
  filter: brightness(50%);
}
.u-align-right {
  margin-top: 40px;
  text-align: right;
}
.form{
  margin-bottom: 30px;
}
.form__error {
  padding: 5px 20px;
  text-align: center;
  color: red;
  background-color: $color-white;
  border: 1px solid red;
  width: 80%;
  margin: 20px auto;
  font-weight: bold;
  img {
    width: 20px;
    height: auto;
    margin-right: 10px;
  }
}
.u-margin-top-small {
  margin-top: 20px;
}
</style>