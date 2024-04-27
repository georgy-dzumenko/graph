import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeEdgeCost } from '../../features/graph/graphReducer'
import MatrixCell from '../MatrixCell/MatrixCell'
import styled from '../../theme/styled'

const Td = styled('td')`
    padding: 2px;
`

const Matrix = () => {
    const { adjMatrix, vertexes } = useSelector((state) => state.graph)
    const dispatch = useDispatch()

    return (
        <table style={{ boxSizing: 'border-box', width: '100%' }}>
            <tr>
                <td></td>
                {vertexes.map((el, index) => (
                    <Td>{index}</Td>
                ))}
            </tr>
            {vertexes.map((row, index) => (
                <tr>
                    <Td>{index}</Td>
                    {vertexes.map((el) => (
                        <td key={el.vertexKey}>
                            <MatrixCell key={el.vertexKey} edgeKey={`${row.vertexKey}=>${el.vertexKey}`} />
                        </td>
                    ))}
                </tr>
            ))}
        </table>
    )
}

export default Matrix
