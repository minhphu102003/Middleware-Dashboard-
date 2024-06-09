<template>
  <div class="container">
    <div class="toolBox">
      <div class="addProduct">
        <button>Add Product</button>
        <i class="fa-solid fa-plus"></i>
      </div>
      <div class="boxSearch">
        <label for="">Tìm kiếm ở đây</label>
        <input @change="onHandleSearch" type="text" />
      </div>
    </div>
    <div class="contentBox">
      <div class="descriptionProduct">
        <div class="element">
          <label for="">Name</label>
          <input type="text" />
        </div>
        <div class="element">
          <label for="">Category</label>
          <input type="text" />
        </div>
        <div class="element">
          <label for="">Price</label>
          <input type="text" />
        </div>
        <div class="element">
          <img src="" alt="Tobi" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: [],
  data() {
    return {
      sreachText: "",
      dataSearch: null,
    };
  },
  methods: {
    handleSearch(event) {
      this.sreachText = event.target.value; // Đúng là "searchText" thay vì "sreachText"
      console.log(this.sreachText);
      const stringAPI = "http://localhost:4000/api/products/" + this.sreachText; // Chuỗi URL cần được cộng thêm vào "searchText"
      axios
        .get(stringAPI)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.container {
  height: 70vh;
  width: 100%;
  padding: 20px 10px 10px 10px;
  display: flex;
  align-content: center;
  flex-direction: column;
  background-color: white;
}

.toolBox {
  height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}

.contentBox {
  height: 50vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
}

.addProduct {
  height: 3vh;
  width: auto;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  border: 1px solid #fafafa;
  border-radius: 4px;
  background-color: rgb(134, 233, 233);
  padding: 1%;
}

.addProduct button {
  border: none;
  background-color: transparent;
  color: white;
  font-weight: 600;
}

.addProduct i {
  color: white;
  font-size: 20px;
}

.boxSearch {
  display: flex;
  align-content: center;
  justify-content: flex-start;
  padding-top: 10px;
}

.boxSearch label {
  color: black;
  margin-right: 10px;
  font-weight: 400;
  font-size: 16px;
}

.boxSearch input {
  height: 2vh;
  width: 200px;
  border: 1px solid rgb(88, 172, 213);
  border-radius: 4px;
}
</style>
