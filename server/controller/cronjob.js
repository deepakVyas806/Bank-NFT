// import cron from 'node-cron';
// import { pro_inv } from '../model/investment.model.js';

// const profileData = async (req, res) => {
//   try {
//     let isUpdate = false;
//     const today = new Date();
//     console.log('Current Date:', today);

//     // Fetch active investments
//     const investments = await pro_inv.find({ end_date: { $gte: today } });
//     console.log('Active Investments:', investments);

//     // Check if there are any investments
//     if (investments.length === 0) {
//       console.log("There are no active investments at this time.");
//       return res.status(200).json({ success: false, message: 'No active investments at this time.' });
//     }

//     // Loop through the investments and calculate profit
//     for (let investment of investments) {
//       // Calculate elapsed time since last_run
//       const elapsedMilliseconds = today - investment.last_run;
//       const elapsedMinutes = Math.floor(elapsedMilliseconds / 60000);

//       // Validate daily_income and elapsedMinutes
//       if (!investment.daily_income || isNaN(investment.daily_income)) {
//         console.log(`Invalid daily_income for investment:`, investment);
//         continue; // Skip this investment if daily_income is invalid
//       }

//       if (elapsedMinutes <= 0 || isNaN(elapsedMinutes)) {
//         console.log(`Invalid or insufficient time elapsed for investment:`, investment);
//         continue; // Skip if no time has passed or invalid elapsed time
//       }

//       // Calculate and update profit based on elapsed time
//       const profitToAdd = (elapsedMinutes * investment.daily_income) / 1440; // Calculate profit per minute
//       if (!isNaN(profitToAdd) && profitToAdd > 0) {
//         console.log(`Before investment update`, investment);
//         investment.profit += profitToAdd;
//         investment.last_run = today; // Update last_run to current time
//         await investment.save(); // Save the updated investment
//         console.log(`After investment update`, investment);
//         isUpdate = true;
//       } else {
//         console.log(`Calculated profit is NaN or non-positive for investment:`, investment);
//       }
//     }

//     if (isUpdate) {
//       console.log('Profit updated for active investments.');
//       return res.status(200).json({ success: true, message: 'Profit updated successfully.' });
//     } else {
//       console.log('No updates performed. Please wait for sufficient time to pass.');
//       return res.status(200).json({ success: false, message: 'No updates. Wait for more time.' });
//     }
//   } catch (error) {
//     console.error('Error in updating profit:', error.message);
//     return res.status(500).json({ success: false, message: 'Error in updating profit.' });
//   }
// };

// export { profileData };
