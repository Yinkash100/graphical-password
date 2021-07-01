<template>
  <div class="load">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
.load {
  display: block;
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color-grey, 0.7);
}
.loader {
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  border: 8px solid $color-primary;
  border-radius: 50%;
  border-top: 8px solid $color-secondary;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>