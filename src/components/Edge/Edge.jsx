import React, { useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'styled-components'

import { destroyEdge } from '@features/graph/graphReducer'
import getInterface from '@features/interface/getInterface'
import getGraph from '@features/graph/getGraph'
import { openContextMenu, setHoverData } from '@features/interface/interfaceReducer'

import createEdgeKey from '@utils/createEdgeKey'

import Flex from '@components/Flex/Flex'
import parseEdgeKey from '../../utils/parseEdgeKey'

const DISTANCE_FOR_PARALEL = 5

const Edge = ({ isGhost, endVertex, startVertex, cost, isCurrentEdge, id }) => {
    const randomId = useRef(Math.random())
    const {colors} = useTheme()
    
    const dispatch = useDispatch()

    const {hoverData} = useSelector(getInterface)
    const { vertexes, edges } = useSelector(getGraph)
    
    const edgeKey = createEdgeKey(startVertex, endVertex)
    
    const color = useMemo(() => hoverData === edgeKey ? colors.accentLight : colors.primary, [hoverData])

    const startPoint = useMemo(() => {
        const vertex = vertexes.find(({ vertexKey }) => startVertex === vertexKey)    

        const altEdge = edges.find(({ edgeKey: _edgeKey }) => createEdgeKey(endVertex, startVertex) === _edgeKey)
        if(altEdge && endVertex !== startVertex) {
            const altStartVertex = vertexes.find(({vertexKey}) => vertexKey === parseEdgeKey(altEdge.edgeKey)[0])
            let xDiff = DISTANCE_FOR_PARALEL
            let yDiff = -DISTANCE_FOR_PARALEL

            if(altStartVertex.coords.x > vertex.coords.x) {
                xDiff *= -1
            }

            if(altStartVertex.coords.y > vertex.coords.y) {
                yDiff *= -1
            }

            return {...vertex, coords: {x: vertex.coords.x + xDiff, y: vertex.coords.y + yDiff}}
        }
        return vertex
    }, [startVertex, endVertex, vertexes, edges])

    const endPoint = useMemo(() => {
        if (typeof endVertex === 'string') {
            const vertex = vertexes.find(({ vertexKey }) => endVertex === vertexKey)    
            const altEdge = edges.find(({ edgeKey: _edgeKey }) => createEdgeKey(endVertex, startVertex) === _edgeKey)
            if(altEdge && endVertex !== startVertex) {
                const altStartVertex = vertexes.find(({vertexKey}) => vertexKey === parseEdgeKey(altEdge.edgeKey)[1])
                let xDiff = DISTANCE_FOR_PARALEL
                let yDiff = -DISTANCE_FOR_PARALEL

                console.log('2endVertexData', vertex, altStartVertex)
                if(altStartVertex.coords.x < vertex.coords.x) {
                    xDiff *= -1
                }

                if(altStartVertex.coords.y < vertex.coords.y) {
                    yDiff *= -1
                }

                return {...vertex, coords: {x: vertex.coords.x + xDiff, y: vertex.coords.y + yDiff}}
            }
            return vertex
        }
        return endVertex
    }, [endVertex, startVertex, vertexes, edges])

    const onContextMenu = (event) => {
        event.preventDefault()
        dispatch(
            openContextMenu({
                title: startPoint.name + ' => ' + endPoint.name,
                coords: { x: event.clientX, y: event.clientY },
                options: [
                    {
                        callback: () => {
                            dispatch(destroyEdge(id))
                        },
                        title: 'delete'
                    }
                ]
            })
        )
    }

    const toSelf = endVertex === startVertex

    return (
        <>
            <svg draggable={false} style={{ opacity: isGhost ? 0.4 : 1, width: '100%', height: '100%', pointerEvents: 'none', position: 'fixed', stroke: color, top: 0, fill: color }}>
                <marker
                    xmlns='http://www.w3.org/2000/svg'
                    id={`triangle-${randomId.current}`}
                    viewBox='0 0 10 10'
                    refX={isCurrentEdge ? '10' : '20'}
                    refY='5'
                    markerUnits='strokeWidth'
                    markerWidth='6'
                    markerHeight='4'
                    orient='auto'
                    draggable={false}>
                    <path d='M 0 0 L 10 5 L 0 10 z' />
                </marker>
                {/* ${endPoint.x !== startPoint.x ? `${startPoint.x}, ${endPoint.y}` : ""} */}
                <polyline
                    draggable={false}
                    id={id}
                    marker-end={`url(#triangle-${randomId.current})`}
                    points={`
                ${startPoint?.coords?.x},${startPoint?.coords?.y}
                ${endPoint?.coords?.x},${endPoint?.coords?.y}
            `}
                    strokeWidth='3'
                />
                <polyline
                    draggable={false}
                    id={id}
                    onMouseEnter={() => {
                        dispatch(setHoverData(edgeKey))
                    }}
                    onMouseLeave={() => {
                        dispatch(setHoverData(''))
                    }}
                    onMouseUp={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                    }}
                    onMouseDown={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                    }}
                    onContextMenu={onContextMenu}
                    style={{ opacity: 0, pointerEvents: 'auto' }}
                    points={`
                ${startPoint?.coords?.x},${startPoint?.coords?.y}
                ${endPoint?.coords?.x},${endPoint?.coords?.y}
            `}
                    strokeWidth='20'
                />
            </svg>
            <Flex
                style={{ pointerEvents: 'none' }}
                $position='fixed'
                $left={
                    (startPoint?.coords?.x < endPoint?.coords?.x
                        ? startPoint?.coords?.x + (endPoint?.coords?.x - startPoint?.coords?.x) / 2
                        : endPoint?.coords?.x + (startPoint?.coords?.x - endPoint?.coords?.x) / 2) + (+toSelf * -30)
                }
                $top={
                    startPoint?.coords?.y < endPoint?.coords?.y
                        ? startPoint?.coords?.y + (endPoint?.coords?.y - startPoint?.coords?.y) / 2
                        : endPoint?.coords?.y + (startPoint?.coords?.y - endPoint?.coords?.y) / 2
                }
                $opacity={isGhost ? 0.4 : 1}
                $userSelect='none'
                $width={16}
                $height={16}
                $background='white'
                $borderStyle='solid'
                $borderWidth='1px'
                $fontFamily='Arial'
                $borderColor='primary'
                $alignItems='center'
                $justifyContent='center'
                $transform='translate(-50%, -50%)'
                $borderRadius='50%'>
                {cost || 0}
            </Flex>
        </>
    )
}

export default Edge
