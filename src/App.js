import React, {useState, useContext, useEffect} from 'react'
import {ImageGridContainer} from "./components/image-grid";
import {ServerStatusContext, serverStatusUrl, postFetch, modelUrl} from "./data";
import {icons} from "./data";


function App() {
    const [serverStatus, setServerStatus] = useState({});

    useEffect(() => {
        postFetch({
            url: serverStatusUrl,
            body: {},
        }).then(response => {
            setTimeout(()=>setServerStatus(response),3000)
        });
    }, [serverStatus]);

    return <ServerStatusContext.Provider value={{serverStatus, setServerStatus}}>
        <div className='container'>
            <ImageGridContainer/>
            <ServerStatusContainer/>
            <CopyRight/>
        </div>
    </ServerStatusContext.Provider>;
}

const ServerStatusContainer = () => {
    const {serverStatus} = useContext(ServerStatusContext);
    return <div className='fixed-bottom text-center mb-5'>
        <p><strong className='p-2 text-uppercase'>REST API:</strong> {modelUrl}</p>
        <p><strong className='p-2 text-uppercase'>Server Status:</strong> <i className={`${icons.server} ${serverStatus.status ? 'text-success' : 'text-danger'}`}>{}</i></p>
    </div>;
}

const CopyRight = () => {
    return <div className='fixed-bottom text-center mb-3'>
        <h5>&copy; Robin Borth</h5>
    </div>;
}

export default App;
