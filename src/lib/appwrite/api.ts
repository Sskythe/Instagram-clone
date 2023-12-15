import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )


        if (!newAccount) {
            throw Error
        }

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = saveUserToDB({
            userId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        })

        return newUser
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function saveUserToDB(user: {
    userId:string,
    email:string,
    name:string,
    imageUrl:URL,
    username?: string

}) {
    try {

        const newuser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user

        )

        return newuser
    } catch (err) {
        console.log(err)
    }

}