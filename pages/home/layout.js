import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '../../lib/useUser'
import { useEffect, useState } from 'react';

import Sidebar from "./sidebar"
import { HomeContextProvider } from '../../context/home/context/provider';
import { HomeContext } from '../../context/home/context/context';

const projectStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
}

const sideBarStyle = {
    height: '100vh',
    width: '20vw',
    borderRight: '1px solid #33303F',
    padding: '0 6px',
    backgroundColor: '#1b222e'
}

const workSpaceStyle = {
    height: '100vh',
    width: '80vw',
}

export default function HomeLayout({ children }) {

    const router = useRouter();
    const { user } = useUser({ });
  
    const { myProviders, onUpdateScreen } = useContext(HomeContext)
  
    useEffect(() => {    
      if (user !== undefined && user.isLoggedIn === false) {
        router.replace('/dashboard/login')
      }  
    }, [user, router])
    

    // const childrenWithProps = React.Children.map(children, child => {
    //     if (React.isValidElement(child)) {
    //         return React.cloneElement(child, { myProviders, onUpdateScreen})
    //     }
    //     return child
    // })
    

    return (
        <HomeContextProvider>
            <div style={projectStyle}>
                <div style={sideBarStyle}>
                    <Sidebar />
                </div>
                <div style={workSpaceStyle}>
                    {/* {childrenWithProps} */}
                    {children}
                </div>
            </div>
        </HomeContextProvider>
    )
}

