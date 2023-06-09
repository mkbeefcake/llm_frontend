import React from 'react';
import { useRouter } from 'next/navigation';
import useUser from '../../lib/useUser'
import { useEffect, useState } from 'react';
import fetchJson from '../../lib/fetchJson';

import Sidebar from "./sidebar"

const projectStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    backgroundColor: '#1B192C',
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
    backgroundColor: '#28313f',
}

export default function HomeLayout({ children }) {

    const router = useRouter();
    const { user } = useUser({ });
  
    const [myProviders, setMyProviders] = useState([]);
  
    useEffect(() => {    
      if (user !== undefined && user.isLoggedIn === false) {
        router.replace('/dashboard/login')
      }  
    }, [user, router])

    useEffect(() => {
        getMyProviders()
    }, [])
    
    const getMyProviders = async () => {
      try {  
        const response = await fetchJson('/api/getMyProviders');
        console.log(`Response: ${JSON.stringify(response)}`);
        setMyProviders(response);
      }
      catch (err) {
        console.log(`Home Screen: ${err}`)
      }
    }

    const onUpdateScreen = () => {
        getMyProviders()
    }

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { myProviders, onUpdateScreen})
        }
        return child
    })
    

    return (
        <div style={projectStyle}>
            <div style={sideBarStyle}>
                <Sidebar myProviders={myProviders}/>
            </div>
            <div style={workSpaceStyle}>
                {childrenWithProps}
            </div>
        </div>
    )
}

