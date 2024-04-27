import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from '@theme/styled'
import { closeModal } from '../../features/graph/interfaceReducer'

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
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
    const { modal, isModalOpened } = useSelector((state) => state.interface)
    const dispatch = useDispatch()

    return isModalOpened ? (
        <Container style={{ display: isModalOpened ? 'flex' : 'none' }}>
            <div>
                <Title>{modal.title}</Title>
                {modal.element}
            </div>
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <Option
                    key={'close'}
                    onClick={() => {
                        dispatch(closeModal())
                    }}>
                    close
                </Option>
                {modal.options.map((el) => (
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
    ) : (
        <></>
    )
}

export default Modal
