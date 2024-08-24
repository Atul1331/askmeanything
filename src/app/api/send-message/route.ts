import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { Message } from '@/model/User.model'

export async function POST(request: Request){
    await dbConnect()

    const {username, content } = await request.json()

    try{
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success: false,
                message: "User Not Found"
            }, {
                status: 404
            })
        }

        // is user accepting the message
        if(!user.isAcceptingMessage){
            return Response.json({
                success: false,
                message: "User not accepting messages"
            }, {
                status: 403
            })
        }

        const newMessage = {content, createdAt: new Date()}
        user.messages.push(newMessage)
        await user.save()

        return Response.json({
            success: true,
            message: "Message sent succesfully"
        }, {
            status: 401
        })
    }
    catch(error){
        console.log("Error sending message ", error)
        return Response.json({
            success: false,
            message: "Internal Server error"
        }, {
            status: 500
        })
    }
}