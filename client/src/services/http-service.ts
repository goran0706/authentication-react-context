import apiClient from '../api/api-client'

interface Entity {
  _id: number | string
}

class HttpService {
  constructor(public endpoint: string) {}

  getAll<T>() {
    const controller = new AbortController()
    const signal = controller.signal
    const cancel = () => controller.abort()
    const request = apiClient.get<T[]>(this.endpoint, { signal })
    return { request, cancel }
  }

  get<T>() {
    const controller = new AbortController()
    const signal = controller.signal
    const cancel = () => controller.abort()
    const request = apiClient.get<T>(this.endpoint, { signal })
    return { request, cancel }
  }

  create<T extends Entity>(entity: T) {
    return apiClient.post<T>(this.endpoint, entity)
  }

  update<T extends Entity>(entity: T) {
    return apiClient.put<T>(`${this.endpoint}/${entity._id}`, entity)
  }

  delete<T extends Entity>(entity: T) {
    return apiClient.delete<T>(`${this.endpoint}/${entity._id}`)
  }
}

const create = (endpoint: string) => new HttpService(endpoint)

export default create
