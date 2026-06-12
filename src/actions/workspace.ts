'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 403 }

    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    })

    return {
      status: 200,
      data: { workspace: isUserInWorkspace },
    }
  } catch (error) {
    return {
      status: 403,
      data: { workspace: null },
    }
  }
}



export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    })

    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders }
    }

    return { status: 404, data: [] }
  } catch (error) {
    return { status: 500, data: [] }
  }
}



export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (videos && videos.length > 0) {
      return { status: 200, data: videos }
    }

    return { status: 404 }
  } catch (error) {
    return { status: 400 }
  }
}


export const getWorkSpaces =async () =>{

  try {

    const user = await currentUser()

    if(!user){
        return {
            status : 404
        }
    }
    
    const workSpaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    })

    if(workSpaces){
        return {
            status: 200 ,
            data: workSpaces
        }
    }

  } catch (error) {

    return {
        status : 400
    }
    
  }


}

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const userExist = await client.user.findUnique({
      where: { clerkid: user.id },
    })

    if (!userExist) return { status: 404 }

    const newWorkspace = await client.workSpace.create({
      data: {
        name,
        type: 'PUBLIC',
        userId: userExist.id,
      },
    })

    if (newWorkspace) {
      return { status: 201, data: 'Workspace created', workspace: newWorkspace }
    }
    return { status: 400, data: 'Failed to create workspace' }
  } catch (error) {
    return { status: 500, data: 'Internal server error' }
  }
}

export const createFolder = async (workspaceId: string , name:string) => {
  try {
    const newFolder = await client.folder.create({
      data: {
        name: name ,
        workSpaceId: workspaceId,
      },
    })
    if (newFolder) {
      return { status: 200, data: 'Folder created successfully', folder: newFolder }
    }
    return { status: 400, data: 'Failed to create folder' }
  } catch (error) {
    return { status: 500, data: 'Internal server error' }
  }
}

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const updatedFolder = await client.folder.update({
      where: { id: folderId },
      data: { name },
    })
    if (updatedFolder) {
      return { status: 200, data: 'Folder renamed successfully' }
    }
    return { status: 404, data: 'Folder not found' }
  } catch (error) {
    return { status: 500, data: 'Internal server error' }
  }
}

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: { id: folderId },
      select: {
        id: true,
        name: true,
      },
    })
    if (folder) {
      return { status: 200, data: folder }
    }
    return { status: 404, data: null }
  } catch (error) {
    return { status: 500, data: null }
  }
}

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const video = await client.video.findUnique({
      where: { id: videoId },
      select: {
        id: true,
        title: true,
        description: true,
        source: true,
        createdAt: true,
        views: true,
        summery: true,
        userId: true,
        User: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            image: true,
            clerkid: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    })

    if (!video) return { status: 404 }

    const isAuthor = video.User?.clerkid === user.id

    return {
      status: 200,
      data: video,
      author: isAuthor,
    }
  } catch (error) {
    return { status: 500 }
  }
}

export const sendEmailForFirstView = async (videoId: string) => {
  try {
    const video = await client.video.findUnique({
      where: { id: videoId },
      select: { views: true },
    })

    if (video) {
      await client.video.update({
        where: { id: videoId },
        data: {
          views: {
            increment: 1,
          },
        },
      })
      return { status: 200, data: 'First view notified' }
    }
    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}

export const moveVideoLocation = async (
  videoId: string,
  workSpaceId: string,
  folderId: string | null
) => {
  try {
    const updatedVideo = await client.video.update({
      where: { id: videoId },
      data: {
        workSpaceId,
        folderId: folderId || null,
      },
    })
    if (updatedVideo) {
      return { status: 200, data: 'Video moved successfully' }
    }
    return { status: 404, data: 'Video not found' }
  } catch (error) {
    return { status: 500, data: 'Internal server error' }
  }
}

export const updateVideoInfo = async (
  videoId: string,
  title: string,
  description: string
) => {
  try {
    const updatedVideo = await client.video.update({
      where: { id: videoId },
      data: {
        title,
        description,
      },
    })
    if (updatedVideo) {
      return { status: 200, data: 'Video info updated successfully' }
    }
    return { status: 404, data: 'Video not found' }
  } catch (error) {
    return { status: 500, data: 'Internal server error' }
  }
}


