import { Kafka } from "kafkajs";
import { CLIENTID,BROKERS,GROUPID } from "../config.js";

class KafkaConfig{
    constructor(groupId = GROUPID){
        this.kafka = new Kafka({
            clientId: CLIENTID,
            brokers:[BROKERS]
        })
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({
            groupId:groupId
        })
    }

    async produce(topic, messages){
        try{
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: messages
            })
        }catch(err){
            console.log(err)
        }finally{
            await this.producer.disconnect()
        }
    }

    async consume(topic,callback){
        try{
            await this.consumer.connect()
            await this.consumer.subscribe({
                topic: topic,
                fromBeginning: true
            })
            await this.consumer.run({
                eachMessage: async ({topic,partition,message})=>{
                    const value = message.value.toString()
                    callback(value)
                }
            })
        }catch(err){
            console.log(err)
        }
    }
    
    async produceWithPartition(topic, message, partition) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: [{
                    value: JSON.stringify(message),
                    partition: partition
                }]
            });
        } catch (err) {
            console.error(err);
        } finally {
            await this.producer.disconnect();
        }
    }

    async produceWithoutPartition(topic, message) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: [{
                    value: JSON.stringify(message)
                }]
            });
        } catch (err) {
            console.error(err);
        } finally {
            await this.producer.disconnect();
        }
    }
}

export default KafkaConfig;