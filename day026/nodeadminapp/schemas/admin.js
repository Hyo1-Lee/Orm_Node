const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

const adminSchema = new Schema({
    company_code:{
        type: Number,
        required: true,
    },
    department_name:{
        type: String,
        required: true,
    },
    admin_id:{
        type: String,
        required: true,
    },
    admin_password:{
        type: String,
        required: true,
    },
    admin_name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    telephone:{
        type: String,
        required: true,
    },
    use_status_code: {
        type: String,
        required: true,
    },
    reg_user_id: {
        type: Number,
        required: false,
    },
    edit_user_id: {
        type: Number,
        required: false,
    },
    edit_date: {
        type: Date,
        default: Date.now,
    },
    reg_date: {
        type: Date,
        default: Date.now,
    }
});

adminSchema.plugin(AutoIncrement, { inc_field: "admin_member_id" });

module.exports = mongoose.model('Admin', adminSchema);