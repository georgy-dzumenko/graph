import React, { useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { destroyEdge } from '../../features/graph/graphReducer'
import { openContextMenu } from '../../features/graph/interfaceReducer'
import Flex from '../Flex/Flex'

const Edge = ({ endVertex, startVertex, cost, isCurrentEdge, id }) => {
    const randomId = useRef(Math.random())
    const [color, setColor] = useState('green')
    const dispatch = useDispatch()

    const { vertexes } = useSelector((state) => state.graph)
    const startPoint = useMemo(() => {
        return vertexes.find(({ vertexKey }) => startVertex === vertexKey)
    }, [startVertex])
    const endPoint = useMemo(() => {
        if (typeof endVertex === 'string') {
            return vertexes.find(({ vertexKey }) => endVertex === vertexKey)
        }
        return endVertex
    }, [endVertex])

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

    return (
        <>
            <svg draggable={false} style={{ width: '100%', height: '100%', pointerEvents: 'none', position: 'absolute', stroke: color, fill: color }}>
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
                        setColor('lightgreen')
                    }}
                    onMouseLeave={() => {
                        setColor('green')
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
                $position='absolute'
                $left={
                    startPoint?.coords?.x < endPoint?.coords?.x
                        ? startPoint?.coords?.x + (endPoint?.coords?.x - startPoint?.coords?.x) / 2
                        : endPoint?.coords?.x + (startPoint?.coords?.x - endPoint?.coords?.x) / 2
                }
                $top={
                    startPoint?.coords?.y < endPoint?.coords?.y
                        ? startPoint?.coords?.y + (endPoint?.coords?.y - startPoint?.coords?.y) / 2
                        : endPoint?.coords?.y + (startPoint?.coords?.y - endPoint?.coords?.y) / 2
                }
                $userSelect='none'
                $width={22}
                $height={22}
                $background='white'
                $borderStyle='solid'
                $borderWidth='1px'
                $fontFamily='Arial'
                $borderColor={'primary'}
                $alignItems='center'
                $justifyContent='center'
                $transform='translate(-50%, -50%)'
                $borderRadius='50%'>
                {cost}
            </Flex>
        </>
    )
}

export default Edge
