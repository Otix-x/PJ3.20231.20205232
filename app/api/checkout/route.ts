import { getCartItems } from '@/app/lib/cartHelper';
import { auth } from '@/auth';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({
                error: "Unauthorized request!",
            }, {
                status: 401,
            })
        
        }

        const data = await req.json();
        const cartId = data.cartId as string;

        if(!isValidObjectId(cartId)){
            return NextResponse.json({
                error: "Invalid cart id!",
            }, {
                status: 401,
            })
        }

        // fetching cart details
        const cartItems = await getCartItems(session.user.id, cartId);
        if(!cartItems){
            return NextResponse.json({
                error: "Cart not found!",
            },{
                status: 404,
            })
        }

        // creating stripe checkout session
        
        
    } catch (error) {
        
    }
}