import {useState, useEffect} from 'react';

let mousedown = false;
const count_cell = 28;
const initialImageGrid = [...new Array(count_cell)].map(() => [...new Array(count_cell)].map(() => 0));

export const useImageGrid = ({imageGridRef}) => {

    const [imageGrid, setImageGrid] = useState(initialImageGrid);

    const setCellAtPosition = ({row_index, col_index, value}) => setImageGrid(prevImageGrid => {
        const curImageGrid = [...prevImageGrid];
        curImageGrid[row_index][col_index] = value;
        return curImageGrid;
    });
 

    useEffect(() => {
        const startUpdatingCells = (e) => {
            if (!mousedown) {
                mousedown = true;
                window.addEventListener("mousemove", updatingCells);
                updatingCells(e);
            }
        }

        const endUpdatingCells = () => {
            if (mousedown) {
                mousedown = false;
                window.removeEventListener("mousemove", updatingCells);
            }
        }

        const getRelCursorPos = (e, x, y) => {
            return {x: e.clientX - x, y: e.clientY - y}
        };

        const getTargetCell = (relCursorPos, width, height) => {
            if(relCursorPos.x < 0 || relCursorPos.y < 0) return {error: -1};
            if(relCursorPos.x > width || relCursorPos.y > height ) return {error: -1};
            let row_index = Math.floor(relCursorPos.y / 20)
            let col_index = Math.floor(relCursorPos.x / 20)
            if(row_index >= 28) row_index = 27;
            if(col_index >= 28) col_index = 27;
            return {row_index,col_index}
        }

        const updatingCells = (e) => {
            if (imageGridRef && imageGridRef.current && mousedown) {
                const {x, y, width, height} = imageGridRef.current.getBoundingClientRect();
                const relCursorPos = getRelCursorPos(e,x, y);
                const targetCell = getTargetCell(relCursorPos, width, height);
                if(!targetCell.error) setCellAtPosition({...targetCell,value:1.0});
            }
        }

        if (imageGridRef && imageGridRef.current) {
            window.addEventListener("mousedown", startUpdatingCells);
            window.addEventListener("mouseup", endUpdatingCells);
        }

        return () => {
            window.removeEventListener("mousedown", startUpdatingCells);
            window.removeEventListener("mouseup", endUpdatingCells);
        }
    }, [imageGridRef, imageGrid]);

    return {imageGrid}
}


