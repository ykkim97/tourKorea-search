import { create } from "zustand";
import axios from "axios";

const useAreaCode = create((set) => ({
    // 검색된 페스티벌 데이터
    areaCodeData: [],
    setAreaCodeData: (areaCodeData) => set({ areaCodeData }),

    fetchAreaCode: async () => {
        const response = await axios('http://localhost:7516/api/areaCode', {
            params : { pageNo : 1 }
        })
        set({ areaCodeData: response.data });
    }
})) 

export default useAreaCode;