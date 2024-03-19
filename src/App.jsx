import { useState } from 'react'
import './App.css'
import ActionPanel from '@components/ActionPanel/ActionPanel'
import Canvas from '@components/Canvas/Canvas'
import styled from '@theme/styled'
import ContextMenu from './components/ContextMenu/ContextMenu'

const Container = styled('div')`
    display: flex;
    width: 100vw;
`

function App() {
    return (
        <Container>
            <ContextMenu />
            <Canvas />
            <ActionPanel />
        </Container>
    )
}

export default App
