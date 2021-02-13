import {useState, useEffect} from 'react';

let mousedown = false;
const count_cell = 28;
export const initialImageGrid = () => [...new Array(count_cell)].map(() => [...new Array(count_cell)].map(() => 0));

export const useImageGrid = ({imageGridRef}) => {
    const [imageGrid, setImageGrid] = useState(initialImageGrid());

    const setCellsAtPosition = (cells) => setImageGrid(prevImageGrid => {
        const curImageGrid = [...prevImageGrid];
        cells.forEach(({row_index, col_index, value})=>{
            //console.log(row_index, col_index, value);
            curImageGrid[row_index][col_index] = Math.max(value, curImageGrid[row_index][col_index]);
        });
        return curImageGrid;
    });


    useEffect(() => {
        const startUpdatingCells = () => {
            if (!mousedown) {
                mousedown = true;
            }
        }

        const endUpdatingCells = () => {
            if (mousedown) {
                mousedown = false;
            }
        }

        const getRelCursorPos = (e, x, y) => {
            return {x: e.clientX - x, y: e.clientY - y}
        };

        const getTargetCells = (relCursorPos, width, height) => {
            const cursorRange = 20;
            const distanceCap = 20;
            let multiCursors = [
                {x: relCursorPos.x - cursorRange, y: relCursorPos.y - cursorRange},
                {x: relCursorPos.x, y: relCursorPos.y - cursorRange},
                {x: relCursorPos.x + cursorRange, y: relCursorPos.y - cursorRange},

                {x: relCursorPos.x - cursorRange, y: relCursorPos.y},
                {x: relCursorPos.x, y: relCursorPos.y},
                {x: relCursorPos.x + cursorRange, y: relCursorPos.y},

                {x: relCursorPos.x - cursorRange, y: relCursorPos.y + cursorRange},
                {x: relCursorPos.x, y: relCursorPos.y + cursorRange},
                {x: relCursorPos.x + cursorRange, y: relCursorPos.y + cursorRange},
            ];

            const isPositionNotInImageGrid = ({x, y}) => !(x > 0 && y > 0 && x < width && y < height);

            multiCursors = multiCursors.map(pos => {
                if(isPositionNotInImageGrid(pos)) return {value: 0}
                const row_index = Math.max(Math.min(Math.floor(pos.y / 20), 27), 0)
                const col_index = Math.max(Math.min(Math.floor(pos.x / 20), 27), 0)
                const center_row_y = 10 + row_index * 20;
                const center_col_x = 10 + col_index * 20;
                const delta_x = center_col_x - relCursorPos.x;
                const delta_y = center_row_y - relCursorPos.y;
                let distance_cursor_to_center_cell = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y,2) );
                distance_cursor_to_center_cell = Math.min(distanceCap, distance_cursor_to_center_cell)
                const value = 1 - (distance_cursor_to_center_cell/distanceCap);
                return {...pos, row_index, col_index, value}
            })

            //console.log(multiCursors);

            multiCursors = multiCursors.filter(({value}) => value > 0);

            //console.log(multiCursors);

            if(multiCursors) return multiCursors;
            return {error: -1};
        }

        const updatingCells = (e) => {
            if (imageGridRef && imageGridRef.current && mousedown) {
                const {x, y, width, height} = imageGridRef.current.getBoundingClientRect();
                const relCursorPos = getRelCursorPos(e, x, y);
                const targetCells = getTargetCells(relCursorPos, width, height);
                if (!targetCells.error) setCellsAtPosition(targetCells);
            }
        }

        if (imageGridRef && imageGridRef.current) {
            window.addEventListener("mousedown", startUpdatingCells);
            window.addEventListener("mouseup", endUpdatingCells);
            window.addEventListener("mousemove", updatingCells)
        }

        return () => {
            window.removeEventListener("mousedown", startUpdatingCells);
            window.removeEventListener("mouseup", endUpdatingCells);
            window.removeEventListener("mousemove", updatingCells);
        }
    }, [imageGridRef, imageGrid]);

    return {imageGrid, setImageGrid}
}


