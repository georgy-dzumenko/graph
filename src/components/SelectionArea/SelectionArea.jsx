import React from 'react'

import styled from '@theme/styled'

const StyledRect = styled('div')`
    position: fixed;
    border: dashed 1px black;
`

const SelectionArea = ({ startPoint, endPoint, canvas }) => {
    return (
        <StyledRect
            $left={startPoint?.x < endPoint?.x ? startPoint?.x : endPoint?.x}
            $top={startPoint?.y < endPoint?.y ? startPoint?.y : endPoint?.y}
            $right={document.body?.clientWidth - (startPoint?.x > endPoint?.x ? startPoint?.x : endPoint?.x)}
            $bottom={document.body?.clientHeight - (startPoint?.y > endPoint?.y ? startPoint?.y : endPoint?.y)}
        />
    )
}

export default SelectionArea
