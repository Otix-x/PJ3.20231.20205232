import ProductView from '@/app/components/ProductView';
import SimilarProductsList from '@/app/components/SimilarProductsList';
import startDb from '@/app/lib/db';
import { updateOrCreateHistory } from '@/app/models/historyModel';
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

    const session = await auth();
    if(session?.user) await updateOrCreateHistory(session.user.id, product._id.toString());

    return JSON.stringify({
        id: product._id.toString(),
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail.url,
        images: product.images?.map(({ url }) => url),
        bulletPoints: product.bulletPoints,
        price: product.price,
        sale: product.sale,
        outOfStock: product.quantity <= 0
    });
}

const fetchSimilarProducts = async () => {
    await startDb();
    const products = await ProductModel.find({}).sort().limit(10);
    products.map(({_id, thumbnail, title, price}) => {
        return {
            id: _id.toString(),
            thumbnail: thumbnail.url,
            title,
            price: price.discounted
        }
    })
}

export default async function Product({ params }: Props) {
    const { product } = params
    const productId = product[1]
    const productInfo = JSON.parse(await fetchProduct(productId))
    let productImages = [productInfo.thumbnail];
    if (productInfo.images) {
        productImages = productImages.concat(productInfo.images);
    }
    const similarProducts = await fetchSimilarProducts();

    return (
        <div className='p-4'>
            <ProductView 
                title={productInfo.title}
                description={productInfo.description}
                price={productInfo.price}
                sale={productInfo.sale}
                points={productInfo.bulletPoints}
                images={productImages}
                outOfStock={productInfo.outOfStock}
            />
        </div>
    )
}
