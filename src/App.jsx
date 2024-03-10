import { useState } from 'react'
import './App.css'
import ActionPanel from '@components/ActionPanel/ActionPanel'
import Canvas from '@components/Canvas/Canvas'
import styled from '@theme/styled'

const Container = styled('div')`
    display: flex;
    width: 100vw;
`

function App() {
    return (
        <Container>
            <Canvas />
            <ActionPanel />
        </Container>
    )
}

export default App
