import  {TOKEN_SECRET1}  from '../config.js'
import jwt from 'jsonwebtoken'
export function createAccessToken (payload){
  return new Promise((resolve, reject) => {

    jwt.sign( 
      payload,
    TOKEN_SECRET1,
    {expiresIn: "1d"},
    (err, token) => {
      if (err) reject(err)
      resolve(token)
    } );   
  })

}