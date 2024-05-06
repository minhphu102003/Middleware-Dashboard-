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
import { cleaningData } from "./uses/mergeData";
import { getHRData, getSIPData } from "./uses/getAPI";
import { ref, computed, onMounted } from "vue";

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
    const cleanedEmployeeData = ref(null);
    const employeeData = ref([]);
    const personalData = ref([]);
    const employmentData = ref([]);
    const jobsHistoryData = ref([]);
    const beneFitPLansData = ref([]);
    const emergencyContactsData = ref([]);
    let apiError = false;
    const dataLoaded = ref(false);
    onMounted(async () => {
      try {
        const [
          personal,
          employment,
          jobsHistory,
          beneFitPLans,
          emergencyContacts,
          employee,
        ] = await Promise.all([
          getHRData("http://localhost:19335/api/personal"),
          getHRData("http://localhost:19335/api/employment"),
          getHRData("http://localhost:19335/api/job_history"),
          getHRData("http://localhost:19335/api/benefit_plans"),
          getHRData("http://localhost:19335/api/Emergency_Contacts"),
          getSIPData("http://localhost:4000/api/employee/"),
        ]);
        personalData.value = personal;
        employmentData.value = employment;
        jobsHistoryData.value = jobsHistory;
        beneFitPLansData.value = beneFitPLans;
        emergencyContactsData.value = emergencyContacts;
        employeeData.value = employee;
        try {
          const cleanedData = await cleaningData(
            personalData.value,
            apiError,
            employmentData.value,
            employeeData.value
          );
          cleanedEmployeeData.value = cleanedData;
          dataLoaded.value = true;
          console.log(cleanedData);
        } catch (error) {
          console.error("Error cleaning data:", error);
          // Xử lý lỗi ở đây
        }
      } catch (error) {
        console.error("Error loading data:", error);
        // Xử lý lỗi ở đây
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
    };
  },
  methods: {
    handleChangeComponent({ componentName, data }) {
      this.currentComponent = componentName;
      this.componentData = data;
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
