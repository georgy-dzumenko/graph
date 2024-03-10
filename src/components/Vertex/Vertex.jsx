import React from 'react'
import styled from '@theme/styled'
import { useDispatch } from 'react-redux'
import { endCurrentEdge, startCurrentEdge } from '../../features/graph/graphReducer'

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
        dispatch(startCurrentEdge(vertexKey))
    }

    const onMouseUp = () => {
        dispatch(endCurrentEdge(vertexKey))
    }

    const onClick = (event) => {
        event.preventDefault()
    }

    return <StyledVertex key={vertexKey} $top={coords.y} $left={coords.x} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onClick} />
}

export default Vertex
