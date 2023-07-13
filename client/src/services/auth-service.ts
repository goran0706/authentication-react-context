import apiClient from '../api/api-client'

export type AuthResponse = {
  token: string
  message: string
}

class AuthService<T> {
  constructor(public endpoint: string) {}

  signUp(email: string, password: string) {
    return apiClient.post<T>(this.endpoint + 'sign-up', {
      email,
      password
    })
  }

  signIn(email: string, password: string) {
    return apiClient.post<T>(this.endpoint + 'sign-in', {
      email,
      password
    })
  }

  refreshToken() {
    return apiClient.post<T>(this.endpoint + 'refresh-token')
  }
}

export default new AuthService<AuthResponse>('/api/v1/auth/')
