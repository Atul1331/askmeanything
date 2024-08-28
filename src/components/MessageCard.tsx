"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Message } from "@/model/User.model"
import { useToast } from "./ui/use-toast"
import { ApiResponse } from "@/types/ApiResponse"
import axios from "axios"

type MessageCardProps = {
    message : Message;
    onMessageDelete: (messageId: string) => void
// Remove the closing curly brace
}
  
const MessageCard = ({ message, onMessageDelete}: MessageCardProps) => {

    const { toast } = useToast()
    const handleDeleteConfirm = async () => {
        const response =await axios.delete(`/api/delete-message/${message._id}`)
        toast({
            title: response.data.message,
            
        })
        onMessageDelete(message._id as string)
    }



  return (
    <Card>
        <CardHeader>
            <CardTitle>{message.content}</CardTitle>
            <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="p-2 w-8 h-8 ml-[90%]" variant="destructive"><X className="w-5 h-5"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

            <CardDescription>{message.createdAt.toString()}</CardDescription>
        </CardHeader>
        <CardContent>
            <p></p>
        </CardContent>
    </Card>

  )
}


export default MessageCard
