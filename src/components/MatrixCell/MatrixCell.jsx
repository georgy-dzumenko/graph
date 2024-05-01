import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'styled-components'

import { createEdge, destroyEdge, destroyEdgeByKey, setEdgeCost } from '@features/graph/graphReducer'
import getGraph from '@features/graph/getGraph'
import { setHoverData } from '@features/interface/interfaceReducer'
import getInterface from '@features/interface/getInterface'

import styled from '@theme/styled'

import parseEdgeKey from '@utils/parseEdgeKey'

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
    const { edges } = useSelector(getGraph)
    const { hoverData } = useSelector(getInterface)
    const [value, setValue] = useState(edges?.find((el) => el.edgeKey === edgeKey)?.cost || 0)
    const dispatch = useDispatch()
    const theme = useTheme()

    const onChange = (event) => {
        if (!value) {
            const parsedKey = parseEdgeKey(edgeKey)
            dispatch(createEdge({ startVertexKey: parsedKey[0], endVertexKey: parsedKey[1], cost: +event.target.value }))
        }
        if (!+event.target.value) {
            dispatch(destroyEdgeByKey(edgeKey))
        }
        setValue(+event.target.value)
    }

    const onMouseEnter = () => {
        dispatch(setHoverData(edgeKey))
    }

    const onMouseLeave = () => {
        dispatch(setHoverData(''))
    }

    useEffect(() => {
        dispatch(setEdgeCost({ edgeKey, cost: value }))
    }, [value])

    useEffect(() => {
        setValue(edges?.find((el) => el.edgeKey === edgeKey)?.cost || 0)
    }, [edges])

    return <Input type='number' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onChange={onChange} $background='white' $boxShadow={hoverData === edgeKey ? `0 0 2px 1px ${theme.colors.secondary}` : `0 0 0px ${theme.colors.secondary}`} style={{ minWidth: 0, width: '100%', boxSizing: 'border-box' }} value={value} />
}

export default MatrixCell
