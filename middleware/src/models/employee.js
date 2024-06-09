export default class Employee {
  constructor(
    id,
    firstname,
    lastname,
    shareholder,
    gender,
    ethnicity,
    paidlastyear,
    paidtoday,
    benefitPlanID,
    employmentStatus,
    vacationDays,
    idMongo
  ) {
    this.id = id !== undefined ? id : null;
    this.firstname = firstname;
    this.lastname = lastname;
    this.shareholder = shareholder !== undefined ? shareholder : null;
    this.gender = gender !== undefined ? gender : null;
    this.ethnicity = ethnicity !== undefined ? ethnicity : null;
    this.paidlastyear = paidlastyear !== undefined ? paidlastyear : null;
    this.paidtoday = paidtoday !== undefined ? paidtoday : null;
    this.benefitPlanID = benefitPlanID !== undefined ? benefitPlanID : null;
    this.employmentStatus =
      employmentStatus !== undefined ? employmentStatus : null;
    this.benefitPlan = null;
    this.vacationDays = vacationDays !== undefined ? vacationDays : null;
    this.benefitPlan = null;
    this.idMongo = idMongo !== undefined ? idMongo : null;
  }

  // Getter và Setter cho thuộc tính id
  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id !== undefined ? id : null;
  }

  // Getter và Setter cho thuộc tính firstname
  getFirstname() {
    return this.firstname;
  }

  setFirstname(firstname) {
    this.firstname = firstname;
  }

  // Getter và Setter cho thuộc tính lastname
  getLastname() {
    return this.lastname;
  }

  setLastname(lastname) {
    this.lastname = lastname;
  }

  // Getter và Setter cho thuộc tính shareholder
  getShareholder() {
    return this.shareholder;
  }

  setShareholder(shareholder) {
    this.shareholder = shareholder !== undefined ? shareholder : null;
  }

  // Getter và Setter cho thuộc tính gender
  getGender() {
    return this.gender;
  }

  setGender(gender) {
    this.gender = gender !== undefined ? gender : null;
  }

  // Getter và Setter cho thuộc tính ethnicity
  getEthnicity() {
    return this.ethnicity;
  }

  setEthnicity(ethnicity) {
    this.ethnicity = ethnicity !== undefined ? ethnicity : null;
  }

  // Getter và Setter cho thuộc tính paidlastyear
  getPaidlastyear() {
    return this.paidlastyear;
  }

  setPaidlastyear(paidlastyear) {
    this.paidlastyear = paidlastyear !== undefined ? paidlastyear : null;
  }

  // Getter và Setter cho thuộc tính paidtoday
  getPaidtoday() {
    return this.paidtoday;
  }

  setPaidtoday(paidtoday) {
    this.paidtoday = paidtoday !== undefined ? paidtoday : null;
  }

  // Getter và Setter cho thuộc tính benefitPlanID
  getBenefitPlanID() {
    return this.benefitPlanID;
  }

  setBenefitPlanID(benefitPlanID) {
    this.benefitPlanID = benefitPlanID !== undefined ? benefitPlanID : null;
  }

  // Getter và Setter cho thuộc tính employmentStatus
  getEmploymentStatus() {
    return this.employmentStatus;
  }

  setEmploymentStatus(employmentStatus) {
    this.employmentStatus =
      employmentStatus !== undefined ? employmentStatus : null;
  }

  setBenefitPlan(benefitPlan) {
    this.benefitPlan = benefitPlan;
  }

  // Phương thức để lấy thông tin của benefitPlan
  getBenefitPlan() {
    return this.benefitPlan; // Sử dụng thuộc tính benefitPlan ở đây
  }

  getvacationDays() {
    return this.vacationDays;
  }

  // Setter cho vacationDays
  setvacationDays(value) {
    this.vacationDays = value !== undefined ? value : null;
  }
}
