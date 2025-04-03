import { Product } from "@/app/dashboard/products/products-columns";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import api from "@/lib/axiosConfig";
import { useProductStore } from "@/store/product-store";
import { ProductFormValues } from "@/app/dashboard/products/product-form";

const fetchProducts = async (): Promise<Product[]> => {
    const res = await api.get("/products");
    if (res.data) {
        useProductStore.setState({ products: res.data });
    }
    return res.data;
};

export const useProducts = (): UseQueryResult<Product[], Error> => {
    return useQuery({ queryKey: ["products"], queryFn: fetchProducts, staleTime: 60 * 60 * 1000 });
};

export const useAddProduct = () => {

    const { addProduct } = useProductStore()
    return useMutation({
        mutationFn: async (newProduct: Partial<ProductFormValues>) => {
            const res = await api.post("/products", {
                ...newProduct,
                images: newProduct.images?.split(`,`),
            });
            return res.data;
        },
        onSuccess: (data) => {
            addProduct(
                data
            )

        },
    });
};


export const useUpdateProduct = () => {

    const { updateProduct } = useProductStore()

    return useMutation({
        mutationFn: async (updatedProduct: Partial<any>) => {
            const res = await api.put(`/products/${updatedProduct.id}`, {
                ...updatedProduct,
                images: updatedProduct.images?.split(`,`),
            });
            return res.data;
        },
        onSuccess: (data) => {
            updateProduct(data.id, data)

        },
    });
};


export const useDeleteProduct = () => {

    const { removeProduct } = useProductStore()
    return useMutation({
        mutationFn: async (productId: string) => {
            await api.delete(`/products/${productId}`);
        },
        onSuccess: (data, productId) => {

            removeProduct(productId)
        },
    });
};
