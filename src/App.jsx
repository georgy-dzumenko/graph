import { useState } from 'react'
import './App.css'

import styled from '@theme/styled'

import ContextMenu from '@components/ContextMenu/ContextMenu'
import Modal from '@components/Modal/Modal'
import ActionPanel from '@components/ActionPanel/ActionPanel'
import Canvas from '@components/Canvas/Canvas'
import fontawesome from '@fortawesome/fontawesome'
import { faChevronDown } from '@fortawesome/fontawesome-free-solid'


const Container = styled('div')`
    display: flex;
    width: 100vw;
`

fontawesome.library.add(faChevronDown);

function App() {
    return (
        <Container>
            <ContextMenu />
            <Modal />
            <Canvas />
            <ActionPanel />
        </Container>
    )
}

export default App
