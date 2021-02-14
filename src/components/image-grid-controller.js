import React, {useContext} from 'react'
import {initialImageGrid} from "./image-grid";
import {modelUrl, postFetch,ImageGridContext, ModelResponseStatusContext, icons} from "../data";

export const ImageGridController = () => {
    const {imageGrid, setImageGrid} = useContext(ImageGridContext);
    const {setModelResponse} = useContext(ModelResponseStatusContext);

    async function handleSend() {
        setModelResponse({loading: 'loading'})
        console.log('in handle Send')
        const response = await postFetch({
            url: modelUrl,
            body: JSON.stringify({image: imageGrid})
        });
        console.log('after response');
        console.log(response);
        setModelResponse(response);
    }

    const handleUndo = () => setImageGrid(initialImageGrid())

    return <div className='d-flex justify-content-evenly align-items-center'>
        <ControllerButton handleClick={handleUndo} status={'danger'} icon={icons.undo} text={'Undo'}/>
        <ControllerButton handleClick={handleSend} status={'success'} icon={icons.send} text={'Send'}/>
    </div>;
}

const ControllerButton = ({handleClick, status, icon, text}) => {
    return (
        <button className={`btn btn-${status} controller-button`} onClick={() => handleClick()}>
            <i className={`${icon}`}>{}</i>
            <p>{text}</p>
        </button>
    );
}
