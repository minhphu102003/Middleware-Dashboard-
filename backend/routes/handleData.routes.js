import { Router } from "express";
import fs from "fs";
import {cleaningData} from "../uses/mergeData.js";
import{getHRData,getSIPData} from "../uses/getAPI.js";


const routes = Router();


routes.get("/", async (req, res) => {
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
            return res.status(500).json({
                success: false,
                data : "Not found"
            })
        }
        const cleanedData = await cleaningData(personal, employment, employee);

        return res.status(200).json({
            success: true,
            data: cleanedData
        });
});

export default routes;