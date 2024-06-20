import { create } from "zustand";
import axios from "axios";

const useAreaCode = create((set) => ({
    // 검색된 페스티벌 데이터
    areaCodeData: [],
    setAreaCodeData: (areaCodeData) => set({ areaCodeData }),

    fetchAreaCode: async () => {
        const response = await axios(`${import.meta.env.VITE_BACKEND_API_URL}/api/areaCode`, {
            params : { pageNo : 1 }
        })
        set({ areaCodeData: response.data });
    }
})) 

export default useAreaCode;