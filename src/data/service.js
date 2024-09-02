import Api from './api/Api'
import Provider from './provider/Provider'

const DEV = import.meta.env.VITE_DEV

export default DEV ? Provider : Api