import axios from './auth.js' 


export const registerrequestusuario = (usuario) => axios.post(`/registraruser`, usuario);
export const registerRequestamd  = (adm) => axios.post(`/registrarse`, adm);

export const loginRequestadm =(adm) => axios.post(`/logearse`, adm);

export const loginRequestuser= (usuario) => axios.post(`/logearuser`, usuario);

export const verityTokenRequet = () => axios.get('/verifyadm')

export const verityTokenRequet1= () => axios.get('/verifyuser')

