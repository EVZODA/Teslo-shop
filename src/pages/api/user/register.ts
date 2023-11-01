import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { User } from '../../../../models';
import { jwt, validations } from '../../../../utils';
import bcryptjs from 'bcryptjs';

type Data =
    | { message: string }
    | {
        token: string;
        user: {
            email: string;
            name: string;
            role: string;
        }
    }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'POST':
            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'No existe el endpoint'
            })
    }

}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {name="" , email = "", password = "" } = req.body as {email: string, password: string, name: string}
    await db.connect()
    const user = await User.findOne({ email })
    


    if (password.length<6){
        return res.status(400).json({message: 'La contraseña debe tener 6 o mas caracteres'})
    }

    if (name.length<2){
        return res.status(400).json({message: 'El nombre debe tener 2 o mas caracteres'})
    }


    if(!validations.isValidEmail(email)){
        return res.status(400).json({
            message:'Correo no valido'
        })
    }

    

    if (email===user?.email){
        return res.status(400).json({message: 'Ya hay un correo registrado con ese nombre'})
    }

    const newUser = new User({
        email:email.toLocaleLowerCase(),
        password:bcryptjs.hashSync(password),
        role:'client',
        name
    })

    try {
        await newUser.save()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:'Revisar logs del servidor'
        })
    }

    


    const {role, _id} = newUser ; 

    const token = jwt.signToken(_id,email)

    return res.status(200).json({
        token,
        user:{
            email,
            role,
            name,
        }
    })
}
