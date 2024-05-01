import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styled from "@theme/styled"

import getInterface from "@features/interface/getInterface"
import { setDemonstrateList } from "@features/interface/interfaceReducer"

const StyledDemonstrator = styled('div')`
    position: absolute;
    width: 35px;
    height: 35px;
    transition: 0.5s ease;
    z-index: 50;
    border-radius: 50%;
    box-shadow: inset 0 0 3px 2px red;
    transform: translate(-50%, -50%);
`

const Demonstrator = forwardRef((props, ref) => {
    const [position, setPosition] = useState({})
    const {demonstrateList} = useSelector(getInterface)
    const dispatch = useDispatch()

    useEffect(() => {
        demonstrateList.map((el, index) => {
            setTimeout(() => {
                setPosition({
                    top: el.coords.y,
                    left: el.coords.x
                })

                if(index === demonstrateList.length - 1) {
                    setTimeout(() => {
                        dispatch(setDemonstrateList([]))
                        setPosition({
                            top: '100%',
                            left: '50%',
                        })
                    }, 500)
                }
            }, index * 700)
        })
    }, [demonstrateList])

    return (demonstrateList?.length ? <StyledDemonstrator style={position}/> : <></>)
})

export default Demonstrator