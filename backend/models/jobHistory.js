export default class jobHistory {
    constructor(
      id,
      employeeID,
      deparment,
      division,
      startDate,
      endDate,
      jobTitle,
      Supervisor,
      jobCategory,
      location,
      deparmentCode,
      salaryType,
      payPeriod,
      hourPerWeek,
      hazardousTrainning
    ) {
      this.id = id;
      this.employeeID = employeeID;
      this.deparment = deparment;
      this.division = division;
      this.startDate = startDate;
      this.endDate = endDate;
      this.jobTitle = jobTitle;
      this.Supervisor = Supervisor;
      this.jobCategory = jobCategory;
      this.location = location;
      this.deparmentCode = deparmentCode;
      this.salaryType = salaryType;
      this.payPeriod = payPeriod;
      this.hourPerWeek = hourPerWeek;
      this.hazardousTrainning = hazardousTrainning;
      this.employee = null;
    }
    setEmployee(employee) {
      this.employee = employee;
    }
    // Phương thức để lấy thông tin của benefitPlan
    getEmployee() {
      return this.employee; // Sử dụng thuộc tính benefitPlan ở đây
    }
  }
  