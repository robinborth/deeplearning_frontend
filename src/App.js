import React, {useState, useEffect} from 'react'
import {ImageGridContainer} from "./components/image-grid";
import {ServerStatusContext, serverStatusUrl, postFetch} from "./data";


function App() {
    const [serverStatus, setServerStatus] = useState({});

    useEffect(() => {
        postFetch({
            url: serverStatusUrl,
            body: {},
        }).then(response => {
            setTimeout(() => setServerStatus(response), 3000)
        }).catch(_ => setTimeout(() => setServerStatus({error: 'error'}), 3000));
    }, [serverStatus]);

    return <ServerStatusContext.Provider value={{serverStatus, setServerStatus}}>
        <div className='container'>
            <ImageGridContainer/>
            <CopyRight/>
        </div>
    </ServerStatusContext.Provider>;
}


const CopyRight = () => {
    return <div className='fixed-bottom text-center mb-3'>
        <h5>&copy; Robin Borth</h5>
    </div>;
}

export default App;
