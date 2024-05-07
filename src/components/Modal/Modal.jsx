import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'

import { closeModal } from '@features/interface/interfaceReducer'
import getInterface from '@features/interface/getInterface'

import styled from '@theme/styled'
import Button from '../Button/Button'
import Flex from '@components/Flex/Flex'
import SectionTitle from '../SectionTitle/SectionTitle'

const Container = styled(Flex)`
    font-family: Arial, Helvetica, sans-serif;
    position: fixed;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10000;
    background-color: ${'background'};
    border: solid 2px ${'gray'};
    width: 400px;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${'white'};
    left: calc(50% - 200px);
    top: calc(50% - 200px);
    `

const Content = styled(Flex)`
    padding: 15px;
    flex: 1;
`

const Backdrop = styled('div')`
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 100;
    transition: 0.2s ease;
`

const Title = styled(SectionTitle)`
    width: 100%;
    padding: 8px 0;
    text-align: center;
    border-bottom: solid 1px ${'gray'};
`

const Option = styled(Button)`
    width: max-content;
    height: max-content;

    &:not(:last-child) {
        border-bottom: solid 1px ${'secondary'};
    }
`

const Modal = () => {
    const { modal, isModalOpened } = useSelector(getInterface)
    const dispatch = useDispatch()
    const ref = useRef()

    const [isFilterActive, setFilterActive] = useState(isModalOpened)

    useImperativeHandle(ref, () => ({
        removeFilter: () => {
            setFilterActive(false)
        }
    }))

    useEffect(() => {
        setFilterActive(isModalOpened)
    }, [isModalOpened])

    return (
        <Backdrop
            style={{
                backdropFilter: isFilterActive ? 'blur(10px) grayscale(0.5)' : 'blur(0) grayscale(0)', 
                backgroundColor: isFilterActive ? 'rgba(0,0,0,0.2)' : 'transparent',
                opacity: +isModalOpened,
                pointerEvents: isModalOpened ? 'auto' : 'none'
            }}
            onClick={() => dispatch(closeModal())}
        >
            <Draggable >
                <Container onClick={(e) => e.stopPropagation()}>
                    <Title>{modal.title}</Title>
                    <Content>
                        {modal.element ? modal.element({modalRef: ref}) : ''}
                    </Content>
                </Container>
            </Draggable>
        </Backdrop>
    )
}

export default Modal
