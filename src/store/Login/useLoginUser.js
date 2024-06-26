import { create } from "zustand";

const useLoginUser = create((set) => ({
    // 검색된 페스티벌 데이터
    userData: [],
    setUserData: (userData) => set({ userData }),

    userToken: '',
    setUserToken: (userToken) => set({ userToken }),
})) 

export default useLoginUser;