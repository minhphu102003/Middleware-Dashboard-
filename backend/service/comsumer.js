// kafkaConsumer.js
import KafkaConfig from "../kafka/config.js";
import { WebSocketServer, WebSocket } from 'ws';
import { TOPICHR, TOPICSIP, TOPICMIDDLEWARE } from "../config.js";
import { sendEmployeeChangeEvent } from "./kafka.js";

export default function setupKafkaConsumers(wss, cleaning) {
  const kafkaConfig = new KafkaConfig();

  kafkaConfig.consume(TOPICHR, async (value) => {
    console.log("Receive message: ", value);
    const eventData = JSON.parse(value);
    console.log(eventData);
    let EventType = eventData.EventType;
    if (EventType != undefined) {
      const Data = JSON.parse(eventData.Data);
      if (EventType == "create") {
        try {
          const {
            Employee_ID,
            First_Name,
            Last_Name,
            Gender,
            Shareholder_Status,
            Benefit_Plans,
            Ethnicity,
          } = Data;
          const employeeUpdate = {
            id: parseInt(Employee_ID),
            firstname: First_Name,
            lastname: Last_Name,
            shareholder: Shareholder_Status,
            gender: Gender,
            ethnicity: Ethnicity,
            paidtoday: null,
            paidlastyear: null,
            employmentStatus: null,
            vacationDays: null,
            benefitPlanID: Benefit_Plans,
            idMongo: null,
          };
          cleaning.push(employeeUpdate);
          const dataToSendFrontEnd = {
            event: "create",
            data: employeeUpdate
          };
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(dataToSendFrontEnd));
            }
          });
        } catch (error) {
          console.error("Error calling API:", error);
        }
      } else if (EventType == "update") {
        console.log(EventType);
        try {
          const {
            Employee_ID,
            First_Name,
            Last_Name,
            Gender,
            Shareholder_Status,
            Benefit_Plans,
            Ethnicity,
          } = Data;
          if (cleaning !== null) {
            const index = cleaning.findIndex((emp) => emp.id === Employee_ID);
            if (index !== -1) {
              cleaning[index].firstname = First_Name;
              cleaning[index].lastname = Last_Name;
              cleaning[index].shareholder = Shareholder_Status;
              cleaning[index].gender = Gender;
              cleaning[index].ethnicity = Ethnicity;
              cleaning[index].benefitPlanID = Benefit_Plans;
              const dataToSendFrontEnd = {
                event: "update",
                data: cleaning[index]
              };
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify(dataToSendFrontEnd));
                }
              });
              const employeeUpdate = {
                employeeId: Employee_ID,
                firstName: First_Name,
                lastName: Last_Name,
                shareHolder: Shareholder_Status,
                gender: Gender,
                ethnicity: Ethnicity,
                paidToDate: cleaning[index].paidtoday,
                paidLastYear: cleaning[index].paidlastyear,
                employmentStatus: cleaning[index].employmentStatus,
                vacationDays: cleaning[index].vacationDays,
                benefitID: Benefit_Plans,
                idMongo: cleaning[index].idMongo,
              };
              if (cleaning[index].idMongo !== null) {
                const messages = [
                  {
                    EventType: "updateMiddleware",
                    Data: JSON.stringify(employeeUpdate),
                  },
                ];
                kafkaConfig.produceWithoutPartition(TOPICHR, messages);
              }
            }
          }
        } catch (error) {
          console.error("Error calling API:", error);
        }
      } else if (EventType == "delete") {
        try {
          const { employeeId } = Data;
          if (cleaning !== null) {
            const index = cleaning.findIndex((emp) => emp.id === employeeId);
            if(index !==-1 ){
              const id = cleaning[index].idMongo;
              const idMongo = -1;
              const dataToSendFrontEnd = {
                event: "delete",
                data: {
                  id: cleaning[index].id,
                  idMongo:idMongo
                }
              };
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify(dataToSendFrontEnd));
                }
              });
              cleaning.splice(index, 1);
              if (id !== null) {
                const messages = [
                  {
                    EventType: "deleteMiddleware",
                    Data: JSON.stringify({ id }),
                  },
                ];
                kafkaConfig.produceWithoutPartition(TOPICHR, messages);
              }
            }
          }
        } catch (error) {
          console.error("Error calling API:", error);
        }
      }
    } else {
      EventType = eventData[0].EventType;
      const Data = JSON.parse(eventData[0].Data);
      if (EventType == "createSip") {
        const { employeeId, idMongo } = Data;
        console.log(employeeId);
        const index = cleaning.findIndex((emp) => emp.id === employeeId);
        console.log(index);
        if (index !== -1) {
          console.log(idMongo);
          cleaning[index].idMongo = idMongo;
          const dataToSendFrontEnd = {
            event: "updatekey",
            data: {
              id: employeeId,
              idMongo: idMongo
            }
          };
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(dataToSendFrontEnd));
            }
          });
        }
      }
    }
  });

  const kafkaConfigSIP = new KafkaConfig("middleware-sip");
  kafkaConfigSIP.consume(TOPICSIP,async (value) => {
    console.log("Receive message: ", value);
    const eventData = JSON.parse(value);
    const EventType = eventData.EventType;
    if (EventType === "create") {
      const {
        _id,
        employeeId,
        firstName,
        lastName,
        vacationDays,
        paidToDate,
        paidLastYear,
      } = eventData.Data;
      const employee = {
        id: employeeId,
        firstname: firstName,
        lastname: lastName,
        benefitPlanID: null,
        employmentStatus: null,
        ethnicity: null,
        gender: false,
        idMongo: _id,
        paidlastyear: paidLastYear,
        paidtoday: paidToDate,
        vacationDays: vacationDays,
        shareholder: null
      }
      cleaning.push(employee);
      console.log(`Thêm mới nhân viên thành công ${employee} `);
      const dataToSendFrontEnd = {
        event: "create",
        data: employee
      };
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(dataToSendFrontEnd));
        }
      });
    } else if (EventType === "update") {
      const {
        _id,
        employeeId,
        firstName,
        lastName,
        vacationDays,
        paidToDate,
        paidLastYear,
      } = eventData.Data;
      const index = cleaning.findIndex((emp) => emp.idMongo === _id);
      console.log(index)
      if(index !==-1){
        console.log(cleaning[index]);
        const employee = {
          _id: _id,
          employeeId: cleaning[index].id,
          firstName: firstName,
          lastName: lastName,
          vacationDays: vacationDays,
          paidToDate: paidToDate,
          paidLastYear: paidLastYear,
          payRate: 0,
          payRateId: 0
        }
        cleaning[index].firstname = firstName;
        cleaning[index].lastname = lastName;
        const dataToSendFrontEnd = {
          event: "update",
          data: cleaning[index]
        };
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(dataToSendFrontEnd));
          }
        });
        await sendEmployeeChangeEvent("updateMiddleware",employee,TOPICSIP)
        console.log(`Cập nhật nhân viên thành công ${employee}`);
      }
      
    } else if(EventType === "delete") {
      const { employeeId } = eventData.Data;
      const index = cleaning.findIndex((emp) => emp.idMongo === employeeId);
      if(index !==- 1){
        let id = cleaning[index].id;
        if( id === null){
          id = -1;
        }
        cleaning.splice(index, 1);
        const employee = {
          employeeId: id,
          id: employeeId
        }
        const dataToSendFrontEnd = {
          event: "delete",
          data: {
            id: id,
            idMongo: employeeId
          }
        };
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(dataToSendFrontEnd));
          }
        });
        await sendEmployeeChangeEvent("deleteMiddleware",employee,TOPICSIP);
        console.log(`Xóa nhân viên thành công ${employee}`);
      }
    }
  });

  const kafkaConfigMid = new KafkaConfig("createSip");
  kafkaConfigMid.consume(TOPICMIDDLEWARE, async (value) => {
    const eventData = JSON.parse(value);
    console.log(eventData);
    const EventType = eventData[0].EventType;
    if(EventType !== undefined){
      const Data = JSON.parse(eventData[0].Data);
      if (EventType == "createSip") {
        const { employeeId, idMongo } = Data;
        const index = cleaning.findIndex((emp) => emp.id === employeeId);
        if (index !== -1) {
          cleaning[index].idMongo = idMongo;
          console.log(cleaning[index]);
          const dataToSendFrontEnd = {
            event: "updatekey",
            data: {
              id: employeeId,
              idMongo: idMongo
            }
          };
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(dataToSendFrontEnd));
            }
          });
        }
      } else if (EventType == "create") {
        const {
          employeeId,
          firstName,
          lastName,
          shareHolder,
          gender,
          ethnicity,
          paidToDate,
          paidLastYear,
          employmentStatus,
          vacationDays,
          benefitID,
        } = Data;
        const employeeUpdate = {
          id: parseInt(employeeId),
          firstname: firstName,
          lastname: lastName,
          shareholder: shareHolder,
          gender: gender,
          ethnicity: ethnicity,
          paidtoday: paidToDate,
          paidlastyear: paidLastYear,
          employmentStatus: employmentStatus,
          vacationDays: vacationDays,
          benefitPlanID: benefitID,
          idMongo: null,
        };
        console.log(employeeUpdate);
        cleaning.push(employeeUpdate);
      } else if (EventType == "delete") {
        const { employeeId, id } = Data;
        if (employeeId !== -1) {
          const index = cleaning.findIndex((emp) => emp.id === employeeId);
          if (index !== -1) {
            // Xóa nhân viên trong mảng tại vị trí index
            cleaning.splice(index, 1);
            console.log(`Xóa nhân viên tại vị trí ${index}`);
          }
        } else if (id !== -1) {
          const index = cleaning.findIndex((emp) => emp.idMongo === id);
          if (index !== -1) {
            // Xóa nhân viên trong mảng tại vị trí index
            cleaning.splice(index, 1);
            console.log(`Xóa nhân viên tại vị trí ${index}`);
          }
        }
      } else if (EventType == "update") {
        const {
          employeeId,
          firstName,
          lastName,
          shareHolder,
          gender,
          ethnicity,
          paidToDate,
          paidLastYear,
          employmentStatus,
          vacationDays,
          benefitID,
          idMongo,
        } = Data;
        const employeeUpdate = {
          id: parseInt(employeeId),
          firstname: firstName,
          lastname: lastName,
          shareholder: shareHolder,
          gender: gender,
          ethnicity: ethnicity,
          paidtoday: paidToDate,
          paidlastyear: paidLastYear,
          employmentStatus: employmentStatus,
          vacationDays: vacationDays,
          benefitPlanID: benefitID,
          idMongo: idMongo,
        };
        if (employeeId !== 1) {
          const index = cleaning.findIndex((emp) => emp.id === employeeId);
          if (index !== -1) {
            cleaning[index] = employeeUpdate;
            console.log(`Employee with id ${employeeId} has been updated.`);
          }
        } else if (idMongo !== -1) {
          const index = cleaning.findIndex((emp) => emp.idMongo === idMongo);
          if (index !== -1) {
            cleaning[index] = employeeUpdate;
            console.log(`Employee with id ${idMongo} has been updated.`);
          }
        }
      }
    }
  });
}
