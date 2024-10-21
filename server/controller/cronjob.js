import cron from 'node-cron';
import { pro_inv } from '../model/investment.model.js';

// Schedule the cron job to run every minute
cron.schedule('* * * * *', async () => {
    try {
        const today = new Date();
        console.log('Current Date:', today);

        // Fetch active investments
        const investments = await pro_inv.find({ end_date: { $gte: today } });
        console.log('Active Investments:', investments);

        // Check if there are any investments
        if (investments.length === 0) {
            console.log("There are no active investments at this time.");
            return; // Exit if no investments found
        }

        // Loop through the investments and calculate profit
        for (let investment of investments) {
            // Calculate elapsed time since last_run
            const elapsedMilliseconds = today - investment.last_run; // Time since last run in milliseconds
            const elapsedMinutes = Math.floor(elapsedMilliseconds / 60000); // Convert to minutes
            console.log('Elapsed Minutes:', elapsedMinutes);

            // Only update if some time has passed
            if (elapsedMinutes > 0) {
                // Calculate profit based on daily income
                investment.profit += (elapsedMinutes * investment.daily_income) / 1440; // Calculate profit per minute
                investment.last_run = today; // Update last_run to current time
                await investment.save(); // Save the updated investment
            }
        }

        console.log('Profit updated for active investments.');
    } catch (error) {
        console.error('Error in cron job:', error.message);
    }
});
