import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import useDijkstra from '@utils/dijkstra'
import useFloydWarshall from '@utils/floyd'

import { openModal, setDemonstrateList } from '@features/interface/interfaceReducer'

import styled from '@theme/styled'

import Matrix from '@components/Matrix/Matrix'
import VertexSelector from '@components/VertexSelector/VertexSelector'
import Flex from '@components/Flex/Flex'
import Button from '../Button/Button'
import SectionTitle from '../SectionTitle/SectionTitle'
import useTranslations from '../../utils/useTranslations'


const ActionPanelStyledContainer = styled('div')`
    height: 100vh;
    width: 340px;
    border-left: 1px solid ${'primary'};
    padding: 16px;
    box-sizing: border-box;
    background-color: ${'background'};
    font-family: Arial, Helvetica, sans-serif;
`



const ActionBlock = styled(Flex)`
    width: 100%;
    border-radius: 12px;
    /* border: 1px solid ${'primary'}; */
    /* background-color: ${'white'}; */
    justify-content: center;
    gap: 12px;
    /* padding: 12px 8px; */
    flex-direction: column;
    box-sizing: border-box;
`

const Separator = styled(Flex)`
    width: 100%;
    height: 1px;
    margin: 20px 0;
    background-color: ${'gray'};
`

const Step = styled(Flex)`
    border: solid 1px ${'gray'};
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    margin-bottom: 10px;
    justify-content: space-between;
`

const Vertex = styled(Flex)`
    background-color: ${'accent'};
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    padding: 4px;
    width: 16px;
    height: 16px;
`

const ActionPanel = () => {
    const dispatch = useDispatch()
    const floydFrom = useRef()
    const floydTo = useRef()
    const dijkstraFrom = useRef()
    const dijkstraTo = useRef()
    const {t} = useTranslations()

    const dijkstra = useDijkstra()
    const floydWarshall = useFloydWarshall()

    useEffect(() => {}, [])

    return (
        <ActionPanelStyledContainer>
            <Matrix />

            <Separator />

            <SectionTitle>{t('Dijkstra')}</SectionTitle>
            <ActionBlock>
                <Flex style={{ width: '100%', justifyContent: 'center', gap: '20px' }}>
                    <VertexSelector ref={dijkstraFrom} />
                    <VertexSelector ref={dijkstraTo} />
                </Flex>
                <Button
                    onClick={() => {
                        const steps = dijkstra(dijkstraFrom.current.value.vertexKey, dijkstraTo.current.value.vertexKey)

                        dispatch(
                            openModal({
                                title: 'Result',
                                element: ({modalRef}) => {

                                    console.log(steps)

                                    const show = async () => {
                                        modalRef.current.removeFilter()
                                        dispatch(setDemonstrateList(steps))
                                    }

                                    return (
                                        <Flex style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
                                            <Flex $flexDirection='column'>
                                                {steps?.map((el, index) => {
                                                    return (
                                                        <Step>
                                                            <Flex style={{justifyContent: 'center', alignItems: 'center'}}>
                                                                step {index}:
                                                            </Flex>
                                                            <Flex style={{ width: 'max-content', justifyContent: 'center', alignItems: 'center'}}>
                                                                <Vertex>
                                                                    {el.index}
                                                                </Vertex>
                                                                ("{el.name}")
                                                            </Flex>
                                                        </Step>
                                                    )
                                                })}
                                            </Flex>
                                            <Button onClick={show}>show</Button>
                                        </Flex>
                                    )
                                },
                                options: []
                            })
                        )
                    }}>
                    {t('Calculate')}
                </Button>
            </ActionBlock>

            <Separator />

            <SectionTitle>{t('FloydWarshall')}</SectionTitle>
            <ActionBlock>
                <Flex style={{ width: '100%', justifyContent: 'center', gap: '20px' }}>
                    <VertexSelector ref={floydFrom} />
                    <VertexSelector ref={floydTo} />
                </Flex>
                <Button
                    onClick={() => {
                        const steps = floydWarshall(floydFrom.current.value.vertexKey, floydTo.current.value.vertexKey)

                        console.log('steps', steps)
                    }}
                >{t('Calculate')}</Button>
            </ActionBlock>
        </ActionPanelStyledContainer>
    )
}

export default ActionPanel
