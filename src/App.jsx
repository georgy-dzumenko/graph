import { useState } from 'react'
import './App.css'

import styled from '@theme/styled'

import ContextMenu from '@components/ContextMenu/ContextMenu'
import CanvasSelector from '@components/CanvasSelector/CanvasSelector'
import Modal from '@components/Modal/Modal'

import fontawesome from '@fortawesome/fontawesome'
import { faChevronDown, faPlus, faChevronLeft, faLanguage } from '@fortawesome/fontawesome-free-solid'
import { useSelector } from 'react-redux'
import getAuth from './features/auth/getAuth'
import getInterface from '@features/interface/getInterface'
import Auth from './components/Auth/Auth'
import Header from './components/Header/Header'
import Canvas from './components/Canvas/Canvas'
import ActionPanel from './components/ActionPanel/ActionPanel'


const Container = styled('div')`
    display: flex;
    width: 100vw;
`

fontawesome.library.add(faChevronDown, faPlus, faChevronLeft, faLanguage);

function App() {
    const {data} = useSelector(getAuth)
    const {graphKey} = useSelector(getInterface)

    return (
        <>
            <ContextMenu />
            <Modal />
            {data.uid ?
                <>
                    <Header>

                    </Header>
                    <Container>
                        {graphKey ?
                                <>
                                    <Canvas />
                                    <ActionPanel />
                                </>
                            :
                                <CanvasSelector/>
                        }
                    </Container>
                </>
                : (
                    <Auth/>
                )
            }
        </>
    )
}

export default App
