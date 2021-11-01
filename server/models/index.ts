import { Schema} from 'mongoose'
import mg from '../db'
import mgValidator from 'mongoose-unique-validator'

interface UserInterface {
    _id: Schema.Types.ObjectId
    email: string
    password: string
}
interface NewsInterface {
    _id: Schema.Types.ObjectId
   text: string
   userId: {
       _id: number
   }
   own: boolean
}

const usersScheme = new Schema<UserInterface>({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})
const newsScheme = new Schema<NewsInterface>({
    text:{
        type: String,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})
usersScheme.plugin(mgValidator)
newsScheme.plugin(mgValidator)

const Users = mg.model<UserInterface>('Users',usersScheme)
const News = mg.model('News',newsScheme)

export {Users, News, UserInterface, NewsInterface}