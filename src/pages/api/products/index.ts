import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../../interfaces/products';
import { SHOP_CONST, db } from '../../../../database';
import { Product } from '../../../../models';

type Data = 
 | { message: string} 
 | IProduct[]


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
    
        default:
            return res.status(400).json({
                message:'Bad request',
            })
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {gender = 'all'} = req.query
    let condition = {}

    if (gender!=='all' && SHOP_CONST.valid_genders.includes(`${gender}`)){
        condition = {gender}
    }

    await db.connect()
    const products = await Product.find(condition).select('title prices images inStock slug -_id').lean()
    await db.disconnect()
    return res.status(200).json(products)
}
