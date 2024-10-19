import mongoose from "mongoose";

const lastRunSchema = new mongoose.Schema({
    lastRun: {
        type: Date,
        default: Date.now
    }
});

export const LastRun = mongoose.model('lastRun', lastRunSchema);