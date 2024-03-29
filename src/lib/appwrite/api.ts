import { INewPost, INewUser, IUpdatePost } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";



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
    userId: string,
    email: string,
    name: string,
    imageUrl: URL,
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

export async function signInAccount(user: {

    email: string,
    password: string,
}) {
    try {

        const newuser = await account.createEmailSession(
            user.email,
            user.password

        )

        return newuser
    } catch (err) {
        console.log(err)
    }

}

export async function getCurrentUser() {
    try {

        const currAccount = await account.get()
        if (!currAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('userId', currAccount.$id)]
        )
        if (!currentUser) throw Error
        return currentUser.documents[0]
    } catch (err) {
        console.log(err)
    }

}

export async function signOutAccount() {
    try {

        const session = await account.deleteSession("current")
        return session

    } catch (err) {
        console.log(err)
    }

}



export async function createNewPost(post: INewPost) {
    try {
        //upload the file into storage
        const uploadedFile = await uploadFile(post.file[0])

        if (!uploadedFile) throw Error

        //get File preview
        const fileUrl = await getFilePreview(uploadedFile.$id)

        //If file is corrupted then delete file from storage
        if (!fileUrl) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }

        //sort the tags
        const tags = post.tags?.replace(/ /g, '').split(',') || []

        //create Post
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }

        )
        if (!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }
        return newPost


    } catch (err) {
        console.log(err)
    }
}
export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file)
        return uploadedFile
    } catch (error) {
        console.log(error)
    }

}

export async function getFilePreview(fileId: string) {
    try {
        const filePreview = await storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        )

        return filePreview
    } catch (err) {
        console.log(err)
    }
}
export async function deleteFile(fileUrl: string) {
    try {
        storage.deleteFile(appwriteConfig.storageId, fileUrl)
        return { status: 'ok' }
    }
    catch (error) {
        console.log(error)
    }
}

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if (!posts) throw Error

    return posts
}

export async function likePost(postId: string, likesArray: string[]) {
    try {

        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }

        )
        if (!updatedPost) throw Error
        return updatedPost
    } catch (err) {
        console.log(err)
    }
}

export async function savePost(postId: string, userId: string) {

    try {

        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.saveCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId
            }

        )
        if (!updatedPost) throw Error
        return updatedPost
    } catch (err) {
        console.log(err)
    }
}

export async function deleteSavedPost(savedRecordId: string) {

    try {

        const updatedPost = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.saveCollectionId,
            savedRecordId

        )
        if (!updatedPost) throw Error
        return { status: 'ok' }
    } catch (err) {
        console.log(err)
    }
}

export async function getPostById(postId: string) {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )
        return post;
    }
    catch (error) {
        console.log(error);
    }
}

export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0
    try {
        let image = {
            imageurl: post.imageUrl,
            imageId: post.imageId
        }

        if (hasFileToUpdate) {
            const uploadedFile = await uploadFile(post.file[0])
            if (!uploadedFile) throw Error

            //get File preview
            const fileUrl = await getFilePreview(uploadedFile.$id)

            //If file is corrupted then delete file from storage
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id)
                throw Error
            }

            image = { ...image, imageurl: fileUrl, imageId: uploadedFile.$id }

        }
       
        //sort the tags
        const tags = post.tags?.replace(/ /g, '').split(',') || []

        //create Post
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {

                caption: post.caption,
                imageUrl: image.imageurl,
                imageId: image.imageId,
                location: post.location,
                tags: tags
            }

        )
        if (!updatedPost) {
            await deleteFile(post.imageId)
            throw Error
        }
        return updatedPost


    } catch (err) {
        console.log(err)
    }
}

export async function deletePost(postId: string, imageId: string){
    if(!postId || !imageId) throw Error;
    try{
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        return {status : 'ok'}
    }catch(error){
        console.log(error)
    }
}