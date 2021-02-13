import React, {useContext, useRef} from 'react'
import {useImageGrid, initialImageGrid} from "./useImageGrid";

function App() {
    const imageGridRef = useRef();
    const {imageGrid, setImageGrid} = useImageGrid({imageGridRef});

    return (
        <ImageGridContext.Provider value={{imageGrid, setImageGrid, imageGridRef}}>
            <h1>ImageGrid</h1>
            <ImageGridContainer/>
            <Controller/>
        </ImageGridContext.Provider>
    );
}

const Controller = () => {
    const {imageGrid, setImageGrid} = useContext(ImageGridContext);

    async function handleSend() {
        console.log('sending');
        const url = 'https://servermnist.herokuapp.com/mnist/api/v1.0/model';
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({image: imageGrid})
        });
        const json = await response.json()
        console.log('response');
        console.log(json);
    }

    const handleUndo = () => setImageGrid(initialImageGrid())

    return <>
        <button onClick={() => handleUndo()}>Undo</button>
        <button onClick={() => handleSend()}>Send</button>
    </>
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
