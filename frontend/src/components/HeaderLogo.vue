<script>
export default {
  name: 'header-logo',
};
</script>

<template>
  <header>
    <img src="../assets/img/ee_logo.png" />
  </header>
</template>

<style scoped>
img {
  width: 200px;
}
@media (max-width: 700px) {
  img {
    display: block;
    margin: auto;
  }
}
</style>
