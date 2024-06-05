import { create } from "zustand";

const useAreaSearch = create((set) => ({
    // 검색된 지역코드 기반 데이터
    searchAreaBasedData: [],
    setSearchAreaBasedData: (searchAreaBasedData) => set({ searchAreaBasedData }),

    // 검색할 지역코드
    areaValue: 1,
    setAreaValue: (areaValue) => set({ areaValue }),
})) 

export default useAreaSearch;