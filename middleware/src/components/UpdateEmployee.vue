<template>
  <div class="container">
    <div id="form">
      <div class="header">
        <div class="back"></div>
        <div class="title">
          <a href="#" @click="handleBackClick">
            <i class="fa-solid fa-chevron-left"></i>
          </a>
          <h3>Update Employee</h3>
        </div>
      </div>
      <div class="content">
        <div class="form-container">
          <label for="">First Name</label>
          <input type="text" v-model="employee.value.firstName" />
        </div>
        <div class="form-container">
          <label for="">Last Name</label>
          <input type="text" v-model="employee.value.lastName" />
        </div>
        <div class="form-container">
          <label for="">ShareHolder</label>
          <select v-model="this.selectedShareholder">
            <option value="false">Non ShareHolder</option>
            <option value="true">ShareHolder</option>
          </select>
        </div>
        <div class="form-container">
          <label for="">Gender</label>
          <select v-model="this.selectedGender">
            <option value="false">Female</option>
            <option value="true">Male</option>
          </select>
        </div>
        <div class="form-container">
          <label for="">Ethnicity</label>
          <input type="text" v-model="employee.ethnicity" />
        </div>
        <div class="form-container">
          <label for="">Vacation Days</label>
          <input type="text" v-model="employee.vacationDays" />
        </div>
        <div class="form-container">
          <label for="">Paid To Date</label>
          <input type="text" v-model="employee.paidToDate" />
        </div>
        <div class="form-container">
          <label for="">Paid Last Year</label>
          <input type="text" v-model="employee.paidLastYear" />
        </div>
        <div class="form-container">
          <label for="">Employment Status</label>
          <select v-model="this.selectedStatus">
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
          </select>
        </div>
      </div>
      <div class="footer">
        <div class="button update" @click="handleBackToEmployeeList">
          Update
        </div>
        <div class="button cancel" @click="handleBackClick">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  props: {
    Data: {
      type: Object,
      required: true,
    },
    Error: {
      type: Boolean,
      required: true,
    },
    Job: {
      type: Object,
      require: true,
    },
    Benefit: {
      type: Object,
      required: true,
    },
    Employee: {
      type: Object,
      require: true,
    },
  },
  setup(props, { emit }) {
    // Tạo một ref cho mảng data
    const updatedData = ref(props.Data);

    // Tạo một proxy object từ employee
    const employee = reactive({
      id: props.Employee.id,
      firstName: props.Employee.firstname,
      lastName: props.Employee.lastname,
      shareHolder: props.Employee.shareholder,
      gender: props.Employee.gender,
      ethnicity: props.Employee.ethnicity,
      vacationDays: props.Employee.vacationDays,
      paidToDate: props.Employee.paidtoday,
      paidLastYear: props.Employee.paidlastyear,
      employeeStatus: props.Employee.employmentStatus,
      benefitID: props.Employee.benefitPlanID,
      idMongo: props.Employee.idMongo,
    });

    async function handleUpdateEmployee() {
      const index = updatedData.value.findIndex((emp) => {
        return (
          emp.id === props.Employee.id || emp.idMongo === props.Employee.idMongo
        );
      });

      if (index !== -1) {
        // const updatedEmployee = await convertEmployeeDataToObj(employee);
        console.log(employee.value);
        updatedData.value[index] = {
          ...updatedData.value[index],
          ...employee.value,
        };
      }
      console.log(updatedData.value);
      return updatedData.value;
    }
    async function handleBackToEmployeeList() {
      const updatedData = await handleUpdateEmployee();
      emit("changeComponent", {
        componentName: "EmployeeComponent",
        data: updatedData,
        employee: null,
      });
    }
    return {
      updatedData,
      employee,
      handleBackToEmployeeList,
    };
  },
  data() {
    return {
      selectedStatus: this.Employee.employmentStatus,
      selectedGender: this.Employee.gender,
      selectedShareholder: this.Employee.shareholder,
    };
  },
  methods: {
    handleBackClick() {
      console.log(this.selectedGender);
      this.$emit("changeComponent", {
        componentName: "EmployeeComponent",
        data: this.Data,
        employee: null,
      });
    },
  },
};
</script>

<style lang="css">
.content {
  background-color: white;
}
.title {
  display: flex;
  align-items: center;
}

.title a {
  margin-right: 20px;
}

.title a i {
  color: black;
  font-size: 20px;
}

.title h3 {
  margin-bottom: 0;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.button {
  padding: 10px 20px;
  border-radius: 4px;
  margin-right: 20px;
  color: white;
}
.button.update {
  background-color: rgb(72, 149, 194);
}
.button.cancel {
  background-color: brown;
}
</style>
