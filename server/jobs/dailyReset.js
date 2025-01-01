cron.schedule('0 0 * * *', async () => {
  try {
    await user_product_model.updateMany({}, { buy: false, sell: false });
    console.log('Task statuses have been reset for a new day.');
  } catch (err) {
    console.error('Error resetting task statuses:', err);
  }
}, {
  timezone: 'Asia/Kolkata' // Ensures task runs at midnight IST
});
