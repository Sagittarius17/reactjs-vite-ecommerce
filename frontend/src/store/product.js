import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all fields." };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        // Check if the response is OK
        if (!res.ok) {
            return { success: false, message: `Error: ${res.statusText}` };
        }

        // Parse JSON only if there's a body
        let data = null;
        if (res.headers.get("content-length") !== "0" && res.bodyUsed === false) {
            data = await res.json();
        } else {
            data = {};
        }

        // Update state with the new product
        set((state) => ({ products: [...state.products, data] }));
        return { success: true, message: "Product created sucessfully." };
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.filter((product) => product.id !== pid),
        }));
        return { success: true, message: data.message };
    },
}));
