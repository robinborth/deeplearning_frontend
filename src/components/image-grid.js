import React, {useContext, useState, useRef} from 'react'
import {useImageGrid} from './useImageGrid'
import {ImageGridController} from "./image-grid-controller";
import {ModelResponseStatusContext, ImageGridContext, ServerStatusContext, modelUrl, icons} from "../data";


export const initialImageGrid = () => [...new Array(28)].map(() => [...new Array(28)].map(() => 0));

export const ImageGridContainer = () => {
    const imageGridRef = useRef();
    const {imageGrid, setImageGrid} = useImageGrid({imageGridRef});
    const [modelResponse, setModelResponse] = useState({noDraw: 'noDraw'});

    return (
        <ModelResponseStatusContext.Provider value={{modelResponse, setModelResponse}}>
            <ImageGridContext.Provider value={{imageGrid, setImageGrid, imageGridRef}}>
                <h1 className='text-center mb-5 mt-5 mt-lg-0'>MINST Dataset - CNN for Digit Recognition </h1>
                <div className='row mb-5'>
                    <div className='col-lg-7 col-xxl-6'>
                        <ImageGrid/>
                    </div>
                    <div className='col-lg-5 col-xxl-6 m-auto ps-3 ps-lg-4 mt-3 mt-lg-auto'>
                        <h2 className='mb-4'>Please draw something on the canvas!</h2>
                        <ServerStatusContainer />
                        <ImageGridResult/>
                        <ImageGridController onClick={() => alert('test')}/>
                    </div>
                </div>
            </ImageGridContext.Provider>
        </ModelResponseStatusContext.Provider>

    );
}

const ServerStatusContainer = () => {
    const {serverStatus} = useContext(ServerStatusContext);
    return <>
        <p className='text-break'><strong className='pe-2 text-uppercase'>REST API:</strong> {modelUrl}</p>
        <p><strong className='pe-2 text-uppercase'>Server Status:</strong> <i
            className={`${icons.server} ${serverStatus.status ? 'text-success' : 'text-danger'} pe-2`}>{}</i>
            <small className='server-status'>{serverStatus.status ? 'Heroku ready!' : 'Heroku sleeps this can take a few seconds!'}</small>
        </p>
    </>;
}


const ImageGridResult = () => {
    const {modelResponse} = useContext(ModelResponseStatusContext);
    const {prediction, error, loading, noDraw} = modelResponse;
    //console.log(modelResponse);
    //console.log(prediction);
    return <p><strong className='pe-2 text-uppercase'>CNN Response:</strong>
        <strong>{prediction && `The Result is ${prediction}`}
        {error && `Ups something went wrong. Please check if the server is available!`}
        {loading && `Loading ...`}
        {noDraw && `Please draw something on the canvas!`}
        </strong>
    </p>
}


const ImageGrid = () => {
    const {imageGrid, imageGridRef} = useContext(ImageGridContext);
    return (
        <div className='image-grid-container shadow'>
            <div className='image-grid' ref={imageGridRef}>
                {imageGrid.map((row, index) => <ImageRow key={index} row={row} row_index={index}/>)}
            </div>
        </div>
    );
}

const ImageRow = ({row, row_index}) => {
    return <>
        {row.map((col, index) => <ImageCell key={index} col_index={index} row_index={row_index}/>)}
    </>
}

const ImageCell = ({row_index, col_index}) => {
    const {imageGrid} = useContext(ImageGridContext);
    const opacity = imageGrid[row_index][col_index]
    const cellPosition = {
        left: `${col_index * 20}px`,
        top: `${row_index * 20}px`,
        backgroundColor: 'black',
        opacity: opacity,
    }
    return (
        <div className='image-gird-cell' style={cellPosition}>{}</div>
    );
}
