import mongoose from "mongoose";

let connection: typeof mongoose;

const url = 'mongodb://0.0.0.0:27017/psms';

const startDb = async () => {
    try{
        if(!connection) {
        connection = await mongoose.connect(url);
        }
        return connection;
    }catch(error){
        throw new Error((error as any).message);
    }
    
};

export default startDb;