<template>
  <div class="module">
    <div class="module-head">
      <h3>Employee</h3>
      <div class="container-add-employee">
        <i class="fa-solid fa-plus"></i>
        <a href="#" @click.stop.prevent="handleAddClick">Create New Employee</a>
      </div>
    </div>
    <div class="module-body table">
      <div class="boxTool">
        <div id="DataTables_Table_0_length" class="dataTables_length">
          <label
            >Show
            <select
              size="1"
              name="DataTables_Table_0_length"
              v-model="limit"
              aria-controls="DataTables_Table_0"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries</label
          >
        </div>
        <div class="dataTables_filter" id="DataTables_Table_0_filter">
          <label
            >Search:
            <input
              type="text"
              aria-controls="DataTables_Table_0"
              @input="handleChangeText"
          /></label>
        </div>
      </div>
      <div class="form-add" v-if="showForm">
        <div class="form-title">
          <h3>Add Employee</h3>
          <i
            @click.stop.prevent="handleCloseFormAdd"
            class="fa-solid fa-xmark"
          ></i>
        </div>
        <div class="form-container">
          <label for="firstName">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            id="firstName"
            v-model="employee.firstName"
          />
        </div>
        <div class="form-container">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            v-model="employee.lastName"
          />
        </div>
        <div class="form-container radio">
          <div class="container-radio">
            <input
              type="radio"
              name="shareholder"
              id="shareHolder"
              value="true"
              :checked="employee.shareHolder === true"
              @change="updateShareHolder(true)"
            />
            <label for="shareHolder">ShareHolder</label>
          </div>
          <div class="container-radio">
            <input
              type="radio"
              name="shareholder"
              id="n-shareHolder"
              value="false"
              :checked="employee.shareHolder === false"
              @change="updateShareHolder(false)"
            />
            <label for="n-shareHolder">Non ShareHolder</label>
          </div>
        </div>
        <div class="form-container radio">
          <div class="container-radio">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              :checked="employee.gender === true"
              @change="updateGender(true)"
            />
            <label for="male">Male</label>
          </div>
          <div class="container-radio">
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              :checked="employee.gender === false"
              @change="updateGender(false)"
            />
            <label for="female">Female</label>
          </div>
        </div>
        <div class="form-container">
          <label for="">Ethnicity</label>
          <input
            type="text"
            placeholder="Type Ethnicity"
            v-model="employee.ethnicity"
          />
        </div>
        <div class="form-container">
          <label for="">Paid To Date</label>
          <input
            type="text"
            placeholder="Paid To Date"
            v-model="employee.paidToDate"
          />
        </div>
        <div class="form-container">
          <label for="">Paid Last Year</label>
          <input
            type="text"
            placeholder="Paid Last Year"
            v-model="employee.paidLastYear"
          />
        </div>
        <div class="form-container radio">
          <label for="">Employment Status</label>
          <div class="container-radio">
            <input
              type="radio"
              id="fullTime"
              name="employmentType"
              value="full-time"
              v-model="employee.employmentStatus"
            />
            <label for="fullTime">Full-time</label>
          </div>
          <div class="container-radio">
            <input
              type="radio"
              id="partTime"
              name="employmentType"
              value="part-time"
              v-model="employee.employmentStatus"
            />
            <label for="partTime">Part-time</label>
          </div>
        </div>
        <div class="form-container">
          <label for=""> Vacations Days</label>
          <input
            type="text"
            placeholder="Vacations Days"
            v-model="employee.vacationDays"
          />
        </div>
        <div class="form-container">
          <select v-model="selectedPlan" @change="updateBenefitID">
            <option
              v-for="plan in Benefit"
              :key="plan.Benefit_Plan_ID"
              :value="plan.Benefit_Plan_ID"
            >
              {{ plan.Plan_Name }}
            </option>
          </select>
        </div>
        <div class="form-container button-submit">
          <button v-if="createActive" @click.stop.prevent="handleSubmit">
            Add Employee
          </button>
          <button v-else @click.stop.prevent="handleSubmit">
            Update Employee
          </button>
        </div>
      </div>
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        class="datatable-1 table table-bordered table-striped display"
        width="100%"
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Shareholder</th>
            <th>Gender</th>
            <th>Ethnicity</th>
            <th>Vacation Days</th>
            <th>Paid To Date</th>
            <th>Paid Last Year</th>
            <th>Employment Status</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in dataToShow" :key="e.id">
            <td>{{ e.firstname }}</td>
            <td>{{ e.lastname }}</td>
            <td v-if="e.shareholder">Shareholder</td>
            <td v-else-if="!e.shareholder && e.shareholder !== null">
              Non Shareholder
            </td>
            <td v-else></td>
            <td v-if="e.gender">Male</td>
            <td v-else-if="!e.gender && e.gender !== null">Female</td>
            <td v-else></td>
            <td>{{ e.ethnicity }}</td>
            <td>{{ e.vacationDays }}</td>
            <td>{{ e.paidtoday }}</td>
            <td>{{ e.paidlastyear }}</td>
            <td>{{ e.employmentStatus }}</td>
            <td class="modifier">
              <a href="#" @click="handleUpdateClick(e)">Update</a>
              <a href="#" @click.prevent="handleDeleteClick(e)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="dataTables_info" id="DataTables_Table_0_info">
        Showing {{ startEntry + 1 }} to {{ endEntry }} of
        {{ lengthEntry }} entries
      </div>
      <div
        class="dataTables_paginate paging_two_button btn-group datatable-pagination"
        id="DataTables_Table_0_paginate"
      >
        <a
          class="paginate_enabled_previous"
          tabindex="0"
          role="button"
          id="DataTables_Table_0_previous"
          aria-controls="DataTables_Table_0"
          @click="preClick"
          ><span>Previous</span><i class="icon-chevron-left shaded"></i></a
        ><a
          class="paginate_enabled_next"
          tabindex="0"
          role="button"
          id="DataTables_Table_0_next"
          aria-controls="DataTables_Table_0"
          @click="nextClick"
          ><span>Next</span><i class="icon-chevron-right shaded"></i
        ></a>
      </div>
    </div>
  </div>
  <!--/.module-->
</template>

<script>
import axios from "axios";
export default {
  props: {
    Data: {
      type: Object,
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
  },
  data() {
    return {
      limit: 10,
      current: 0,
      searchText: "",
      filteredData: "",
      selectedPlan: null,
      showForm: false,
      createActive: true,
      localData: this.Data,
      employee: {
        firstName: null,
        lastName: null,
        shareHolder: null,
        gender: null,
        ethnicity: null,
        paidToDate: null,
        paidLastYear: null,
        employmentStatus: null,
        vacationDays: null,
        benefitID: null,
        idMongo: null,
        id: null,
      },
    };
  },
  created() {
    this.setupWebSocket();
  },
  computed: {
    startEntry() {
      return this.current;
    },
    endEntry() {
      if (this.searchText.trim() !== "") {
        return Math.min(
          parseInt(this.current) + parseInt(this.limit),
          this.filteredData.length
        );
      }
      return Math.min(
        parseInt(this.current) + parseInt(this.limit),
        this.localData.length
      );
    },
    lengthEntry() {
      if (this.searchText.trim() !== "") {
        return this.filteredData.length > 0 ? this.filteredData.length : 0;
      }
      return this.localData.length;
    },
    dataToShow() {
      if (this.searchText.trim() !== "") {
        return this.slicedData1;
      } else {
        return this.slicedData;
      }
    },
    slicedData() {
      console.log(this.Data);
      var endPoint = Math.min(
        parseInt(this.current) + parseInt(this.limit),
        this.localData.length
      );
      return this.localData.slice(this.current, endPoint);
    },
    slicedData1() {
      var endPoint = Math.min(
        parseInt(this.current) + parseInt(this.limit),
        this.filteredData.length
      );
      return this.filteredData.slice(this.current, endPoint);
    },
  },
  methods: {
    setupWebSocket() {
      const socket = new WebSocket("ws://localhost:5050");

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Received data from server:", message);

        const { event: eventType, data } = message;

        if (eventType === "create") {
          this.handleCreateEvent(data);
        } else if (eventType === "update") {
          this.handleUpdateEvent(data);
        } else if (eventType === "delete") {
          this.handleDeleteEvent(data);
        } else if (eventType === "updatekey") {
          this.handleUpdateKey(data);
        }
      };
      socket.onopen = () => {
        console.log("WebSocket connection established");
      };
      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    },
    handleCreateEvent(employee) {
      this.localData.push(employee);
      console.log(
        `Employee created: ${employee.firstName} ${employee.lastName}`
      );
    },
    handleUpdateEvent(employee) {
      if (employee.id !== -1) {
        const index = this.localData.findIndex((em) => em.id === employee.id);
        if (index !== -1) {
          this.localData[index] = employee;
          console.log(
            `Employee updated: ${employee.firstName} ${employee.lastName}`
          );
        }
      } else {
        const index = this.localData.findIndex(
          (em) => em.idMongo === employee.idMongo
        );
        if (index !== -1) {
          this.localData[index] = employee;
          console.log(
            `Employee updated: ${employee.firstName} ${employee.lastName}`
          );
        }
      }
    },
    handleDeleteEvent(employee) {
      if (employee.id !== -1) {
        const index = this.localData.findIndex((em) => em.id === employee.id);
        if (index !== -1) {
          this.localData.splice(index, 1);
          console.log(
            `Employee deleted: ${employee.firstName} ${employee.lastName}`
          );
        } else {
          const index1 = this.localData.findIndex(
            (em) => em.idMongo === employee.idMongo
          );
          if (index1 !== -1) {
            this.localData.splice(index, 1);
            console.log(
              `Employee deleted: ${employee.firstName} ${employee.lastName}`
            );
          }
        }
      } else {
        const index = this.localData.findIndex(
          (em) => em.idMongo === employee.idMongo
        );
        if (index !== -1) {
          this.localData.splice(index, 1);
          console.log(
            `Employee deleted: ${employee.firstName} ${employee.lastName}`
          );
        }
      }
    },
    handleUpdateKey(employee) {
      const index = this.localData.findIndex((em) => em.id === employee.id);
      if (index !== -1) {
        this.localData[index].idMongo = employee.idMongo;
        console.log(employee);
        console.log(`Employee update key: ${employee.idMongo}`);
      }
    },
    preClick() {
      if (this.current >= this.limit) {
        this.current -= this.limit;
      }
    },
    nextClick() {
      this.current = Math.min(
        parseInt(this.current) + parseInt(this.limit),
        this.Data.length
      );
    },
    handleChangeText(event) {
      this.searchText = event.target.value;
      this.filteredData = this.localData.filter((employee) =>
        employee.lastname.includes(this.searchText)
      );
      this.current = 0;
    },
    handleAddClick() {
      this.createActive = true;
      this.showForm = true;
    },
    handleCloseFormAdd() {
      this.showForm = false;
    },
    handleUpdateClick(employee) {
      this.createActive = false;
      this.employee.firstName = employee.firstname;
      this.employee.lastName = employee.lastname;
      this.employee.shareHolder = employee.shareholder;
      this.employee.gender = employee.gender;
      this.employee.ethnicity = employee.ethnicity;
      this.employee.paidToDate = employee.paidtoday;
      this.employee.paidLastYear = employee.paidlastyear;
      this.employee.employmentStatus = employee.employmentStatus;
      this.employee.vacationDays = employee.vacationDays;
      this.employee.benefitID = employee.benefitPlanID;
      this.employee.idMongo = employee.idMongo;
      this.employee.id = employee.id;
      console.log(this.employee);
      this.showForm = true;
    },
    async handleDeleteClick(employee) {
      try {
        if (employee.id && employee.idMongo) {
          const respone = await axios.delete(
            `http://localhost:8000/api/employee/${employee.id}/${employee.idMongo}`
          );
          if (respone.status === 200) {
            const index = this.localData.findIndex(
              (em) => em.id === employee.id
            );
            if (index !== -1) {
              this.localData.splice(index, 1);
              window.alert(`Xóa thành công nhân viên`);
            }
          }
        } else if (employee.idMongo) {
          const defaultEmployee = -1;
          const respone = await axios.delete(
            `http://localhost:8000/api/employee/${defaultEmployee}/${employee.idMongo}`
          );
          if (respone.status === 200) {
            const index = this.localData.findIndex(
              (em) => em.idMongo === employee.idMongo
            );
            if (index !== -1) {
              this.localData.splice(index, 1);
              window.alert(`Xóa thành công nhân viên`);
            }
          }
        } else {
          const respone = await axios.delete(
            `http://localhost:8000/api/employee/${employee.id}/-1`
          );
          if (respone.status === 200) {
            const index = this.localData.findIndex(
              (em) => em.id === employee.id
            );
            if (index !== -1) {
              this.localData.splice(index, 1);
              window.alert(`Xóa thành công nhân viên`);
            }
          }
        }
      } catch (err) {
        console.log(err);
        window.alert(`Đã có lỗi xảy ra ${err}`);
      }
    },
    updateShareHolder(isShareHolder) {
      console.log(this.employee.shareHolder);
      this.employee.shareHolder = isShareHolder;
    },
    updateBenefitID() {
      this.employee.benefitID = this.selectedPlan;
    },
    updateGender(selectedGender) {
      this.employee.gender = selectedGender;
    },

    async handleSubmit() {
      const employee = {
        employeeId: this.employee.id,
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        shareHolder: this.employee.shareHolder,
        gender: this.employee.gender,
        ethnicity: this.employee.ethnicity,
        paidToDate: this.employee.paidToDate,
        paidLastYear: this.employee.paidLastYear,
        employmentStatus: this.employee.employmentStatus,
        vacationDays: this.employee.vacationDays,
        benefitID: this.employee.benefitID,
        idMongo: this.employee.idMongo,
      };
      if (this.createActive) {
        try {
          const min = 10000000;
          const max = 99999999;
          employee.employeeId = parseInt(
            Math.floor(Math.random() * (max - min + 1)) + min
          );
          const respone = await axios.post(
            "http://localhost:8000/api/employee",
            employee
          );
          if (respone.status === 200) {
            const employeeCreated = {
              id: employee.employeeId,
              firstname: this.employee.firstName,
              lastname: this.employee.lastName,
              shareholder: this.employee.shareHolder,
              gender: this.employee.gender,
              ethnicity: this.employee.ethnicity,
              paidtoday: this.employee.paidToDate,
              paidlastyear: this.employee.paidLastYear,
              employmentStatus: this.employee.employmentStatus,
              vacationDays: this.employee.vacationDays,
              benefitPlanID: this.employee.benefitID,
              idMongo: this.employee.idMongo,
            };
            this.localData.push(employeeCreated);
            window.alert(
              `Thêm mới nhân viên thành công ${employee.firstName} ${employee.lastName}`
            );
          }
        } catch (err) {
          window.alert(`Đã có lỗi xảy ra ${err}`);
        }
      } else {
        try {
          const employeeUpdated = {
            id: this.employee.id,
            firstname: this.employee.firstName,
            lastname: this.employee.lastName,
            shareholder: this.employee.shareHolder,
            gender: this.employee.gender,
            ethnicity: this.employee.ethnicity,
            paidtoday: this.employee.paidToDate,
            paidlastyear: this.employee.paidLastYear,
            employmentStatus: this.employee.employmentStatus,
            vacationDays: this.employee.vacationDays,
            benefitPlanID: this.employee.benefitID,
            idMongo: this.employee.idMongo,
          };
          if (this.employee.id === null) {
            employee.employeeId = -1;
          }
          if (this.employee.idMongo === null) {
            employee.idMongo = -1;
          }
          // Tạo một đối tượng với các trường tương ứng với api
          const respone = await axios.put(
            `http://localhost:8000/api/employee/${this.employee.id}`,
            employee
          );
          if (respone.status === 200) {
            if (employee.employeeId !== -1) {
              const index = this.localData.findIndex(
                (em) => em.id === employeeUpdated.id
              );
              if (index !== -1) {
                this.localData[index] = employeeUpdated;
              }
            } else if (employee.idMongo !== -1) {
              const index = this.localData.findIndex(
                (em) => em.idMongo === employeeUpdated.idMongo
              );
              if (index !== -1) {
                this.localData[index] = employeeUpdated;
              }
            }
            window.alert(`Cập nhật nhân viên thành công`);
          }
        } catch (err) {
          window.alert(`Đã có lỗi xảy ra ${err}`);
        }
      }
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.boxTool {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.module-body.table {
  padding: 15px 0 35px 0;
}
.dataTables_info {
  float: left;
  padding-top: 5px;
  padding-left: 10px;
}
.datatable-pagination {
  float: right;
  padding: 5px;
}
.module-head {
  display: flex;
  align-items: center;
}
.modifier {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.container-add-employee {
  margin-left: 20px;
  border: 1px solid blue;
  padding: 2px 5px;
  border-radius: 5px;
  cursor: pointer;
}

.module-body.table {
  position: relative;
}

.form-add {
  position: absolute;
  width: 50%;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid black;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.form-title {
  position: relative;
}

.form-title h3 {
  text-align: center;
}

.form-title i {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 8px;
  border-radius: 2px;
  background-color: rgb(229, 195, 195);
  cursor: pointer;
}
.form-container {
  padding-left: 50px;
  margin-bottom: 10px;
}

.radio {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form-container input[type="text"] {
  width: 80%;
}

.form-container select {
  width: 80%;
}

.container-radio {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 30px;
}

.container-radio label {
  margin-left: 10px;
  margin-bottom: 0;
}

.button-submit {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-submit button {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: aquamarine;
  border: none;
}
</style>
