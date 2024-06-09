export function averageBenefit(benefits, employee) {
  const benefitsTarget = {
    shareholder: 0,
    nonShareholder: 0,
  };
  let countShareHolder = 0;
  let countNonShareHolder = 0;
  benefits.forEach((element) => {
    employee.forEach((employeeElement) => {
      if (
        element.Benefit_Plan_ID === employeeElement.benefitPlanID &&
        employeeElement.shareholder
      ) {
        countShareHolder++;
        benefitsTarget.shareholder +=
          (element.Percentage_CoPay / 100) * employeeElement.paidtoday;
      } else if (
        element.Benefit_Plan_ID === employeeElement.benefitPlanID &&
        !employeeElement.shareholder
      ) {
        countNonShareHolder++;
        benefitsTarget.nonShareholder +=
          (element.Percentage_CoPay / 100) * employeeElement.paidtoday;
      }
    });
  });
  if (countNonShareHolder) {
    benefitsTarget.nonShareholder /= countNonShareHolder;
  }
  if (countShareHolder) {
    benefitsTarget.shareholder /= countShareHolder;
  }
  benefitsTarget.shareholder = benefitsTarget.shareholder.toFixed(2);
  benefitsTarget.nonShareholder = benefitsTarget.nonShareholder.toFixed(2);
  return benefitsTarget;
}
