import { useQuery } from "@tanstack/react-query";
// import { api } from "@/utils/api"; // Matikan panggilan ke backend

// Efek loading buatan
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const useGetDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            await delay();
            // Data dummy untuk ditampilkan di halaman depan
            // (Jika nanti tampilan grafiknya blank/rusak, berarti nama variabel di sini perlu disesuaikan dengan yang diminta UI, misal huruf besar/kecilnya).
            return {
                totalIngredients: 45,
                lowStockItems: 3,
                totalRecipes: 12,
                totalSchools: 5,
                recentActivities: []
            };
        },
    });
};