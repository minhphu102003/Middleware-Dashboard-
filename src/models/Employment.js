export default class Employment {
  constructor(
    employeeId,
    employmentStatus,
    hireDate,
    workersCompCode,
    terminationDate,
    rehireDate,
    lastReviewDate
  ) {
    this.employeeId = employeeId;
    this.employmentStatus = employmentStatus;
    this.hireDate = hireDate;
    this.workersCompCode = workersCompCode;
    this.terminationDate = terminationDate;
    this.rehireDate = rehireDate;
    this.lastReviewDate = lastReviewDate;
  }
}
