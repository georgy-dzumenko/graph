import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSelectedVertexMethod } from '@features/interface/interfaceReducer'
import getGraph from '@features/graph/getGraph'

import styled from '@theme/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTranslations from '../../utils/useTranslations'

const SelectorComponents = styled('div')`
    background-color: ${'white'};
    flex: 1;
    height: 30px;
    padding: 4px 10px;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    align-items: center;
    font-size: 16px;
    border: solid 1px ${'gray'};
    position: relative;

    .chevron {
        position: absolute;
        height: 16px;
        width: 16px;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
        right: 5px;
    }

    .label {
        position: absolute;
        font-size: 14px;
        font-weight: bold;
    }

    .label--focused {
        font-size: 12px;
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
        font-weight: bold;
    }
`

const VertexSelector = forwardRef((props, ref) => {
    const [valueKey, setValueKey] = useState(false)
    const [value, setValue] = useState(false)
    const { vertexes } = useSelector(getGraph)
    const {t} = useTranslations()
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
            <label className={`label ${valueKey ? 'label--focused' : ''}`}>{t('Vertex')}</label>
            <div className='content'>{value ? value.index : ''}</div>
            {/* <div className='chevron' */}
            <FontAwesomeIcon className='chevron' icon="fa-solid fa-chevron-down" />
        </SelectorComponents>
    )
})

export default VertexSelector
