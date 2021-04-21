import { Component } from 'react'
import Taro from "@tarojs/taro";
import { View, Text } from '@tarojs/components';
import './index.less';

export default class Index extends Component{

  $instance = Taro.getCurrentInstance();
  id:string | undefined;

  componentWillMount () {
    this.id = this.$instance.router?.params.id;
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>{this.id}</Text>
      </View>
    )
  }
}
