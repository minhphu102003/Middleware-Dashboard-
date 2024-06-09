import {cleaningData} from "../uses/mergeData.js";
import{getHRData,getSIPData} from "../uses/getAPI.js";


export async function clean(){
    let personal, employment, employee;

    try {
        personal = await getHRData("http://localhost:19335/api/personal");
    } catch (error) {
        console.error("Error fetching personal data:", error);
        personal = [];
    }
    try {
        employment = await getHRData("http://localhost:19335/api/employment");
    } catch (error) {
        console.error("Error fetching employment data:", error);
        employment = [];
    }
    try {
        employee = await getSIPData("http://localhost:4000/api/employee/");
    } catch (error) {
        console.error("Error fetching employee data:", error);
        employee = [];
    }
    if( !personal && !employment && !employee){
        return [];
    }
    const cleanedData = await cleaningData(personal, employment, employee);
    return cleanedData;
}

