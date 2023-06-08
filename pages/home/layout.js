import Sidebar from "./sidebar"

const projectStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    backgroundColor: '#1B192C',
}

const sideBarStyle = {
    height: '100vh',
    width: '18vw',
    borderRight: '1px solid #33303F',
    padding: '0 6px',
    backgroundColor: '#1b222e'
}

const workSpaceStyle = {
    height: '100vh',
    width: '82vw',
    backgroundColor: '#28313f',
}

export default function HomeLayout({ children }) {
    return (
        <div style={projectStyle}>
            <div style={sideBarStyle}>
                <Sidebar/>
            </div>
            <div style={workSpaceStyle}>
                {children}
            </div>
        </div>
    )
}

