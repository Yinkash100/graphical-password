<template>
  <div class="container">
    <h1>Hello {{ $cookies.get('username') }},</h1>
    <div class="center-div">
      Only logged in user can see this page
      <div>
        <button class="btn btn-secondary" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    logout() {
      this.$router.push('/login')
      this.$cookies.remove('username')
    }
  },
  beforeMount(){
    if(!this.$cookies.get('username')){
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss" scoped>
.center-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  min-width: 80%;
  .btn {
    margin: 30px 0;
  }
}
h1 {
  margin-top: 50px;
}
</style>