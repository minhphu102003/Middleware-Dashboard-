<template>
  <div class="sidebar">
    <ul class="widget widget-menu unstyled">
      <li class="active">
        <a @click="handleDashboardClick">
          <i class="menu-icon icon-dashboard"></i>Dashboard
        </a>
      </li>

      <li>
        <a @click="handleEmployeeClick">
          <i class="menu-icon icon-tasks"></i>Employee
        </a>
      </li>
      <li>
        <a @click="handleProductClick">
          <i class="menu-icon icon-tasks"></i>Product
        </a>
      </li>
    </ul>
    <ul class="widget widget-menu unstyled">
      <li>
        <a class="collapsed" data-toggle="collapse" @click="handleTagLinkClick">
          <i class="menu-icon icon-cog"> </i
          ><i class="icon-chevron-down pull-right"></i
          ><i class="icon-chevron-up pull-right"> </i>More Pages
        </a>
        <ul id="togglePages" class="collapse unstyled">
          <li>
            <a href="#"><i class="icon-inbox"></i>Login </a>
          </li>
          <li>
            <a href="#"><i class="icon-inbox"></i>Profile </a>
          </li>
          <li>
            <a href="#"><i class="icon-inbox"></i>All Users </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#"><i class="menu-icon icon-signout"></i>Logout </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["Data"],
  data() {
    return {
      CleaningData: this.Data,
      IsEmployeeComponent: false,
      IsProductComponent: false,
    };
  },
  methods: {
    handleEmployeeClick() {
      if (!this.IsEmployeeComponent) {
        this.IsEmployeeComponent = true;
        this.IsProductComponent = false;
        this.$emit("changeComponent", {
          componentName: "EmployeeComponent",
          data: this.EmployeeData,
        });
      }
    },
    handleProductClick() {
      if (!this.IsProductComponent) {
        this.IsProductComponent = true;
        this.$emit("changeComponent", {
          componentName: "ProductComponent",
          data: this.CleaningData,
        });
        this.IsEmployeeComponent = false;
      }
    },
    handleDashboardClick() {
      if (this.IsEmployeeComponent || this.IsProductComponent) {
        this.$emit("changeComponent", {
          componentName: "IndexComponnet",
          data: this.EmployeeData,
        });
        this.IsEmployeeComponent = false;
        this.IsProductComponent = false;
      }
    },
    handleTagLinkClick(event) {
      event.preventDefault();
      const element = event.target;
      element.classList.toggle("collapsed");
      const nextElement = event.target.nextElementSibling;
      if (nextElement) {
        // Kiểm tra nếu phần tử chưa có class "in"
        if (!nextElement.classList.contains("in")) {
          // Thêm class "in"
          nextElement.classList.add("in");
          // Đặt height = auto
          nextElement.style.height = "auto";
        } else {
          // Nếu đã có class "in", xóa nó đi
          nextElement.classList.remove("in");
          // Đặt height = 0px
          nextElement.style.height = "0px";
        }
      }
    },
  },
};
</script>

<style></style>
