<template>
  <div class="container">
    <div id="form">
      <div class="header">
        <div class="back"></div>
        <div class="title">
          <h3>Update Employee</h3>
        </div>
      </div>
      <div class="content">
        <div class="form-container">
          <label for="">First Name</label>
          <input type="text" />
        </div>
        <div class="form-container">
          <label for="">Last Name</label>
          <input type="text" />
        </div>
        <div class="form-container">
          <label for="">ShareHolder</label>
          <select name="" id="">
            <option value="1">ShareHolder</option>
            <option value="0">Non-ShareHolder</option>
          </select>
        </div>
        <div class="form-container">
          <label for="">Gender</label>
          <select name="" id="">
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>
        <div class="form-container">
          <label for="">Ethnicity</label>
          <input type="text" />
        </div>
        <div class="form-container">
          <label for="">Vacation Days</label>
          <input type="text" />
        </div>
        <div class="form-container">
          <label for="">Paid To Date</label>
          <input type="text" />
        </div>
        <div class="form-container">
          <label for="">Paid Last Year</label>
          <input type="text" />
        </div>
        <div class="form-container">
          <label for="">Employment Status</label>
          <select name="" id="">
            <option value="Full-Time">Full-Time</option>
            <option value="Part-time">Part-Time</option>
          </select>
        </div>
      </div>
      <div class="footer">
        <div class="button update">Update</div>
        <div class="button cancel">Cancel</div>
      </div>
    </div>
  </div>
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
};
</script>

<style lang="css">
.content {
  background-color: white;
}
</style>
