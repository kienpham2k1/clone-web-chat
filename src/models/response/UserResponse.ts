export interface UserResponse {
    id: string
    username: string
    phoneNumber: string
    addressLine: string
    email: string
    verify: boolean
    avatar: string | undefined
}