import ProductView from '@/app/components/ProductView';
import startDb from '@/app/lib/db';
import ProductModel from '@/app/models/productModel';
import { auth } from '@/auth';
import { isValidObjectId } from 'mongoose';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
    params: {
        product: string[]
    }
}

const fetchProduct = async (productId: string) => {
    if (!isValidObjectId(productId)) return redirect("/404");

    await startDb();
    const product = await ProductModel.findById(productId);
    if (!product) return redirect("/404");

    // let isWishlist = false;

    // const session = await auth();
    // if (session?.user) {
    //     await updateOrCreateHistory(session.user.id, product._id.toString());
    //     const wishlist = await WishlistModel.findOne({
    //         user: session.user.id,
    //         products: product._id,
    //     });
    //     isWishlist = wishlist ? true : false;
    // }

    return JSON.stringify({
        id: product._id.toString(),
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail.url,
        images: product.images?.map(({ url }) => url),
        bulletPoints: product.bulletPoints,
        price: product.price,
        sale: product.sale,
    });
}

export default async function Product({ params }: Props) {
    const { product } = params
    const productId = product[1]
    const productInfo = JSON.parse(await fetchProduct(productId))
    let productImages = [productInfo.thumbnail];
    if (productInfo.images) {
        productImages = productImages.concat(productInfo.images);
    }

    return (
        <div className='p-4'>
            <ProductView 
                title={productInfo.title}
                description={productInfo.description}
                price={productInfo.price}
                sale={productInfo.sale}
                points={productInfo.bulletPoints}
                images={productImages}
            />
        </div>
    )
}
