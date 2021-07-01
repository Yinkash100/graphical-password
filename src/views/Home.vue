<template>
  <div class="home">
    <h1>Graphical based authentication demo</h1>
    <div class="home-group">
      <div class="home-btn">
        <router-link to="/signup" class="btn btn-tetiary">Signup</router-link>
      </div>
      <div class="home-btn">
        <router-link to="/login" class="btn btn-secondary">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  &-group{
    position: absolute;
    // background: aliceblue;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    @include respond(tab-port){
      flex-wrap: wrap;
      top: 60%;
    }
  }
  &-btn {
    padding: 150px 90px;
    @include respond(tab-land){
      padding: 100px 60px;
    }
    @include respond(tab-port){
      padding: 30px 30px;
    }
  }
}
h1 {
  margin-top: 50px;
}
</style>