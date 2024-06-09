<template>
  <div class="content">
    <div class="btn-controls">
      <div class="title mb-1">
        <p class="title-p" v-if="activeToday">Total earnings Today</p>
        <p class="title-p" v-else>Total earnings Last Year</p>
        <div
          class="transform"
          :class="{ active: !activeToday }"
          @click.prevent="handleTransformClick"
        >
          <p class="transform-p">Transform</p>
          <i class="fa-solid fa-arrow-right-arrow-left"></i>
        </div>
      </div>
      <div class="btn-box-row row-fluid">
        <a href="#" class="btn-box big span4">
          <i class="fa-solid fa-users"></i
          ><b v-if="activeToday">{{ earningsToday.shareholder }}</b>
          <b v-else>{{ earningsLastYear.shareholder }}</b>
          <p class="text-muted">Shareholder</p> </a
        ><a href="#" class="btn-box big span4">
          <i class="icon-user"></i>
          <b v-if="activeToday">{{ earningsToday.nonShareholder }}</b>
          <b v-else>{{ earningsLastYear.nonShareholder }}</b>
          <p class="text-muted">Non Shareholder</p> </a
        ><a href="#" class="btn-box big span4">
          <i class="fa-solid fa-mars-stroke"></i
          ><b v-if="activeToday">{{ earningsToday.male }}</b>
          <b v-else>{{ earningsLastYear.male }}</b>
          <p class="text-muted">Male</p>
        </a>
        <a href="#" class="btn-box big span4" style="margin-left: 0">
          <i class="fa-solid fa-venus"></i
          ><b v-if="activeToday">{{ earningsToday.female }}</b>
          <b v-else>{{ earningsLastYear.female }}</b>
          <p class="text-muted">Female</p>
        </a>
        <a href="#" class="btn-box big span4">
          <i class="fa-solid fa-circle-dot"></i
          ><b v-if="activeToday">{{ earningsToday.fullTime }}</b>
          <b v-else>{{ earningsLastYear.fullTime }}</b>
          <p class="text-muted">Full time</p>
        </a>
        <a href="#" class="btn-box big span4">
          <i class="fa-brands fa-patreon"></i
          ><b v-if="activeToday">{{ earningsToday.partTime }}</b>
          <b v-else>{{ earningsLastYear.partTime }}</b>
          <p class="text-muted">Part time</p>
        </a>
      </div>
      <div class="btn-box-row row-fluid">
        <div class="title mb-1">
          <p class="title-p" v-if="activeToday">
            Total earnings Today By Ethnicity
          </p>
          <p class="title-p" v-else>Total earnings Last Year By Ethnicity</p>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Ethnicity</th>
              <th v-if="activeToday">Total Today</th>
              <th v-else>Total Last Year</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ethnicity, index) in earningsToday.nameEthnicity"
              :key="index"
            >
              <td>{{ ethnicity }}</td>
              <td v-if="activeToday">
                {{ earningsToday.valueEthnicity[index] }}
              </td>
              <td v-else>{{ earningsLastYear.valueEthnicity[index] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-box-row row-fluid">
        <div class="title mb-1">
          <p class="title-p" v-if="activeToday">
            Total earnings Today By Deparment
          </p>
          <p class="title-p" v-else>Total earnings Last Year By Deparment</p>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Department</th>
              <th v-if="activeToday">Total Today</th>
              <th v-else>Total Last Year</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(department, index) in earningsToday.nameDepartment"
              :key="index"
            >
              <td>{{ department }}</td>
              <td v-if="activeToday">
                {{ earningsToday.valueDepartment[index] }}
              </td>
              <td v-else>{{ earningsLastYear.valueDepartment[index] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-box-row row-fluid">
        <div class="span8">
          <div class="row-fluid">
            <div class="span12">
              <a href="#" class="btn-box small span4">
                <i class="icon-envelope"></i><b>Messages</b> </a
              ><a href="#" class="btn-box small span4">
                <i class="icon-group"></i><b>Clients</b> </a
              ><a href="#" class="btn-box small span4">
                <i class="icon-exchange"></i><b>Expenses</b>
              </a>
            </div>
          </div>
          <div class="row-fluid">
            <div class="span12">
              <a href="#" class="btn-box small span4">
                <i class="icon-save"></i><b>Total Sales</b> </a
              ><a href="#" class="btn-box small span4">
                <i class="icon-bullhorn"></i><b>Social Feed</b> </a
              ><a href="#" class="btn-box small span4">
                <i class="icon-sort-down"></i><b> Bounce Rate </b>
              </a>
            </div>
          </div>
        </div>
        <ul class="widget widget-usage unstyled span4">
          <li>
            <p>
              <strong>Windows 8</strong>
              <span class="pull-right small muted">78%</span>
            </p>
            <div class="progress tight">
              <div class="bar" style="width: 78%"></div>
            </div>
          </li>
          <li>
            <p>
              <strong>Mac</strong>
              <span class="pull-right small muted">56%</span>
            </p>
            <div class="progress tight">
              <div class="bar bar-success" style="width: 56%"></div>
            </div>
          </li>
          <li>
            <p>
              <strong>Linux</strong>
              <span class="pull-right small muted">44%</span>
            </p>
            <div class="progress tight">
              <div class="bar bar-warning" style="width: 44%"></div>
            </div>
          </li>
          <li>
            <p>
              <strong>iPhone</strong>
              <span class="pull-right small muted">67%</span>
            </p>
            <div class="progress tight">
              <div class="bar bar-danger" style="width: 67%"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--/#btn-controls-->
    <div class="module">
      <div class="module-head">
        <h3>Vacation Days</h3>
      </div>
      <div class="module-body">
        <div class="btn-controls">
          <div class="btn-box-row row-fluid">
            <a href="#" class="btn-box-change btn-box big span4">
              <i class="fa-solid fa-users"></i>
              <b>{{ vacationDay.shareholder }}</b>
              <p class="text-muted">Shareholder</p> </a
            ><a href="#" class="btn-box-change btn-box big span4">
              <i class="icon-user"></i>
              <b>{{ vacationDay.nonShareholder }}</b>
              <p class="text-muted">Non Shareholder</p> </a
            ><a href="#" class="btn-box-change btn-box big span4">
              <i class="fa-solid fa-mars-stroke"></i
              ><b>{{ vacationDay.male }}</b>
              <p class="text-muted">Male</p>
            </a>
            <a
              href="#"
              class="btn-box-change btn-box big span4"
              style="margin-left: 0"
            >
              <i class="fa-solid fa-venus"></i><b>{{ vacationDay.female }}</b>
              <p class="text-muted">Female</p>
            </a>
            <a href="#" class="btn-box-change btn-box big span4">
              <i class="fa-solid fa-circle-dot"></i
              ><b>{{ vacationDay.fullTime }}</b>
              <p class="text-muted">Full time</p>
            </a>
            <a href="#" class="btn-box-change btn-box big span4">
              <i class="fa-brands fa-patreon"></i>
              <b>{{ vacationDay.partTime }}</b>
              <p class="text-muted">Part time</p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--/.module-->
    <div class="module hide">
      <div class="module-head">
        <h3>Adjust Budget Range</h3>
      </div>
      <div class="module-body">
        <div class="form-inline clearfix">
          <a href="#" class="btn pull-right">Update</a>
          <label for="amount"> Price range: </label>
          &nbsp;
          <input type="text" id="amount" class="input-" />
        </div>
        <hr />
        <div class="slider-range"></div>
      </div>
    </div>
    <div class="module">
      <div class="module-head">
        <h3>Benefit Plans</h3>
      </div>
      <div class="module-body">
        <div class="btn-controls">
          <div class="btn-box-row row-fluid">
            <a href="#" class="btn-box-change btn-box big span4">
              <i class="fa-solid fa-users"></i>
              <b>{{ benefitAverage.shareholder }}</b>
              <p class="text-muted">Shareholder</p> </a
            ><a href="#" class="btn-box-change btn-box big span4">
              <i class="icon-user"></i>
              <b>{{ benefitAverage.nonShareholder }}</b>
              <p class="text-muted">Non Shareholder</p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--/.module-->
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { calculateTotal } from "../uses/handleEarning";
import { averageBenefit } from "../uses/handleBenefitPlan";
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
  setup(props) {
    const properties = ["paidlastyear", "paidtoday", "vacationDays"];
    const earningsToday = ref({
      shareholder: 0,
      nonShareholder: 0,
      male: 0,
      female: 0,
      partTime: 0,
      fullTime: 0,
      nameEthnicity: [],
      valueEthnicity: [],
      nameDepartment: [],
      valueDepartment: [],
    });
    const earningsLastYear = ref({
      shareholder: 0,
      nonShareholder: 0,
      male: 0,
      female: 0,
      partTime: 0,
      fullTime: 0,
      nameEthnicity: [],
      valueEthnicity: [],
      nameDepartment: [],
      valueDepartment: [],
    });
    const vacationDay = ref({
      shareholder: 0,
      nonShareholder: 0,
      male: 0,
      female: 0,
      partTime: 0,
      fullTime: 0,
      nameEthnicity: [],
      valueEthnicity: [],
      nameDepartment: [],
      valueDepartment: [],
    });
    const benefitAverage = ref({
      shareholder: 0,
      nonShareholder: 0,
    });
    watchEffect(() => {
      if (props.Data !== null && props.Job !== null) {
        earningsToday.value = calculateTotal(
          props.Data,
          props.Job,
          properties[1]
        );
        earningsLastYear.value = calculateTotal(
          props.Data,
          props.Job,
          properties[0]
        );
        vacationDay.value = calculateTotal(
          props.Data,
          props.Job,
          properties[2]
        );
      }
      if (props.Benefit !== null) {
        benefitAverage.value = averageBenefit(props.Benefit, props.Data);
      }
    });

    return {
      earningsToday,
      earningsLastYear,
      vacationDay,
      benefitAverage,
    };
  },
  data() {
    return {
      activeToday: true,
    };
  },
  methods: {
    handleTransformClick() {
      this.activeToday = !this.activeToday;
    },
  },
};
</script>

<style scoped>
.first {
  margin-left: 0;
}
.title {
  height: 10%;
  padding: 10px 0 10px 30px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.transform {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px;
  border: solid 1px rgb(219, 217, 217);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.transform-p {
  text-align: center;
  margin: 0 10px 0 0;
}
.transform.active {
  background-color: rgb(211, 194, 179);
  color: white;
}
.btn-box-change {
  background-color: #eee5e5;
}
.table {
  margin: 10px 0;
  background-color: white;
}

.table td {
  width: 50%;
}
</style>
