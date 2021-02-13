import React, {useContext, useRef} from 'react'
import {useImageGrid} from "./useImageGrid";

function App() {
    const imageGridRef = useRef();
    const {imageGrid} = useImageGrid({imageGridRef});

    return (
        <ImageGridContext.Provider value={{imageGrid, imageGridRef}}>
            <h1>ImageGrid</h1>
            <ImageGridContainer/>
        </ImageGridContext.Provider>
    );
}


const ImageGridContext = React.createContext([]);

const ImageGridContainer = () => {
    const {imageGrid, imageGridRef} = useContext(ImageGridContext);
    return (
        <div className='image-grid-container'>
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

export default App;
