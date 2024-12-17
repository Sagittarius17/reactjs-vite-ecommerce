import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

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
    
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                return { success: false, message: data.message || 'Failed to update product' };
            }

            // update the ui immediately, without needing a refresh
            set((state) => ({
                products: state.products.map((product) => (product._id === pid ? data.data : product)),
            }));

            return { success: true, message: "Product updated successfully." };
        } catch (error) {
            console.error("Update product error:", error);
            return { success: false, message: "An error occurred while updating the product." };
        }
    },

    deleteProduct: async (pid) => {
        console.log("Deleting product with ID:", pid); // Debugging
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
    
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
    
        // update the ui immediately, without needing a refresh
        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));
    
        return { success: true, message: data.message };
    }

}));
