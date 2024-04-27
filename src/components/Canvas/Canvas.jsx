import React, { useEffect, useRef, useState } from 'react'
import styled from '@theme/styled'
import Vertex from '@components/Vertex/Vertex'
import Edge from '@components/Edge/Edge'
import { useDispatch, useSelector } from 'react-redux'
import { cancelCurrentEdge, createVertex, generateMatrix, selectVertexes } from '../../features/graph/graphReducer'
import SelectionArea from '../SelectionArea/SelectionArea'
import getGraph from '../../features/graph/getGraph'
import Flex from '../Flex/Flex'
import getInterface from '../../features/graph/getInterface'

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
    const { currentEdge, edges, vertexes, isContextMenuOpened, selectedVertexes } = useSelector(getGraph)
    const { selectVertexMethod } = useSelector(getInterface)
    const dispatch = useDispatch()
    const [mouseCoords, setMouseCoords] = useState({})

    const [selectAreaCoords, setSelectAreaCoords] = useState({})

    const renderEdge = (data, index) => {
        return <Edge {...data} id={index}></Edge>
    }

    const renderVertex = (data) => {
        return <Vertex {...data}></Vertex>
    }

    const addVertex = (event) => {
        if (!currentEdge && !selectAreaCoords.endPoint) {
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
        setSelectAreaCoords({})
        if (selectAreaCoords.startPoint && selectAreaCoords.endPoint) {
            dispatch(selectVertexes(selectAreaCoords))
        }
        dispatch(cancelCurrentEdge())
    }

    const startSelectionArea = (event) => {
        setSelectAreaCoords((prev) => ({ ...prev, startPoint: { x: event.clientX, y: event.clientY } }))
    }

    useEffect(() => {
        dispatch(generateMatrix())
    }, [edges, vertexes])

    return (
        <CanvasContainer
            onClick={addVertex}
            onMouseDown={startSelectionArea}
            onMouseMove={(event) => {
                setMouseCoords({ coords: { x: event.clientX, y: event.clientY } })
                if (selectAreaCoords.startPoint) {
                    if (
                        Math.abs(selectAreaCoords.startPoint.x - event.clientX) > 20 ||
                        Math.abs(selectAreaCoords.startPoint.y - event.clientY) > 20
                    ) {
                        setSelectAreaCoords((prev) => ({ ...prev, endPoint: { x: event.clientX, y: event.clientY } }))
                    }
                }
            }}
            ref={canvas}>
            <VertexesContainer draggable={false}>
                {currentEdge && <Edge isCurrentEdge {...{ ...currentEdge, endVertex: currentEdge?.endVertex || mouseCoords }} />}
                {edges.map(renderEdge)}
                {vertexes.map(renderVertex)}
                <Flex
                    style={{
                        transition: '0.5s ease',
                        backdropFilter: !selectVertexMethod ? 'blur(0px)' : 'blur(10px)',
                        pointerEvents: !selectVertexMethod ? 'none' : 'auto',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        background: !selectVertexMethod ? 'transparent' : 'rgba(0,0,0,0.2)'
                    }}></Flex>
                <SelectionArea canvas={canvas.current} {...selectAreaCoords} />
            </VertexesContainer>
        </CanvasContainer>
    )
}

export default Canvas
