import { create } from "zustand";

const useFestival = create((set) => ({
    // 검색된 페스티벌 데이터
    festivalData: [],
    setFestivalData: (festivalData) => set({ festivalData })
})) 

export default useFestival;