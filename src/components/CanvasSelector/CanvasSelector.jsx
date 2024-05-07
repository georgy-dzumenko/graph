import styled from '@theme/styled'

import Flex from '@components/Flex/Flex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import db from '../../app/firebaseApp'
import { useDispatch, useSelector } from 'react-redux'
import getAuth from '../../features/auth/getAuth'
import useDatabaseActions from '../../utils/useDatabaseActions'
import { closeModal, openModal, selectGraphKey } from '../../features/interface/interfaceReducer'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import Logo from '../../assets/logo.png'
import useTranslations from '../../utils/useTranslations'

const Container = styled(Flex)`
    flex: 1;
    flex-direction: row;
    gap: 40px;
    height: 100vh;
    position: relative;
    background: ${'background'};
    background-size: 30px 30px;
    background-repeat: repeat;
    padding: 20px;
`

const OptionContainer = styled(Flex)`
    width: 200px;
    height: 300px;
    border-radius: 16px;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    background-color: ${'white'};
    border: solid 1px ${'gray'};
`

const Image = styled('img')``

const CanvasOption = ({graphKey, title}) => {
    const dispatch = useDispatch()

    const {appendData, setData, getData} = useDatabaseActions()

    const {t} = useTranslations()

    const onClick = () => {
        dispatch(selectGraphKey(graphKey))
    }

    const [isDeleted, setIsDeleted] = useState(false)

    const onDeleteClick = async (event) => {
        event.stopPropagation()
        await appendData('graphs', {[graphKey]: null})
        setIsDeleted(true)
    }

    return (
        <OptionContainer $display={isDeleted ? 'none' : 'flex'} $cursor="pointer" onClick={onClick} >
            <Flex $flexDirection="column">
                <Image src={Logo} $width="100%" $height={200} $objectFit="contain" $borderBottomWidth={1} $borderBottomStyle="solid" $borderColor="gray"></Image>
                <Flex $padding={10} $fontSize={18}>
                    {title}
                </Flex>
            </Flex>
            <Flex onClick={onDeleteClick} $textTransform="uppercase" $width='100%' $height={30} $background={'background'} $boxSizing="border-box" $justifyContent="center" $alignItems="center" $padding={4}>{t('Delete')}</Flex>
        </OptionContainer>
    )
}

const NewGraphModalComponent = ({submitTitle}) => {
    const [value, setValue] = useState()

    const {t} = useTranslations()

    return (
        <Flex $flex={1} $flexDirection='column'>
            <input onChange={(event) => setValue(event.target.value)}></input>
            <Button onClick={() => submitTitle(value)}>{t('Submit')}</Button>
        </Flex>
    )
}

const AddCanvas = () => {
    // const collectionRef = collection(firestore)
    const {data} = useSelector(getAuth)
    const {appendData, setData, getData} = useDatabaseActions()
    const dispatch = useDispatch()
    const createNewGraph = async (title) => {
        const graphKey = Math.random().toString()
        await appendData('graphs', {[graphKey]: {title}})
        dispatch(selectGraphKey(graphKey))
        dispatch(closeModal())
    }

    const onClick = async () => {
        dispatch(openModal({
            title: 'Enter name of your new graph',
            element: ({modalRef}) => <NewGraphModalComponent submitTitle={createNewGraph}/>
        }))
    }

    return (
        <Flex $alignItems='center' $height={300}>
            <Flex
                $width={100}
                $height={100}
                $background="white"
                $borderColor="gray"
                $borderStyle="solid"
                $borderWidth={1}
                $borderRadius='50%'
                $display='flex'
                $justifyContent='center'
                $alignItems='center'
                onClick={onClick}
            >
                <FontAwesomeIcon style={{width: 40, height: 40}} icon="fa-solid fa-plus" />
            </Flex>
        </Flex>
    )
}

const CanvasSelector = () => {

    const {appendData, setData, getData} = useDatabaseActions()
    const dispatch = useDispatch()
    const [graphs, setGraphs] = useState([])

    useEffect(() => {
        (async () => {
            const result = await getData('graphs')
            setGraphs(Object.entries(result || {}))
        })()
    }, [])

    return (
        <Container>
            {graphs.map((el) => el[1] ? <CanvasOption graphKey={el[0]} {...el[1]}/> : <></>)}
            <AddCanvas/>
        </Container>
    )
}

export default CanvasSelector
