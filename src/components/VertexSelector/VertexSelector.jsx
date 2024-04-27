import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedVertexMethod } from '../../features/graph/interfaceReducer'
import styled from '../../theme/styled'
import getGraph from '../../features/graph/getGraph'
import getInterface from '../../features/graph/getInterface'

const SelectorComponents = styled('div')`
    background-color: white;
    flex: 1;
    height: 30px;
    padding: 0 5px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    font-size: 16px;
    border: solid 1px ${'primary'};
    position: relative;

    &::after {
        content: '⌄';
        position: absolute;
        top: 50%;
        transform: scaleX(175%) translateY(-75%);
        font-size: 16px;
        right: 5px;
    }

    .label {
        position: absolute;
        font-size: 14px;
    }

    .label--focused {
        font-size: 10px;
        top: 0px;
        background-color: ${'primary'};
        color: white;
        padding: 1px 4px;
        border-radius: 3px;
        transform: translateY(-50%);
        left: 5px;
    }

    .content {
        padding-top: 4px;
    }
`

const VertexSelector = forwardRef((props, ref) => {
    const [valueKey, setValueKey] = useState(false)
    const [value, setValue] = useState(false)
    const { vertexes } = useSelector(getGraph)
    const dispatch = useDispatch()

    useImperativeHandle(
        ref,
        () => {
            return {
                value
            }
        },
        [value]
    )

    const selectVertexMethod = (selectedVertexKey) => {
        setValueKey(selectedVertexKey)

        dispatch(setSelectedVertexMethod(null))
    }

    useEffect(() => {
        const selectedVertex = vertexes.find(({ vertexKey }) => vertexKey === valueKey)

        setValue(selectedVertex || false)
    }, [vertexes, valueKey])

    const onClick = () => {
        dispatch(setSelectedVertexMethod(selectVertexMethod))
    }

    return (
        <SelectorComponents onClick={onClick}>
            <label className={`label ${valueKey ? 'label--focused' : ''}`}>vertex</label>
            <div className='content'>{value ? value.index : ''}</div>
        </SelectorComponents>
    )
})

export default VertexSelector
