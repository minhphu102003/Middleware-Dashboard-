export function calculateTotal(employee, job, paidKey) {
    const earnings = {
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
    };
  
    const checkEthnicity = new Map();
    const checkDepartment = new Map();
  
    let indexEthnicity = 0;
    let indexDepartment = 0;
  
    employee.forEach((e) => {
      if (e.gender === true) {
        earnings.male += e[paidKey];
      } else {
        earnings.female += e[paidKey];
      }
      if (e.shareholder) {
        earnings.shareholder += e[paidKey];
      } else {
        earnings.nonShareholder += e[paidKey];
      }
      if (e.employmentStatus === "full-time") {
        earnings.fullTime += e[paidKey];
      } else {
        earnings.partTime += e[paidKey];
      }
      if (e.ethnicity !== null) {
        if (!checkEthnicity.has(e.ethnicity)) {
          checkEthnicity.set(e.ethnicity, indexEthnicity);
          earnings.nameEthnicity[indexEthnicity] = e.ethnicity;
          earnings.valueEthnicity[indexEthnicity] = e[paidKey];
          indexEthnicity++;
        } else {
          const indextemp = checkEthnicity.get(e.ethnicity);
          earnings.valueEthnicity[indextemp] += e[paidKey];
        }
      }
      job.forEach((jobHistory) => {
        if (jobHistory.Employee_ID === e.id && jobHistory.Deparment !== null) {
          if (!checkDepartment.has(jobHistory.Department)) {
            checkDepartment.set(jobHistory.Department, indexDepartment);
            earnings.nameDepartment[indexDepartment] = jobHistory.Department;
            earnings.valueDepartment[indexDepartment] = e[paidKey];
            indexDepartment++;
          } else {
            const indexTemp = checkDepartment.get(jobHistory.Department);
            earnings.valueDepartment[indexTemp] += e[paidKey];
          }
        }
      });
    });
    return earnings;
  }
  