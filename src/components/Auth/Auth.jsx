import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from "react-redux";

import Flex from '@components/Flex/Flex'
import { setAuth } from '../../features/auth/authReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoogleSvg from '../../assets/google.svg'
import Logo from '../../assets/logo.png'
import useTranslations from '../../utils/useTranslations';

async function loginWithGoogle(dispatch) {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);
        dispatch(setAuth(user))

        return { uid: user.uid, displayName: user.displayName };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return null;
    }
}


const Auth = () => {
    const dispatch = useDispatch()
    const {t} = useTranslations()

    const onGoogleClick = () => {
        loginWithGoogle(dispatch)
    }

    return (
        <Flex $width='100vw' $height='100vh' $background={'background'} $flexDirection='column' $alignItems='center' $justifyContent='center'>
            <img src={Logo} style={{width: 300, height: 300}}></img>
            <Flex $fontSize={20} $marginBottom={30}>
                {t('Greetings')}
            </Flex>
            <Flex $background={'white'} $borderRadius={10} $borderStyle='solid' $borderWidth={1} $borderColor={'gray'} $padding='8px 16px' $cursor="pointer" $fontSize={25} onClick={onGoogleClick}>
                <img style={{width: 30, height: 30, marginRight: 10}} src={GoogleSvg} />
                {t('SignInWithGoogle')}
            </Flex>
        </Flex>
    )
}

export default Auth