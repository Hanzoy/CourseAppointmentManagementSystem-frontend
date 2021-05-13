import Taro from '@tarojs/taro'
import { baseUrl } from '../config'

interface OptionsType<T> {
  method: 'GET' | 'POST';
  data: T;
  url: string;
}

export default <REQ, RES> (options: OptionsType<REQ>) => {
  return new Promise<RES>((resolve,_) => {
    Taro.request<RES, REQ>({
      url: baseUrl + options.url,
      data: {
        ...options.data,
      },
      header: {
        'Content-Type': 'application/json'
      },
      // @ts-ignore
      method: options.method.toUpperCase(),
      success: (result) => {
        resolve(result.data)
      },
      complete: (result)=>{
        console.log(result)
      }
    });
  });
}
