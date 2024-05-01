import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'

import { closeModal } from '@features/interface/interfaceReducer'
import getInterface from '@features/interface/getInterface'

import styled from '@theme/styled'

const Container = styled('div')`
    font-family: Arial, Helvetica, sans-serif;
    position: fixed;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10000;
    background-color: ${'background'};
    border: solid 1px ${'primary'};
    width: 400px;
    height: 300px;
    border-radius: 10px;
    padding: 15px;
    overflow: hidden;
    background-color: #ffffffeb;
    left: calc(50% - 200px);
    top: calc(50% - 200px);
    `

const Backdrop = styled('div')`
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    /* backdrop-filter: blur(10px); */
    z-index: 100;
    transition: 0.2s ease;
`

const Title = styled('div')`
    width: 100%;
    padding: 4px 10px;
    border-bottom: solid 1px ${'primary'};
`

const Option = styled('div')`
    width: max-content;
    height: max-content;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: ${'background'};
    border: solid 1px ${'primary'};

    &:not(:last-child) {
        border-bottom: solid 1px ${'secondary'};
    }

    &:hover {
        background-color: transparent;
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
                // backdropFilter: isFilterActive ? 'blur(10px) grayscale(0.5)' : 'blur(0) grayscale(0)', 
                backgroundColor: isFilterActive ? 'rgba(0,0,0,0.2)' : 'transparent',
                opacity: +isModalOpened,
                pointerEvents: isModalOpened ? 'auto' : 'none'
            }}
        >
            <Draggable>
                <Container style={{
                    backdropFilter: isFilterActive ? 'blur(0) grayscale(0)' : 'blur(10px) grayscale(0.5)', display: isModalOpened ? 'flex' : 'none'
                }}>
                        <div>
                            <Title>{modal.title}</Title>
                            {modal.element ? modal.element({modalRef: ref}) : ''}
                        </div>
                    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                        <Option
                            key='close'
                            onClick={() => {
                                dispatch(closeModal())
                            }}>
                            close
                        </Option>
                        {modal.options?.map((el) => (
                            <Option
                            key={el.title}
                            onClick={() => {
                                el.callback()
                                dispatch(closeModal())
                            }}>
                                {el.title}
                            </Option>
                        ))}
                    </div>
                </Container>
            </Draggable>
        </Backdrop>
    )
}

export default Modal
