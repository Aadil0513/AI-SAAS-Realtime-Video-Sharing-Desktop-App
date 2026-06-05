 'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return { status: 403 }
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    })

    if (userExist) {
      return { status: 200, user: userExist }
    }

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: 'PERSONAL',
          },
        },
      },
      include: {
        workspace: {
          where: {},
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    })

    if (newUser) {
      return { status: 201, user: newUser }
    }

    return { status: 400 }
  } catch (error) {
    return { status: 500 }
  }
}



export const getNotifications =async() =>{

    try {

        const user  = await currentUser() 
        if(!user){
            return {
                status : 404 
            }
        }

        const notifications = await client.user.findUnique({

            where :{
                clerkid : user.id
            } ,

            select :{
                notification : true ,
                _count :{


                    select :{
                        notification: true
                    }
                }
            }
        })

        if(notifications && notifications.notification.length>0){
            return {
                status : 200,
                data : notifications
            }

        }

         return {
            status : 404,
            data: []
        }
        
    } catch (error) {

        return {
            status : 400,
            data: []
        }
        
    }


}


export const searchUsers = async (query: string) => {
  try {
    // 1. Current logged-in user ki details backend session se nikalna
    const user = await currentUser()
    if (!user) return { status: 404 }

    // 2. Database (Prisma client) se matching users search karna
    const users = await client.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { email: { contains: query } },
          { lastname: { contains: query } },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    })

    // 3. Agar users mil jayein toh data return karna
    if (users && users.length > 0) {
      return { status: 200, data: users }
    }

    // 4. Agar koi match na mile
    return { status: 404, data: undefined }
  } catch (error) {
    // 5. Agar code crash ho ya database server down ho
    return { status: 500, data: undefined }
  }
}