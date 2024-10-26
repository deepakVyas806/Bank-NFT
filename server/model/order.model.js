import mongoose from 'mongoose';

const order_schema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true // Make it required if necessary
    },
    amount: {
        type: Number,
        required: true // Make it required if necessary
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_register",
        required: true // Make it required if necessary
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true // Make it required if necessary
    },
    status: {
        type: String,
        enum: ['process', 'create', 'paid', 'failed'],
        default: 'process'
    },
    receipt: {
        type: String
    },
    payment_sign: {
        type: String
    },
    payment_orderId: {
        type: String
    },
    payment_paymentId: {
        type: String
    },
    daily_income: {
        type: Number
    },
    total_income: {
        type: Number
    },
    createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000) // Use a function to get the current timestamp
    },
    updatedAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000) // Use a function for updatedAt as well
    }
});

// Pre-save middleware to update the updatedAt field
order_schema.pre('save', function (next) {
    this.updatedAt = Math.floor(Date.now()/1000); // Update updatedAt to current UNIX timestamp
    next();
});

// Export the model
export const order_model = mongoose.model('order', order_schema);
