import { useSelector } from "react-redux"
import getAuth from "../features/auth/getAuth"
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import db from '../app/firebaseApp'

const useDatabaseActions = () => {
    const {data} = useSelector(getAuth)

    return {
        setData: async (field, dataToSet) => {
            await setDoc(doc(db, `${data.uid}`, field), dataToSet)
        },
        appendData: async (field, dataToSet) => {
            const result = await getDoc(doc(db, `${data.uid}`, field))

            await setDoc(doc(db, `${data.uid}`, field), {...(result.data() || {}), ...dataToSet})
        },
        getData: async (field) => {
            const result = await getDoc(doc(db, `${data.uid}`, field))
            return result.data()
        }
    }
}

export default useDatabaseActions