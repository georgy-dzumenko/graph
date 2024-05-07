import styled from '@theme/styled'
import Flex from '@components/Flex/Flex'

const Button = styled(Flex)`
    background-color: ${'primary'};
    color: ${'white'};
    cursor: pointer;
    font-weight: bold;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 12px;
    /* border: 2px solid ${'primary'}; */
`

export default Button
