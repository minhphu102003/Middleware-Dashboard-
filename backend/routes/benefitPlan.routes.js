import { Router } from "express";
import { getHRData } from "../uses/getAPI.js";

const router = Router();

router.get("/", async (req,res)=>{
    try{
        let benefitPlan = await getHRData("http://localhost:19335/api/benefit_plans");
        return res.status(200).json({
            success: true,
            data: benefitPlan
        })
    }catch(err){
        console.log(err);
        return res.status(200).json({
            success: true,
            data: []
        });
    }
});

export default router;