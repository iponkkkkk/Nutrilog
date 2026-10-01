import type { UpdateIngredientInput } from "@nutrilog/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { api } from "@/utils/api"; // <-- Hapus atau comment baris ini karena kita tidak pakai backend lagi

// 1. Buat "Database Palsu" di memori browser
let mockIngredients = [
    { id: "ing-1", name: "Beras Putih", minimum: 10, stock: 50, unit_id: "u-1" },
    { id: "ing-2", name: "Daging Ayam", minimum: 5, stock: 2, unit_id: "u-2" },
    { id: "ing-3", name: "Sayur Bayam", minimum: 20, stock: 25, unit_id: "u-3" },
];

// Helper untuk simulasi loading jaringan (500 milidetik)
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const useGetIngredients = () => {
    return useQuery({
        queryKey: ["ingredients"],
        queryFn: async () => {
            await delay(); 
            // Sesuaikan return ini jika UI-mu membacanya sebagai { data: ... }
            return mockIngredients; 
        },
    });
};

export const useCreateIngredient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {
            name: string;
            minimum: number;
            stock: number;
            unit_id: string;
        }) => {
            await delay();
            const newIngredient = {
                id: `ing-${Date.now()}`, // Bikin ID acak
                ...data
            };
            mockIngredients.push(newIngredient); // Masukkan ke database palsu
            return newIngredient;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        },
    });
};

export const useUpdateIngredient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: UpdateIngredientInput;
        }) => {
            await delay();
            const index = mockIngredients.findIndex(item => item.id === id);
            if (index !== -1) {
                mockIngredients[index] = { ...mockIngredients[index], ...data };
            }
            return mockIngredients[index];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        },
    });
};

export const useDeleteIngredient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await delay();
            mockIngredients = mockIngredients.filter(item => item.id !== id);
            return { success: true };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        },
    });
};