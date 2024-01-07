import * as Yup from "yup";
import categories from "./categories";

// Custom validator function for file size (1MB limit)
const fileValidator = (file: File) => {
    if (!file) return true; // Optional field, so it's valid if not provided
    return file.size <= 1024 * 1024;
};

const commonSchema = {
    title: Yup.string().required("Tên sản phẩm là bắt buộc"),
    description: Yup.string().required("Mô tả sản phẩm là bắt buộc"),
    bulletPoints: Yup.array().of(Yup.string()),
    mrp: Yup.number().required("Giá đề xuất là bắt buộc"),
    salePrice: Yup.number()
        .required("Giá bán là bắt buộc")
        .lessThan(Yup.ref("mrp"), "Giá bán phải nhỏ hơn giá đề xuất"),
    category: Yup.string()
        .required("Phân loại là bắt buộc")
        .oneOf(categories, "Phân loại không hợp lệ"),
    quantity: Yup.number().required("Số lượng là bắt buộc").integer(),
    images: Yup.array().of(
        Yup.mixed().test("fileSize", "Hình ảnh có kích thước bé hơn 1MB", (file) =>
            fileValidator(file as File)
        )
    ),
};

// Define the validation schema
export const newProductInfoSchema = Yup.object().shape({
    ...commonSchema,
    thumbnail: Yup.mixed()
        .required("Thumbnail là bắt buộc")
        .test("fileSize", "Thumbnail có kích thước bé hơn 1MB", (file) =>
            fileValidator(file as File)
        ),
});

export const updateProductInfoSchema = Yup.object().shape({
    ...commonSchema,
});
