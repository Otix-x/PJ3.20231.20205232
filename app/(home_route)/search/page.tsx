import GridView from "@/app/components/GridView";
import ProductCard, { Product } from "@/app/components/ProductCard";
import SearchFilter from "@/app/components/SearchFilter";
import startDb from "@/app/lib/db";
import ProductModel, { ProductDocument } from "@/app/models/productModel";
import { FilterQuery } from "mongoose";
import React from "react";

type options = {
  query: string;
  priceSort?: "asc" | "desc";
};

interface Props {
  searchParams: options;
}

const searchProducts = async (options: options) => {
  const { query, priceSort } = options;
  await startDb();

  const filter: FilterQuery<ProductDocument> = {
    title: { $regex: query, $options: "i" },
  };

  const products = await ProductModel.find({
    ...filter,
  }).sort({ "price.discounted": priceSort === "asc" ? 1 : -1 });

  const productList = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
    };
  });

  return JSON.stringify(productList);
};

export default async function Search({ searchParams }: Props) {

  const results = JSON.parse(
    await searchProducts({
      ...searchParams,
    })
  ) as Product[];

  const noProducts = !results.length;

  return (
    <div>
      <SearchFilter>
        {noProducts ? (
          <h1 className="text-xl font-semibold text-blue-gray-500 text-center">
            Không tìm thấy sản phẩm nào
          </h1>
        ) : (
          <GridView>
            {results.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </GridView>
        )}
      </SearchFilter>
    </div>
  );
}
