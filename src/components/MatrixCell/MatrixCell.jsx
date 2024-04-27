import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEdge, destroyEdge, destroyEdgeByKey, setEdgeCost } from '../../features/graph/graphReducer'
import styled from '../../theme/styled'

const Input = styled('input')`
    cursor: pointer;
    transition: 0.05s ease;
    border: solid 1px #c1c1c1;
    border-radius: 5px;

    &:hover {
        background-color: #eaeaea;
    }
`

const MatrixCell = ({ edgeKey }) => {
    const { edges } = useSelector((state) => state.graph)
    const [value, setValue] = useState(edges?.find((el) => el.edgeKey === edgeKey)?.cost || 0)
    const dispatch = useDispatch()

    const onChange = (event) => {
        if (!value) {
            dispatch(createEdge({ startVertexKey: edgeKey.split('=>')[0], endVertexKey: edgeKey.split('=>')[1], cost: +event.target.value }))
        }
        if (!+event.target.value) {
            dispatch(destroyEdgeByKey(edgeKey))
        }
        setValue(+event.target.value)
    }

    useEffect(() => {
        dispatch(setEdgeCost({ edgeKey, cost: value }))
    }, [value])

    useEffect(() => {
        setValue(edges?.find((el) => el.edgeKey === edgeKey)?.cost || 0)
    }, [edges])

    return <Input type='number' onChange={onChange} style={{ minWidth: 0, width: '100%', boxSizing: 'border-box' }} value={value} />
}

export default MatrixCell
