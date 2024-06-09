<template>
  <div>
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner"><HeaderComponent ref="headerComponent" /></div>
      <!-- /navbar-inner -->
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="span3">
            <SidebarComponent
              ref="sideBarComponent"
              @changeComponent="handleChangeComponent"
              :Data="cleanedEmployeeData"
              :Error="apiError"
            />
            <!--/.sidebar-->
          </div>
          <!--/.span3-->
          <div class="span9">
            <component
              :is="currentComponent"
              :Data="cleanedEmployeeData"
              :Error="apiError"
              :Job="jobsHistoryData"
              :Benefit="beneFitPLansData"
              :Employee="employee"
              @changeComponent="handleChangeComponent"
            />
            <!--/.content-->
          </div>
          <!--/.span9-->
        </div>
      </div>
      <!--/.container-->
    </div>
    <div class="footer">
      <div class="container">
        <b class="copyright">&copy; 2014 Admin - DaoNguyen </b>All rights
        reserved.
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import IndexComponnet from "./components/IndexComponnet.vue";
import SidebarComponent from "./components/SidebarComponent.vue";
import EmployeeComponent from "./components/EmployeeComponent.vue";
import ErrorComponent from "./components/ErrorComponent.vue";
import ProductComponent from "./components/ProductComponent.vue";
import UpdateEmployee from "./components/UpdateEmployee.vue";
// import { cleaningData } from "./uses/mergeData";
// import { getHRData, getSIPData } from "./uses/getAPI";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    HeaderComponent,
    SidebarComponent,
    IndexComponnet,
    EmployeeComponent,
    ErrorComponent,
    ProductComponent,
    UpdateEmployee,
  },
  setup() {
    const cleanedEmployeeData = ref([]);
    const jobsHistoryData = ref([]);
    const beneFitPLansData = ref([]);
    // const emergencyContactsData = ref([]);
    let apiError = false;
    const dataLoaded = ref(false);
    onMounted(async () => {
      try {
        const [
          cleanedEmployeeResponse,
          jobsHistoryResponse,
          beneFitPLansResponse,
        ] = await Promise.all([
          axios.get("http://localhost:8000/api/handleData"),
          axios.get("http://localhost:8000/api/jobHistory"),
          axios.get("http://localhost:8000/api/benefitPlan"),
        ]);
        cleanedEmployeeData.value = cleanedEmployeeResponse.data.data;
        jobsHistoryData.value = jobsHistoryResponse.data.data;
        beneFitPLansData.value = beneFitPLansResponse.data.data;
        dataLoaded.value = true;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    });
    return {
      cleanedEmployeeData: computed(() =>
        dataLoaded.value ? cleanedEmployeeData.value : null
      ),
      apiError: computed(() => (dataLoaded.value ? apiError : false)),
      jobsHistoryData: computed(() =>
        dataLoaded.value ? jobsHistoryData.value : null
      ),
      beneFitPLansData: computed(() =>
        dataLoaded.value ? beneFitPLansData.value : null
      ),
    };
  },
  data() {
    return {
      currentComponent: IndexComponnet,
      componentData: null,
      employee: null,
    };
  },
  methods: {
    handleChangeComponent({ componentName, data, employee }) {
      this.currentComponent = componentName;
      console.log(data);
      console.log(this.cleanedEmployeeData.value);
      this.cleanedEmployeeData.value = data;
      console.log(this.cleanedEmployeeData.value);
      this.employee = employee;
    },
  },
};
</script>

<style>
@import url("http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600");
@import "./assets/bootstrap/css/bootstrap.min.css";
@import "./assets/bootstrap/css/bootstrap-responsive.min.css";
@import "./assets/css/theme.css";
@import "./assets/images/icons/css/font-awesome.css";
</style>
