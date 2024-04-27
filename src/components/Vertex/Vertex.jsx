import React from 'react'
import styled from '@theme/styled'
import { useDispatch, useSelector } from 'react-redux'
import {
    cleanSelectedVertexes,
    destroyVertex,
    endCurrentEdge,
    renameVertex,
    selectVertexes,
    startCurrentEdge
} from '../../features/graph/graphReducer'
import { openContextMenu, openModal } from '../../features/graph/interfaceReducer'
import getInterface from '../../features/graph/getInterface'
import getGraph from '../../features/graph/getGraph'
import { keyframes } from '../../theme/styled'

const accent = keyframes`
    from {
    transform: scale(1);
    }

    to {
        transform: scale(2);
    }
`

const StyledVertex = styled('div')`
    background-color: ${'accent'};
    transition: 0.2s ease;
    cursor: ${({ $selectVertexMethod }) => ($selectVertexMethod ? 'pointer' : 'none')};
    width: ${({ $selectVertexMethod }) => ($selectVertexMethod ? '30px' : '20px')};
    height: ${({ $selectVertexMethod }) => ($selectVertexMethod ? '30px' : '20px')};
    z-index: 10;
    box-shadow: 0 0 3px black;
    border: solid 1px ${'background'};
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Vertex = ({ name, coords, vertexKey, index }) => {
    const dispatch = useDispatch()

    const { selectedVertexes } = useSelector(getGraph)
    const { selectVertexMethod } = useSelector(getInterface)

    const onMouseDown = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.button === 0 && !selectVertexMethod) {
            dispatch(startCurrentEdge(vertexKey))
        }
    }

    const onMouseUp = (event) => {
        event.preventDefault()
        if (event.button === 0 && !selectVertexMethod) {
            dispatch(endCurrentEdge(vertexKey))
        }
    }

    const onClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.button === 0) {
            if (selectVertexMethod) {
                selectVertexMethod(vertexKey)
            }
        }
    }

    const renameModalData = {
        title: `RENAME '${name}' VERTEX`,
        element: <input id='rename-input' />,
        options: [
            {
                callback: () => {
                    dispatch(renameVertex({ vertexKey, name: document.querySelector('#rename-input').value }))
                },
                title: 'accept'
            }
        ]
    }

    const onContextMenu = (event) => {
        event.preventDefault()
        dispatch(
            openContextMenu({
                title: name,
                coords: { x: event.clientX, y: event.clientY },
                options: [
                    {
                        callback: () => {
                            if (selectedVertexes.length) {
                                selectedVertexes.forEach((el) => dispatch(destroyVertex(el.vertexKey)))
                                dispatch(cleanSelectedVertexes())
                            } else {
                                dispatch(destroyVertex(vertexKey))
                            }
                        },
                        title: 'delete'
                    },
                    {
                        callback: () => {
                            dispatch(openModal(renameModalData))
                        },
                        title: 'rename'
                    }
                ]
            })
        )
    }

    return (
        <StyledVertex
            key={vertexKey}
            $top={coords.y}
            $left={coords.x}
            $background={selectedVertexes.find((el) => vertexKey === el.vertexKey) ? '#228B22' : '#00FF00'}
            onContextMenu={onContextMenu}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            $selectVertexMethod={selectVertexMethod}>
            <div
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                {index}
            </div>
        </StyledVertex>
    )
}

export default Vertex
