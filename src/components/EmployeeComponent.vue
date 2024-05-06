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
      <div class="form-add">
        <div class="form-title">
          <h3>Add Employee</h3>
          <i
            @click.stop.prevent="handleCloseFormAdd"
            class="fa-solid fa-xmark"
          ></i>
        </div>
        <div class="form-container">
          <label for="firstName">First Name</label>
          <input type="text" placeholder="First Name" id="firstName" />
        </div>
        <div class="form-container">
          <label for="lastName">Last Name</label>
          <input type="text" placeholder="Last Name" id="lastName" />
        </div>
        <div class="form-container radio">
          <div class="container-radio">
            <input type="radio" name="shareholder" id="shareHolder" />
            <label for="shareHolder">ShareHolder</label>
          </div>
          <div class="container-radio">
            <input type="radio" name="shareholder" id="n-shareHolder" />
            <label for="n-shareHolder">Non ShareHolder</label>
          </div>
        </div>
        <div class="form-container radio">
          <div class="container-radio">
            <input type="radio" name="gender" id="male" />
            <label for="male">Male</label>
          </div>
          <div class="container-radio">
            <input type="radio" name="gender" id="female" />
            <label for="female">Female</label>
          </div>
        </div>
        <div class="form-container">
          <label for="">Ethnicity</label>
          <input type="text" placeholder="Type Ethnicity" />
        </div>
        <div class="form-container">
          <label for="">Paid To Date</label>
          <input type="text" placeholder="Paid To Date" />
        </div>
        <div class="form-container">
          <label for="">Paid Last Year</label>
          <input type="text" placeholder="Paid Last Year" />
        </div>
        <div class="form-container radio">
          <label for="">Employment Status</label>
          <div class="container-radio">
            <input
              type="radio"
              id="fullTime"
              name="employmentType"
              value="full-time"
            />
            <label for="fullTime">Full-time</label>
          </div>
          <div class="container-radio">
            <input
              type="radio"
              id="partTime"
              name="employmentType"
              value="part-time"
            />
            <label for="partTime">Part-time</label>
          </div>
        </div>
        <div class="form-container">
          <label for=""> Vacations Days</label>
          <input type="text" placeholder="Vacations Days" />
        </div>
        <div class="form-container">
          <select v-model="selectedPlan">
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
          <button>Add Employee</button>
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
              <a href="#" @click="handleUpdateClick">Update</a>
              <a href="#" @click.prevent="handleDeleteClick">Delete</a>
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
  },
  data() {
    return {
      limit: 10,
      current: 0,
      searchText: "",
      filteredData: "",
      selectedPlan: null,
    };
  },
  computed: {
    startEntry() {
      return this.current;
    },
    endEntry() {
      if (this.searchText.trim() !== "") {
        return Math.min(
          parseInt(this.current) + parseInt(this.limit),
          this.filteredData.length - 1
        );
      }
      return Math.min(
        parseInt(this.current) + parseInt(this.limit),
        this.Data.length - 1
      );
    },
    lengthEntry() {
      if (this.searchText.trim() !== "") {
        return this.filteredData.length > 0 ? this.filteredData.length - 1 : 0;
      }
      return this.Data.length;
    },
    dataToShow() {
      if (this.searchText.trim() !== "") {
        return this.slicedData1;
      } else {
        return this.slicedData;
      }
    },
    slicedData() {
      var endPoint = Math.min(
        parseInt(this.current) + parseInt(this.limit),
        this.Data.length - 1
      );
      return this.Data.slice(this.current, endPoint);
    },
    slicedData1() {
      var endPoint = Math.min(
        parseInt(this.current) + parseInt(this.limit),
        this.filteredData.length - 1
      );
      return this.filteredData.slice(this.current, endPoint);
    },
  },
  methods: {
    preClick() {
      if (this.current >= this.limit) {
        this.current -= this.limit;
      }
    },
    nextClick() {
      this.current = Math.min(
        parseInt(this.current) + parseInt(this.limit),
        this.Data.length - 1
      );
    },
    handleChangeText(event) {
      this.searchText = event.target.value;
      this.filteredData = this.Data.filter((employee) =>
        employee.lastname.includes(this.searchText)
      );
      this.current = 0;
    },
    handleAddClick(event) {
      const addElement = event.target;
      const parentElement =
        addElement.parentElement.parentElement.nextElementSibling;
      const formElement = parentElement.querySelector(".form-add");
      formElement.style.display = "block";
    },
    handleCloseFormAdd(event) {
      const closeElement = event.target;
      const parentElement = closeElement.parentElement.parentElement;
      parentElement.style.display = "none";
    },
    handleUpdateClick() {
      this.$emit("changeComponent", {
        componentName: "UpdateEmployee",
        data: null,
      });
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
  display: none;
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
