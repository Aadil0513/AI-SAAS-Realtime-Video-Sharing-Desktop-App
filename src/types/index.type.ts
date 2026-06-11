export type WorkspaceProps ={

    data: {

        subscription:{
            plan : 'FREE' | 'PRO'
        } | null

        workspace :{
            id : string 
            name : string
            type : 'PUBLIC' | 'PERSONAL'
        } []

        members : {
            Workspace : {
                id : string 
                name: string
                type : 'PUBLIC' | 'PERSONAL'
            }
        }[]
    }
}


export type NotificationProps = {
  status: number
  data: {
    _count: {
      notification: number
    }
  }
}

export type FolderProps = {
  status: number
  data: {
    id: string
    name: string
    _count: {
      videos: number
    }
  }
}

export type VideoProps = {
  status: number
  author: boolean
  data: {
    id: string
    title: string | null
    description: string | null
    source: string
    createdAt: Date
    views: number
    summery: string | null
    User: {
      id: string
      firstname: string | null
      lastname: string | null
      image: string | null
      clerkid: string
      trial: boolean
      subscription: {
        plan: 'FREE' | 'PRO'
      } | null
    } | null
  }
}

export type VideosProps = {
  status: number
  data: {
    id: string
    title: string | null
    createdAt: Date
    source: string
    processing: boolean
    Folder: {
      id: string
      name: string
    } | null
    User: {
      firstname: string | null
      lastname: string | null
      image: string | null
    } | null
  }[]
}

