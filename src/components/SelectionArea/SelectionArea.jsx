import React from 'react'

import styled from '@theme/styled'

const StyledRect = styled('div')`
    position: absolute;
    border: dashed 1px black;
`

const SelectionArea = ({ startPoint, endPoint, canvas }) => {
    return (
        <StyledRect
            $left={startPoint?.x < endPoint?.x ? startPoint?.x : endPoint?.x}
            $top={startPoint?.y < endPoint?.y ? startPoint?.y : endPoint?.y}
            $right={canvas?.clientWidth - (startPoint?.x > endPoint?.x ? startPoint?.x : endPoint?.x)}
            $bottom={canvas?.clientHeight - (startPoint?.y > endPoint?.y ? startPoint?.y : endPoint?.y)}
        />
    )
}

export default SelectionArea
