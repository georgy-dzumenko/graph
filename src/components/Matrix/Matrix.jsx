import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import createEdgeKey from '@utils/createEdgeKey'

import MatrixCell from '@components/MatrixCell/MatrixCell'
import MatrixTh from '@components/MatrixTh/MatrixTh'

import getGraph from '@features/graph/getGraph'

const Matrix = () => {
    const { adjMatrix, vertexes } = useSelector(getGraph)
    const dispatch = useDispatch()

    return (
        <table style={{ boxSizing: 'border-box', width: '100%' }}>
            <tr>
                <td></td>
                {vertexes.map((el, index) => (
                    <MatrixTh horizontal index={index} vertexKey={el.vertexKey}/>
                ))}
            </tr>
            {vertexes.map((row, index) => (
                <tr>
                    <MatrixTh vertexKey={row.vertexKey} index={index}/>
                    {vertexes.map((el) => (
                        <td key={el.vertexKey}>
                            <MatrixCell key={el.vertexKey} edgeKey={createEdgeKey(row.vertexKey, el.vertexKey)} />
                        </td>
                    ))}
                </tr>
            ))}
        </table>
    )
}

export default Matrix
