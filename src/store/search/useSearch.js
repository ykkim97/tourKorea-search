import { create } from "zustand";

const useSearch = create((set) => ({
    // 검색된 데이터
    searchRegion: [],
    setSearchRegion: (searchRegion) => set({ searchRegion }),

    // 검색 키워드
    region: [],
    setRegion: (region) => set({ region }),
})) 

export default useSearch;