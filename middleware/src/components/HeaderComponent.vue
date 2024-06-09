<template>
  <div class="container">
    <a
      class="btn btn-navbar"
      data-toggle="collapse"
      data-target=".navbar-inverse-collapse"
    >
      <i class="icon-reorder shaded"></i> </a
    ><a class="brand" href="~/">Admin </a>
    <div class="nav-collapse collapse navbar-inverse-collapse">
      <ul class="nav nav-icons">
        <li class="active">
          <a href="#"><i class="icon-envelope"></i></a>
        </li>
        <li>
          <a href="#"><i class="icon-eye-open"></i></a>
        </li>
        <li>
          <a href="#"><i class="icon-bar-chart"></i></a>
        </li>
      </ul>
      <form class="navbar-search pull-left input-append" action="#">
        <input type="text" class="span3" />
        <button class="btn" type="button">
          <i class="icon-search"></i>
        </button>
      </form>
      <ul class="nav pull-right">
        <li
          class="nav-user dropdown"
          :class="{ open: isDropdownOpen }"
          @click="handleUserClick"
        >
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <img :src="getImagePath('tobi1.jpg')" class="nav-avatar" />
            <b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">Your Profile</a></li>
            <li><a href="#">Edit Profile</a></li>
            <li><a href="#">Account Settings</a></li>
            <li class="divider"></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- /.nav-collapse -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false, // Biến để theo dõi trạng thái của dropdown
    };
  },
  methods: {
    getImagePath(fileName) {
      // Đường dẫn tới thư mục assets/images
      return require(`@/assets/images/${fileName}`);
    },
    handleUserClick() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>

<style></style>
