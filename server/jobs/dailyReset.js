// import cron from "node-cron";
// import { user_product_model } from "../model/user_product.js";

// cron.schedule(
//   "0 */12 * * *", // Runs every minute
//   async () => {
//     try {
//       // Fetch the user's product data
//       const user_products = await user_product_model.find({});

//       if (user_products && user_products.length > 0) {
//         const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

//         for (const product of user_products) {
//           // Convert last_run from seconds to a date string in YYYY-MM-DD format
//           const lastRunDate = new Date(product.last_run * 1000)
//             .toISOString()
//             .split("T")[0];

//           // console.log("Today Date:", todayDate);
//           // console.log("Last Run Date:", lastRunDate);

//           if (lastRunDate === todayDate) {
//             console.log("No update needed for product, same date");
//             continue; // Skip this product if already updated today
//           }

//           if (product.buy == false && product.sell == false) {
//             console.log(`Already False wait for the update ${product._id}`);
//             continue; // Skip this product if already updated today
//           }

//           // Reset buy and sell flags for a new day
//           product.buy = false;
//           product.sell = false;

//           console.log(
//             `Product statuses reset for a new day.user product id ${product._id}`
//           );

//           // Save the updated product back to the database
//           await product.save();
//         }
//       } else {
//         console.log("No user products found for this user.");
//       }
//     } catch (err) {
//       console.error("Error resetting task statuses:", err);
//     }
//   },
//   {
//     timezone: "Asia/Kolkata", // Ensure the cron job runs in the correct timezone
//   }
// );
