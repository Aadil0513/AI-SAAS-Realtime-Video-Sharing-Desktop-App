import React from 'react'
import LandingPageNavBar from '../_components/navbar'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col gap-y-10 py-10 px-10 xl:px-0 container">
            <LandingPageNavBar />
            {children}</div>
    )
}

export default Layout