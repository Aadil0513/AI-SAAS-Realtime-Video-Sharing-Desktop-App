import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

import { verifyAccessToWorkspace } from '@/actions/workspace'

import  {dehydrate , HydrationBoundary, QueryClient } from '@tanstack/react-query'
 
import { getWorkspaceFolders } from '@/actions/workspace'

import { getWorkSpaces } from '@/actions/workspace'
import { getAllUserVideos  } from '@/actions/workspace'

import { getNotifications} from '@/actions/user'
// import { Sidebar } from 'lucide-react'

import Sidebar from "../../../components/global/sidebar"
type Props = {
  params: Promise<{ workspaceld: string }>
  children: React.ReactNode
}

const Layout = async ({ params, children }: Props) => {
  const { workspaceld: workspaceId } = await params
  const auth = await onAuthenticateUser()

  if (!auth.user?.workspace) redirect('/auth/sign-in')
  if (!auth.user.workspace.length) redirect('/auth/sign-in')

  // Note: Yeh function YouTuber video mein aage ja kar create/import karega
  const hasAccess = await  verifyAccessToWorkspace(workspaceId)

if(hasAccess.status !== 200){

    redirect(`/dashboard/${auth.user?.workspace[0].id}`)
}

if(!hasAccess.data?.workspace){

    return null

}

const query = new QueryClient()

await query.prefetchQuery({
    queryKey :['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workspaceId)

})

await query.prefetchQuery({
    queryKey :['user-videos'],
    queryFn: () => getAllUserVideos(workspaceId)

})

await query.prefetchQuery({
    queryKey :['user-workspaces'],
    queryFn: () => getWorkSpaces( )

})

await query.prefetchQuery({
    queryKey :['user-notifications'],
    queryFn: () => getNotifications()

})

  return (

    <HydrationBoundary state={dehydrate(query)}>

<div className='flex h-screen w-screen'>

    <Sidebar activeWorkspaceId = {workspaceId} />

</div>


    </HydrationBoundary>
  )
}

export default Layout