"use client";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, {
  useEffect,
  useState,
  useTransition,
  ChangeEventHandler,
} from "react";
import { ArrowLeftCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import categories from "@/app/utils/categories";
import ImageSelector from "@components/ImageSelector";
import { NewProductInfo } from "../types";
import Link from "next/link";

interface Props {
  initialValue?: InitialValue;
  onSubmit(values: NewProductInfo): void;
  onImageRemove?(source: string): void;
}

export interface InitialValue {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  bulletPoints: string[];
  mrp: number;
  salePrice: number;
  category: string;
  quantity: number;
}

const defaultValue = {
  title: "",
  description: "",
  bulletPoints: [""],
  mrp: 0,
  salePrice: 0,
  category: "",
  quantity: 0,
};

export default function ProductForm(props: Props) {
  const { onSubmit, onImageRemove, initialValue } = props;
  const [isPending, startTransition] = useTransition();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [productInfo, setProductInfo] = useState({ ...defaultValue });
  const [thumbnailSource, setThumbnailSource] = useState<string[]>();
  const [productImagesSource, setProductImagesSource] = useState<string[]>();

  const fields = productInfo.bulletPoints;

  const addMoreBulletPoints = () => {
    setProductInfo({
      ...productInfo,
      bulletPoints: [...productInfo.bulletPoints, ""],
    });
  };

  const removeBulletPoint = (indexToRemove: number) => {
    const points = [...productInfo.bulletPoints];
    const filteredPoints = points.filter((_, index) => index !== indexToRemove);
    setProductInfo({
      ...productInfo,
      bulletPoints: [...filteredPoints],
    });
  };

  const updateBulletPointValue = (value: string, index: number) => {
    const oldValues = [...fields];
    oldValues[index] = value;

    setProductInfo({ ...productInfo, bulletPoints: [...oldValues] });
  };

  const removeImage = async (index: number) => {
    if(!productImagesSource) return

    const imageToRemove = productImagesSource[index];
    const cloudSourceUrl = "http://res.cloudinary.com"

    // if image is from cloudinary, remove it from cloudinary
    if(imageToRemove.startsWith(cloudSourceUrl)){
      onImageRemove && onImageRemove(imageToRemove)
    }else {

      // if image is from local, remove it from local
      const fileIndexDifference = productImagesSource.length - imageFiles.length;
      const indexToRemove = index - fileIndexDifference;
      const newImageFiles = imageFiles.filter((_,i) => {
        if (i !== indexToRemove) return true;
      })
      setImageFiles([...newImageFiles])
    }

    // update UI
    const newImageSource = productImagesSource.filter((_,i) => {
      if (i !== index) return true;
    })
    setProductImagesSource([...newImageSource])
  };

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Đang cập nhật" : "Cập nhật";
    return isPending ? "Đang thêm mới" : "Thêm mới";
  };

  useEffect(() => {
    if (initialValue) {
      setProductInfo({ ...initialValue });
      setThumbnailSource([initialValue.thumbnail]);
      setProductImagesSource(initialValue.images);
      setIsForUpdate(true);
    }
  }, []);

  const onImagesChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const files = target.files;
    if (files) {
      const newImages = Array.from(files).map((item) => item);
      const oldImages = productImagesSource || [];
      setImageFiles([...imageFiles, ...newImages]);
      setProductImagesSource([
        ...oldImages,
        ...newImages.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const files = target.files;
    if (files) {
      const file = files[0];
      setThumbnail(file);
      setThumbnailSource([URL.createObjectURL(file)]);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* <h1 className="mb-2 text-xl font-bold">Add new product</h1> */}
      <div className="flex items-center mb-4">
          <Link href="/products" >
          <ArrowLeftCircleIcon className="h-6 w-6 mr-2 cursor-pointer" />
          </Link>
        <h1 className="text-xl font-bold">Thêm mới</h1>
      </div>
      <form
        action={() =>
          startTransition(async () => {
            await onSubmit({ ...productInfo, images: imageFiles, thumbnail });
          })
        }
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3>Poster</h3>
          <ImageSelector
            id="thumb"
            images={thumbnailSource}
            onChange={onThumbnailChange}
          />

          <h3>Images</h3>
          <ImageSelector
            multiple
            id="images"
            images={productImagesSource}
            onRemove={removeImage}
            onChange={onImagesChange}
          />
        </div>

        <Input
          label="Tên sản phẩm"
          value={productInfo.title}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, title: target.value })
          }
          crossOrigin={undefined}
        />

        <Textarea
          className="h-52 "
          label="Mô tả"
          value={productInfo.description}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, description: target.value })
          }
        />

        <Select
          onChange={(category) => {
            if (category) setProductInfo({ ...productInfo, category });
          }}
          value={productInfo.category}
          label="Chọn danh mục"
        >
          {categories.map((c) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>

        <div className="flex space-x-4">
          <div className="space-y-4 flex-1">
            <h3>Price</h3>

            <Input
              value={productInfo.mrp}
              label="Giá đề xuất"
              onChange={({ target }) => {
                const mrp = +target.value;
                setProductInfo({ ...productInfo, mrp });
              }}
              className="mb-4"
              crossOrigin={undefined}
            />
            <Input
              value={productInfo.salePrice}
              label="Giá bán"
              onChange={({ target }) => {
                const salePrice = +target.value;
                setProductInfo({ ...productInfo, salePrice });
              }}
              className="mb-4"
              crossOrigin={undefined}
            />
          </div>

          <div className="space-y-4 flex-1">
            <h3>Stock</h3>

            <Input
              value={productInfo.quantity}
              label="Số lượng"
              onChange={({ target }) => {
                const quantity = +target.value;
                if (!isNaN(quantity))
                  setProductInfo({ ...productInfo, quantity });
              }}
              className="mb-4"
              crossOrigin={undefined}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3>Điểm nổi bật</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center">
              <Input
                type="text"
                value={field}
                label={`Điểm nổi bật ${index + 1}`}
                onChange={({ target }) =>
                  updateBulletPointValue(target.value, index)
                }
                className="mb-4"
                crossOrigin={undefined}
              />
              {fields.length > 1 ? (
                <button
                  onClick={() => removeBulletPoint(index)}
                  type="button"
                  className="ml-2"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              ) : null}
            </div>
          ))}

          <button
            disabled={isPending}
            type="button"
            onClick={addMoreBulletPoints}
            className="flex items-center space-x-1 text-gray-800 ml-auto"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Thêm</span>
          </button>
        </div>

        <Button disabled={isPending} type="submit" className="bg-blue-500">
          {getBtnTitle()}
        </Button>
      </form>
    </div>
  );
}
