import { Router } from "express";
import { getHRData } from "../uses/getAPI.js";

const router  = Router();

router.get("/", async (req,res)=>{
    try{
        let jobHistory = await getHRData("http://localhost:19335/api/job_history");
        return res.status(200).json({
            success: true,
            data: jobHistory
        })
    }catch(err){
        console.log(err);
        return res.status(200).json({
            success: true,
            data: []
        })
    }
})


export default router;