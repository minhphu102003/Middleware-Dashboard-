import Employee from "../models/employee.js";
export async function cleaningData(
  personalData,
  employmentData,
  employeeData
) {
    const mySet = new Set();
    let cleaningEmployee = [];
    // Xử lý personalData nếu không phải là null
    if (personalData !== null) {
        const employeePromises = personalData.map(async (personal) => {
            const newEmployee = new Employee(
                personal.Employee_ID,
                personal.First_Name,
                personal.Last_Name,
                personal.Shareholder_Status,
                personal.Gender,
                personal.Ethnicity,
                undefined,
                undefined,
                personal.Benefit_Plans,
                undefined,
                undefined,
                undefined
            );
            const employmentRecord = employmentData.find(
                (emp) => emp.Employee_ID === newEmployee.getId()
            );
            if (employmentRecord) {
                newEmployee.setEmploymentStatus(employmentRecord.Employment_Status);
            }
            // Xử lý employeeData
            await Promise.all(
                employeeData.map(async (employeeItem) => {
                    if (
                        employeeItem.firstName === newEmployee.getFirstname() &&
                        employeeItem.lastName === newEmployee.getLastname()
                    ) {
                        newEmployee.setPaidlastyear(employeeItem.paidLastYear);
                        newEmployee.setPaidtoday(employeeItem.paidToDate);
                        newEmployee.setvacationDays(employeeItem.vacationDays);
                        newEmployee.idMongo = employeeItem._id;
                        mySet.add(employeeItem.employeeId);
                    }
                })
            );
            cleaningEmployee.push(newEmployee);
        });
        await Promise.all(employeePromises);
    }

    // Xử lý employeeData nếu không phải là null
    if (employeeData !== null) {
        const newEmployeePromises = employeeData.map(async (employee) => {
            if (!mySet.has(employee.employeeId)) {
                const newEmployee1 = new Employee(
                    undefined,
                    employee.firstName,
                    employee.lastName,
                    undefined,
                    undefined,
                    undefined,
                    employee.paidLastYear,
                    employee.paidToDate,
                    undefined,
                    undefined,
                    employee.vacationDays,
                    employee._id
                );
                cleaningEmployee.push(newEmployee1);
            }
        });
        await Promise.all(newEmployeePromises);
    }

    return cleaningEmployee;
}