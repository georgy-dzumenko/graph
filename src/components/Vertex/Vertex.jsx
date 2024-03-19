import React from 'react'
import styled from '@theme/styled'
import { useDispatch } from 'react-redux'
import { destroyConnection, endCurrentEdge, openContextMenu, startCurrentEdge } from '../../features/graph/graphReducer'

const StyledVertex = styled('div')`
    background-color: ${'accent'};
    width: 17px;
    height: 17px;
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
`

const Vertex = ({ name, coords, vertexKey }) => {
    const dispatch = useDispatch()

    const onMouseDown = (event) => {
        event.preventDefault()
        if (event.button === 0) {
            dispatch(startCurrentEdge(vertexKey))
        }
    }

    const onMouseUp = (event) => {
        event.preventDefault()
        if (event.button === 0) {
            dispatch(endCurrentEdge(vertexKey))
        }
    }

    const onClick = (event) => {
        if (event.button === 0) {
            event.preventDefault()
        }
    }

    const onContextMenu = (event) => {
        event.preventDefault()
        dispatch(
            openContextMenu({
                title: 'lorem ipsum',
                coords: { x: event.clientX, y: event.clientY },
                options: [
                    {
                        callback: () => {
                            dispatch(destroyConnection(vertexKey))
                        },
                        title: 'delete'
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
            onContextMenu={onContextMenu}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
        />
    )
}

export default Vertex
