import React, { useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { destroyEdge } from '../../features/graph/graphReducer'

const Edge = ({ endVertex, startVertex, isCurrentEdge, id }) => {
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

    return (
        <svg draggable={false} style={{ width: '100%', height: '100%', position: 'absolute', stroke: color, fill: color }}>
            <marker
                xmlns='http://www.w3.org/2000/svg'
                id={`triangle-${randomId.current}`}
                viewBox='0 0 10 10'
                refX={isCurrentEdge ? '10' : '20'}
                refY='5'
                markerUnits='strokeWidth'
                markerWidth='8'
                markerHeight='6'
                orient='auto'>
                <path d='M 0 0 L 10 5 L 0 10 z' />
            </marker>
            {/* ${endPoint.x !== startPoint.x ? `${startPoint.x}, ${endPoint.y}` : ""} */}
            <polyline
                id={id}
                onMouseEnter={() => {
                    setColor('yellow')
                }}
                onMouseLeave={() => {
                    setColor('green')
                }}
                onMouseUp={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                }}
                onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    console.log('destroyEdge')
                    dispatch(destroyEdge(id))
                }}
                marker-end={`url(#triangle-${randomId.current})`}
                points={`
                ${startPoint?.coords?.x},${startPoint?.coords?.y}
                ${endPoint?.coords?.x},${endPoint?.coords?.y}
            `}
                strokeWidth='3'
            />
        </svg>
    )
}

export default Edge
