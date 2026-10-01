import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { api } from "@/utils/api"; // <-- Comment/hapus import api

// 1. Database Palsu untuk Resep
let mockRecipes = [
    {
        id: "rec-1",
        name: "Nasi Goreng Bergizi MBG",
        instruction: "1. Tumis bumbu halus hingga harum.\n2. Masukkan telur dan orak-arik.\n3. Masukkan nasi dan sayuran, aduk rata.\n4. Sajikan hangat.",
        ingredients: [
            { ingredient_id: "ing-1", quantity: "5" }, // Beras
            { ingredient_id: "ing-2", quantity: "2" }, // Telur/Daging
        ]
    },
    {
        id: "rec-2",
        name: "Sup Ayam Sayuran",
        instruction: "1. Didihkan air, masukkan ayam.\n2. Masukkan wortel dan kentang.\n3. Tambahkan bumbu sup, rebus hingga empuk.\n4. Masukkan daun seledri sebelum diangkat.",
        ingredients: [
            { ingredient_id: "ing-2", quantity: "3" }, // Ayam
            { ingredient_id: "ing-3", quantity: "1" }, // Sayuran
        ]
    }
];

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const useGetRecipes = () => {
    return useQuery({
        queryKey: ["recipes"],
        queryFn: async () => {
            await delay();
            // Langsung me-return array resep
            return mockRecipes; 
        },
    });
};

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {
            name: string;
            instruction: string;
            ingredients: Array<{ ingredient_id: string; quantity: string }>;
        }) => {
            // Simulasi proses agak lama (1 detik) seolah AI sedang berpikir/menyimpan
            await delay(1000); 
            const newRecipe = {
                id: `rec-${Date.now()}`,
                ...data
            };
            mockRecipes.push(newRecipe);
            return newRecipe;
        },
        onSuccess: () => {
            toast.success("Recipe created successfully!");
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
        },
    });
};

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await delay();
            mockRecipes = mockRecipes.filter(r => r.id !== id);
            return { success: true };
        },
        onSuccess: () => {
            toast.success("Recipe deleted!");
            queryClient.invalidateQueries({ queryKey: ["recipes"] });
        },
    });
};