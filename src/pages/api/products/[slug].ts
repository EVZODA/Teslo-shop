import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "../../../../interfaces";
import { Product } from "../../../../models";
import { db } from "../../../../database";

type Data = 
    | { message: string }
    | IProduct

    
    

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':
            return getEntries( req, res );

        
        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}


const getEntries = async( req: NextApiRequest, res: NextApiResponse<Data>  ) => {

    await db.connect();
    const {slug} = req.query
    const product = await Product.findOne({slug}).lean();
    await db.disconnect();

    if (!product) {
        return res.status(400).json({
           message: "No hay producto con eso slug"
        })
    }

    return res.status(200).json(product)
}