import { create } from "zustand";

const useAccommodation = create((set) => ({
    // 검색된 숙박정보 데이터
    accommodationData: [],
    setAccommodationData: (accommodationData) => set({ accommodationData })
})) 

export default useAccommodation;