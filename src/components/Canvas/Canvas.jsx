import React, { useRef, useState } from 'react'
import styled from '@theme/styled'
import Vertex from '@components/Vertex/Vertex'
import Edge from '@components/Edge/Edge'
import { useDispatch, useSelector } from 'react-redux'
import { cancelCurrentEdge, closeContextMenu, createVertex, openContextMenu } from '../../features/graph/graphReducer'

const CanvasContainer = styled('div')`
    flex: 1;
    height: 100vh;
    position: relative;
`

const EdgesContainer = styled('svg')`
    width: 100%;
    height: 100%;
    position: absolute;
`

const VertexesContainer = styled('div')`
    width: 100%;
    height: 100%;
    position: absolute;
`

const Canvas = () => {
    const canvas = useRef()
    const { currentEdge, edges, vertexes, isContextMenuOpened } = useSelector((state) => state.graph)
    const dispatch = useDispatch()
    const [mouseCoords, setMouseCoords] = useState({})

    const renderEdge = (data, index) => {
        return <Edge {...data} id={index}></Edge>
    }

    const renderVertex = (data) => {
        return <Vertex {...data}></Vertex>
    }

    const addVertex = (event) => {
        if (!currentEdge) {
            dispatch(
                createVertex({
                    coords: {
                        x: event.clientX,
                        y: event.clientY
                    },
                    name: 'vertex',
                    vertexKey: new Date().toISOString()
                })
            )
        }
        dispatch(cancelCurrentEdge())
    }

    return (
        <CanvasContainer onClick={addVertex} onMouseMove={(event) => setMouseCoords({ coords: { x: event.clientX, y: event.clientY } })}>
            <VertexesContainer draggable={false}>
                {currentEdge && <Edge isCurrentEdge {...{ ...currentEdge, endVertex: currentEdge?.endVertex || mouseCoords }} />}
                {edges.map(renderEdge)}
                {vertexes.map(renderVertex)}
            </VertexesContainer>
        </CanvasContainer>
    )
}

export default Canvas
