import { useSelector } from "react-redux"
import { useTheme } from "styled-components"

import getInterface from "@features/interface/getInterface"

import parseEdgeKey from "@utils/parseEdgeKey"

import styled from "@theme/styled"

const Td = styled('td')`
    padding: 2px;
    position: relative;
`

const LinearGradient = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const MatrixTh = ({horizontal, vertexKey, index}) => {
    const theme = useTheme()
    const activeGradient = horizontal ? `linear-gradient(transparent, ${theme.colors.secondary})` : `linear-gradient(90deg, transparent, ${theme.colors.secondary})`
    const {hoverData} = useSelector(getInterface)

    const isActive = !horizontal ? parseEdgeKey(hoverData || '')[0] === vertexKey : parseEdgeKey(hoverData || '')[1] === vertexKey

    return <Td>
        <LinearGradient style={{transition: '0.2s ease', opacity: +isActive, background: activeGradient }}>
        </LinearGradient>
        {index}
    </Td>
}

export default MatrixTh
