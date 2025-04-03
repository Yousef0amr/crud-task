import { Product } from "@/app/dashboard/products/products-columns";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // ✅ Import persist & PersistOptions

interface ProductStore {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    getProduct: (id: string) => Product | undefined;
    updateProduct: (id: string, product: Product) => void;
}

export const useProductStore = create<ProductStore, [["zustand/persist", ProductStore]]>(
    persist<ProductStore>(
        (set, get) => ({
            products: [],

            addProduct: (product: Product) =>
                set((state) => ({
                    products: [...state.products, product],
                })),

            removeProduct: (id: string) =>
                set((state) => ({
                    products: state.products.filter((product) => product.id !== id),
                })),

            getProduct: (id: string) => {
                return get().products.find((product) => product.id === id);
            },

            updateProduct: (id: string, product: Product) =>
                set((state) => ({
                    products: state.products.map((p) =>
                        p.id === id ? { ...p, ...product } : p
                    ),
                })),
        }),
        {
            name: "product-storage",
        }
    )
);
