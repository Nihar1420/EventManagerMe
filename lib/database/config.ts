import mongoose from 'mongoose';

const mongoDbConnectionUri = process.env.MONGO_DB_CONNECTION_URL;
let cachedConnection: typeof mongoose | null = null;

export const dbConnect = async () => {
    if (cachedConnection) return cachedConnection
    if (!mongoDbConnectionUri) throw new Error("MongoDbConnectionString is not available");
    try {
        cachedConnection = await mongoose.connect(mongoDbConnectionUri, {
            bufferCommands: false
        });
        return cachedConnection;
    } catch (error: any) {
        throw new Error(error.message)
    }
}