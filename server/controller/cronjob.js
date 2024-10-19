// cron/job.js
import cron from 'node-cron';
import { pro_inv } from '../model/investment.model.js';
import { LastRun } from '../model/LastRun.js';

// Function to get the last run time
async function getLastRunTime() {
    const lastRunDoc = await LastRun.findOne();
    return lastRunDoc ? lastRunDoc.lastRun : null;
}

// Function to set the last run time
async function setLastRunTime(date) {
    const lastRunDoc = await LastRun.findOne();
    if (lastRunDoc) {
        lastRunDoc.lastRun = date;
        await lastRunDoc.save();
    } else {
        await LastRun.create({ lastRun: date });
    }
}

// Schedule the cron job
cron.schedule('0 0 * * *', async () => { // Runs daily at midnight
    try {
        const lastRun = await getLastRunTime();
        const now = new Date();
        console.log(`Last run time: ${lastRun}`);
        
        const daysElapsed = lastRun ? Math.floor((now - lastRun) / (1000 * 60 * 60 * 24)) : 0; // Calculate elapsed days
        console.log(`Days elapsed: ${daysElapsed}`);

        if (daysElapsed > 0) {
            const investments = await pro_inv.find({
                end_date: { $gt: now } // Only consider active investments
            });

            investments.forEach(async (investment) => {
                // Update profit based on elapsed days
                investment.profit += investment.daily_income * daysElapsed; // Increase profit by daily income times the number of elapsed days
                await investment.save(); // Save the updated investment
            });
            console.log(`Profits updated for ${investments.length} investments.`);
        } else {
            console.log('No days have elapsed since the last run, skipping profit updates.');
        }

        await setLastRunTime(now); // Update last run time
        console.log('Cron job executed and profits updated');
    } catch (error) {
        console.error('Error executing cron job:', error);
    }
});
