import React, {useContext, useState, useRef} from 'react'
import {useImageGrid} from './useImageGrid'
import {ImageGridController} from "./image-grid-controller";
import {ModelResponseStatusContext, ImageGridContext} from "../data";


export const initialImageGrid = () => [...new Array(28)].map(() => [...new Array(28)].map(() => 0));

export const ImageGridContainer = () => {
    const imageGridRef = useRef();
    const {imageGrid, setImageGrid} = useImageGrid({imageGridRef});
    const [modelResponse, setModelResponse] = useState({});

    return (
        <ModelResponseStatusContext.Provider value={{modelResponse, setModelResponse}}>
            <ImageGridContext.Provider value={{imageGrid, setImageGrid, imageGridRef}}>
                <div className='row'>
                    <div className='col-lg-8 col-xxl-6'>
                        <ImageGrid/>
                    </div>
                    <div className='col-lg-4 col-xxl-6'>
                        <h1 className='text-center mt-5 mb-5'>ImageGrid</h1>
                        <ImageGridController onClick={() => alert('test')}/>
                        <ImageGridResult/>
                    </div>
                </div>
            </ImageGridContext.Provider>
        </ModelResponseStatusContext.Provider>

    );
}

const ImageGridResult = () => {
    const {modelResponse} = useContext(ModelResponseStatusContext);
    const {prediction, error, loading} = modelResponse;
    //console.log(modelResponse);
    //console.log(prediction);
    return <h1 className='text-center'>
        {prediction && `The Result is ${prediction}`}
        {error && `Ups something went wrong. Please check if the server is available!`}
        {loading && `Loading`}
    </h1>
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
