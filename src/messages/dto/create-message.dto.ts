import { User } from "src/user/entities/user.entity"

export class CreateMessageDto {

        messageBody:string
            sendBy:User
        receivedBy:User
    }
