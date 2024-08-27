import mongoose, { Schema } from "mongoose"

// creating an interface for Message structure
export interface Message extends Document {
    _id: any
    content: string,
    createdAt: Date,
}

// Defining Message schema
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Creating an interface for User structure
export interface User {
    username: string,
    email: string,
    password: string,
    verifyCode: string,   // for otp validation
    verifyCodeExpiry: Date,   // to store time until which otp is valid
    isVerified: boolean      // to check if user is verified or not
    isAcceptingMessage: boolean,
    messages: Message[]
}

// Defining User Schema
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required."], // error message if user does not enter username
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        match: [/.+\@.+\..+/, "Invalid email. Use a valid email."],  // using regex for email structure and validation.
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry time is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]  // array of type Message
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)


export default UserModel;