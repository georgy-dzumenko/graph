import React from "react"
import styled from '@theme/styled'

const SectionTitle = styled('div')`
    font-size: 18px;
    color: ${'grayText'};
    padding-left: 6px;
    padding-bottom: 12px;
    /* font-weight: bold; */
`

export default React.memo(SectionTitle)