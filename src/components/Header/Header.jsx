import Flex from '@components/Flex/Flex'
import { useDispatch, useSelector } from 'react-redux'
import getAuth from '../../features/auth/getAuth'
import getInterface from '../../features/interface/getInterface'
import styled from '../../theme/styled'
import { openContextMenu, setHoverData } from '@features/interface/interfaceReducer'
import { logout } from '../../features/auth/authReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectGraphKey, setLanguage } from '../../features/interface/interfaceReducer'
import getGraph from '../../features/graph/getGraph'
import useTranslations from '../../utils/useTranslations'

const Image = styled('img')`
    
`

const Header = () => {
    const {data} = useSelector(getAuth)
    const {graphKey} = useSelector(getInterface)
    const {title} = useSelector(getGraph)
    const dispatch = useDispatch()
    const {t} = useTranslations()

    const onProfileClick = () => {
        dispatch(openContextMenu({
            coords: {x: 20, y: 70},
            options: [
                {
                    callback: () => {
                        dispatch(logout())
                    },
                    title: 'logout'
                }
            ]
        }))
    }

    const onBackToDashboard = () => {
        dispatch(selectGraphKey(''))
    }

    return (
        <Flex
            $width="100vw"
            $background="background"
            $borderBottomWidth='1px'
            $borderStyle="solid"
            $borderColor="gray"
            $padding='10px 20px'
            $boxSizing="border-box"
            $alignItems="center"
            $justifyContent="space-between"
            >

            {
                graphKey ?
                    <Flex $justifyContent='space-between' $width="100%" $alignItems="center">
                        <Flex $width={400}>
                            <Flex  $borderRadius={8} $padding={4} $background="white" onClick={onBackToDashboard} $cursor="pointer" $fontSize={20} $fontWeight="bold" $fontFamily="Areal" $alignItems="center" $marginRight={10}>
                                <FontAwesomeIcon style={{width: 18, height: 18}} icon="fa-solid fa-chevron-left" />
                                back to dashboard
                            </Flex>
                        </Flex>

                        <Flex $fontSize={20}>
                            {title}
                        </Flex>

                        <Flex onClick={onProfileClick} $alignItems='center' $justifyContent="flex-end" $width={400}>
                            <Flex $fontSize={20}>
                                {data.displayName}
                            </Flex>
                            <Image
                                $width={50}
                                $height={50}
                                $borderWidth='1px'
                                $borderStyle="solid"
                                $borderColor="gray"
                                $borderRadius="50%"
                                src={data.photoURL}
                                $marginLeft={10}
                            />
                        </Flex>
                    </Flex>
                :
                    <>
                        <Flex onClick={(event) => {
                            dispatch(openContextMenu({
                                coords: {x: event.clientX, y: event.clientY},
                                title: t('Language'),
                                options: [
                                    {
                                        title: "English",
                                        callback: () => dispatch(setLanguage('en'))
                                    },
                                    {
                                        title: "Українська",
                                        callback: () => dispatch(setLanguage('ua'))
                                    },
                                ]
                            }))
                        }}>
                            <FontAwesomeIcon style={{width: 40, height: 40}} icon="fa-solid fa-language" />
                        </Flex>
                        <Flex onClick={onProfileClick} $justifyContent="flex-end" $alignItems='center' $width={400}>
                            <Flex $fontSize={20}>
                                {data.displayName}
                            </Flex>
                            <Image
                                $width={50}
                                $height={50}
                                $borderWidth='1px'
                                $borderStyle="solid"
                                $borderColor="gray"
                                $borderRadius="50%"
                                src={data.photoURL}
                                $marginLeft={10}
                            />
                        </Flex>
                    </>
            }
        </Flex>
    )
}

export default Header
