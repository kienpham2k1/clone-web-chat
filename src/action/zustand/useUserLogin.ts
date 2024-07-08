import { UserResponse } from '@/app/data'
import { createStore } from 'zustand/vanilla'

export type UserLoginState = {
    userLogin: UserResponse | undefined,
    token: string | undefined
}

export type UserLoginAction = {
    login: () => void
    logOut: () => void
}

export type UserStore = UserLoginState & UserLoginAction

export const defaultInitState: UserLoginState = {
    userLogin: undefined,
    token: undefined
}

export const createCounterStore = (
    initState: UserLoginState = defaultInitState,
) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        login: () => set((state) => ({ userLogin: state.userLogin, token: state.token })),
        logOut: () => set((state) => ({ userLogin: undefined, token: undefined })),
    }))
}