import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from '@theme/styled'

import { closeContextMenu } from '@features/interface/interfaceReducer'
import getInterface from '@features/interface/getInterface'

const Container = styled('div')`
    background-color: ${'background'};
    border: solid 1px ${'primary'};
    height: max-content;
    border-radius: 10px;
    overflow: hidden;
    font-size: 18px;
    max-width: max-content;
    font-family: Arial, Helvetica, sans-serif;
    position: absolute;
    z-index: 1000;
`

const Title = styled('div')`
    width: 100%;
    padding: 4px 10px;
    border-bottom: solid 1px ${'primary'};
`

const Option = styled('div')`
    width: 100%;
    padding: 4px 10px;
    background-color: #fff;
    cursor: pointer;

    &:not(:last-child) {
        border-bottom: solid 1px ${'secondary'};
    }

    &:hover {
        background-color: transparent;
    }
`

const ContextMenu = () => {
    const { contextMenu, isContextMenuOpened } = useSelector(getInterface)
    const dispatch = useDispatch()

    return isContextMenuOpened ? (
        <Container onMouseLeave={() => dispatch(closeContextMenu())} style={{ top: contextMenu.coords?.y, left: contextMenu.coords?.x }}>
            <Title>{contextMenu.title}</Title>
            <div style={{ width: '100%' }}>
                {contextMenu.options?.map((el) => (
                    <Option
                        key={el.title}
                        onClick={() => {
                            el.callback()
                            dispatch(closeContextMenu())
                        }}>
                        {el.title}
                    </Option>
                ))}
            </div>
        </Container>
    ) : (
        <></>
    )
}

export default ContextMenu
