import { Router } from "express";
import KafkaConfig from "../kafka/config.js";
import { TOPICMIDDLEWARE,CREATE_PARTITION,UPDATE_PARTITION,DELETE_PARTITION } from "../config.js";

const kafkaConfig = new KafkaConfig();

const router = Router();

 
router.post("/",async (req,res)=>{
    try{
        if (!req.body || typeof req.body !== 'object') {
            throw new Error('Invalid JSON format');
        }
        // Quy định các trường bắt buộc trong req.body
        const requiredFields = ['employeeId', 'firstName', 'lastName', 'shareHolder', 'gender', 'ethnicity', 'paidToDate', 'paidLastYear', 'employmentStatus', 'vacationDays', 'benefitID'];
        for (const field of requiredFields) {
            if (!(field in req.body)) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        const messages = [
            {
                EventType: "create",
                Data: JSON.stringify(req.body)
            }
        ]; 

        await kafkaConfig.produceWithoutPartition(TOPICMIDDLEWARE, messages);

        return res.status(200).json({
            success: true,
            data: req.body
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.messages
        });
    }
})


// Test thành công
router.put("/:employeeId", async (req, res) => {
    try {
        const {employeeId,id} = req.params;

        if (!req.body || typeof req.body !== 'object') {
            throw new Error('Invalid JSON format');
        }

        const requiredFields = ['employeeId','firstName', 'lastName','idMongo'];
        for (const field of requiredFields) {
            if (!(field in req.body)) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        const messages = [
            {
                EventType: "update",
                Data: JSON.stringify(req.body)
            }
        ];
        await kafkaConfig.produceWithoutPartition(TOPICMIDDLEWARE, messages);

        return res.status(200).json({
            success: true,
            data: req.body
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

//Test api thành công 
router.delete("/:employeeId/:id?", async (req, res) => {
    try {
        const {employeeId,id} = req.params;

        const messages = [
            {
                    EventType: "delete",
                    Data: JSON.stringify({
                        employeeId: employeeId,
                        id: id
                    })
            }
        ];

        await kafkaConfig.produceWithoutPartition(TOPICMIDDLEWARE, messages);

        return res.status(200).json({
            success: true,
            deletedEmployeeId: {employeeId,id}
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

export default router;