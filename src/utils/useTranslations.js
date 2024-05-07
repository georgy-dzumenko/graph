import { useSelector } from "react-redux"
import getInterface from "../features/interface/getInterface"
import translations from '../assets/jsons/translations.json'

const useTranslations = () => {
    const {language} = useSelector(getInterface)
    return {t: (field) => translations[language][field]}
}

export default useTranslations
