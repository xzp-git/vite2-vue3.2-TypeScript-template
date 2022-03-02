import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import errorHandle from './status-code'

class HttpRequest {
  baseURL: string
  timeout: number
  queue: Record<string, boolean>
  instance: AxiosInstance
  constructor() {
    this.baseURL = import.meta.env.DEV ? '/' : 'http://example.com'
    this.timeout = 3000
    this.instance = axios.create()
    //loading
    this.queue = {} //专门用来维护请求的队列
    //页面切换我需要取消请求
  }
  setInterceptor(instance: AxiosInstance, url: string) {
    instance.interceptors.request.use((config) => {
      if (Object.keys(this.queue).length === 0) {
        //开启loading
      }
      const token = sessionStorage.getItem('token')
      if (token) {
        // 每次请求都会携带一个 权限访问服务器
        config.headers!.token = token
      }
      this.queue[url] = true
      return config
    })

    instance.interceptors.response.use(
      (res) => {
        Reflect.deleteProperty(this.queue, url)
        if (Object.keys(this.queue).length === 0) {
          //关闭loading
        }
        //如果服务端 返回的是二进制流 则直接返回
        if (res.headers['content-type'] === 'application/octet-stream')
          return res

        if (res.data.code === 1) {
          return res.data.data // 请求成功返回数据
        } else {
          ElMessage.error({ message: res.data.msg })
          return null // 失败返回null 方便判断
        }
      },
      (err) => {
        Reflect.deleteProperty(this.queue, url)
        if (Object.keys(this.queue).length === 0) {
          //关闭loading
        }
        if (err && err.response) {
          errorHandle(err.response.status)
          return null
        } else {
          if (!window.navigator.onLine) {
            ElMessage.warning('网络不稳定，请检查网络连接')
          } else {
            ElMessage.error('网络请求超时')
          }
          return null
        }
      }
    )
  }
  request(options: AxiosRequestConfig) {
    // 通过request方法来进行请求操作
    // 每次请求可以创建一个新的实例， 如果业务不复杂你可以不创建实例  直接使用axios
    // const instance = axios.create()
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
    this.setInterceptor(this.instance, config.url!)
    return this.instance(config) // 产生的是一个 promise  axios()
  }
  get(url: string, data = {}) {
    //   axios.get('/xxx',{params:xxx})
    return this.request({
      url,
      method: 'get',
      ...data
    })
  }
  post(url: string, data = {}) {
    // axios.post('/xxx',{data})
    return this.request({
      url,
      method: 'post',
      data
    })
  }
  // 需要别的方法还可以接续扩展
}

export default new HttpRequest()
