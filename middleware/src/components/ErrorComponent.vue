<template>
  <div class="cover">
    <h1>Error <span>404</span></h1>
    <h2>Multiple Choices</h2>
    <p>Error Code: 404 - Multiple Choices</p>
    <p v-if="error">{{ error }}</p>
    <div v-else>
      <p>{{ data }}</p>
    </div>
    <p class="corner">Author by Tobi@2024</p>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style scoped>
.cover {
  color: #fff;
  background-color: #ffb300;
  height: 70vh;
  width: 100vw;
  text-align: center;
  display: table;
  position: relative;
}

a,
a:hover {
  color: #fff;
}

.btn-back {
  background-color: #ff6f00;
}

.btn-back:hover {
  background-color: #e56300;
}

h1 {
  font-weight: 300;
  margin: 0;
  font-size: 52px;
}

h1 span {
  font-weight: 700;
  color: white;
}

h2 {
  font-weight: 100;
  margin: 0;
  font-size: 24px;
}

p {
  font-size: 18px;
  font-family: "Courier New", Courier, monospace;
  letter-spacing: 1px;
}

a {
  text-decoration: none;
  font-size: inherit;
}

.cover {
  display: table-cell;
  vertical-align: middle;
  padding: 0 20px;
}

.btn-back {
  position: absolute;
  top: 12px;
  left: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 300;
  font-size: 12px;
}

.btn-back i {
  margin-right: 8px;
}

.corner {
  position: absolute;
  bottom: 0;
  right: 10px;
  color: rgb(194, 35, 183);
  font-size: 16px;
  font-weight: 600;
}
</style>
