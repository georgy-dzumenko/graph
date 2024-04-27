import React, { useEffect, useRef } from 'react'
import styled from '../../theme/styled'
import { useDispatch, useSelector } from 'react-redux'
import Matrix from '../Matrix/Matrix'
import useFloydWarshall from '../../utils/floyd'
import VertexSelector from '../VertexSelector/VertexSelector'
import Flex from '../Flex/Flex'
import useDijkstra from '../../utils/dijkstra'
import { openModal } from '../../features/graph/interfaceReducer'

const ActionPanelStyledContainer = styled('div')`
    height: 100vh;
    width: 300px;
    border-left: 1px solid ${'primary'};
    padding: 5px;
    box-sizing: border-box;
    background-color: ${'background'};
    font-family: Arial, Helvetica, sans-serif;
`

const Button = styled(Flex)`
    background-color: white;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 5px;
    border: 2px solid ${'primary'};
`

const ActionBlock = styled(Flex)`
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${'primary'};
    background-color: ${'secondary'};
    justify-content: center;
    gap: 5px;
    padding: 5px;
    flex-direction: column;
    box-sizing: border-box;
`

const Separator = styled(Flex)`
    width: 100%;
    height: 1px;
    margin: 10px 0;
    background-color: gray;
`

const ActionPanel = () => {
    const { adjMatrix } = useSelector((state) => state.graph)

    const dispatch = useDispatch()
    const floydFrom = useRef()
    const floydTo = useRef()
    const dijkstraFrom = useRef()
    const dijkstraTo = useRef()

    const dijkstra = useDijkstra()

    useEffect(() => {}, [])

    return (
        <ActionPanelStyledContainer>
            <Matrix />

            <Separator />

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
                                element: (
                                    <Flex style={{ flexDirection: 'column' }}>
                                        <Flex>STEPS:</Flex>
                                        {steps?.map((el, index) => {
                                            return (
                                                <Flex>
                                                    {index}): {el.index} ("{el.name}")
                                                </Flex>
                                            )
                                        })}
                                    </Flex>
                                ),
                                options: []
                            })
                        )
                    }}>
                    Find shortest way with dijkstra algorithm
                </Button>
            </ActionBlock>

            <Separator />

            <ActionBlock>
                <Flex style={{ width: '100%', justifyContent: 'center', gap: '20px' }}>
                    <VertexSelector ref={floydFrom} />
                    <VertexSelector ref={floydTo} />
                </Flex>
                <Button>Find shortest way</Button>
            </ActionBlock>
        </ActionPanelStyledContainer>
    )
}

export default ActionPanel
