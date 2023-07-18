import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();


const Connection = async () => {
    const URL =`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-wma0kwb-shard-00-00.fkuamc6.mongodb.net:27017,ac-wma0kwb-shard-00-01.fkuamc6.mongodb.net:27017,ac-wma0kwb-shard-00-02.fkuamc6.mongodb.net:27017/?ssl=true&replicaSet=atlas-71pf7n-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}





export default Connection;