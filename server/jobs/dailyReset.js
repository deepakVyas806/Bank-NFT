import cron from 'node-cron';
import { user_product_model } from '../model/user_product.js';


// Schedule the job to run every day at midnight (00:00)
cron.schedule('* * * * *', async () => {
  try {
    // Reset the status of all tasks to false
    await user_product_model.updateMany({}, { buy: false,sell:false });
    console.log('Task statuses have been reset for a new day.');
  } catch (err) {
    console.error('Error resetting task statuses:', err);
  }
});
