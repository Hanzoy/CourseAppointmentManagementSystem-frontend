import { Component } from 'react'
import {View, Text} from '@tarojs/components'
import './index.less'
import Swiper from '../../component/Swiper'
import CharacterBar, {UserInfo} from '../../component/CharacterBar'

const date = {
  pictureUrl : ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdealer2.autoimg.cn%2Fdealerdfs%2Fg6%2FM13%2F3B%2F13%2F620x0_1_q87_autohomedealer__wKgHzVaVtMuAM-HeAAGsnURWZ00237.JPG&refer=http%3A%2F%2Fdealer2.autoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621418197&t=d92c92122220cba758300c1a21659d2c',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdealer2.autoimg.cn%2Fdealerdfs%2Fg6%2FM13%2F3B%2F13%2F620x0_1_q87_autohomedealer__wKgHzVaVtMuAM-HeAAGsnURWZ00237.JPG&refer=http%3A%2F%2Fdealer2.autoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621418197&t=d92c92122220cba758300c1a21659d2c'],
  userInfo : [
    {id:'1',name:'text',avatarUrl:'https://pic2.zhimg.com/80/v2-a98aec34a8ee6c0b30c8c178696220be_1440w.jpg?source=1940ef5c',remark : 'remarkTest_as_as_as_As_AS_AS_AS_AS_AS_AS_FD_FD_FD_FD'},
    {id:'2',name:'text',avatarUrl:'https://pic2.zhimg.com/80/v2-a98aec34a8ee6c0b30c8c178696220be_1440w.jpg?source=1940ef5c',remark : 'remarkTest_as_as_as_As_AS_AS_AS_AS_AS_AS_FD_FD_FD_FD'},
    {id:'3',name:'text',avatarUrl:'https://pic2.zhimg.com/80/v2-a98aec34a8ee6c0b30c8c178696220be_1440w.jpg?source=1940ef5c',remark : 'remarkTest_as_as_as_As_AS_AS_AS_AS_AS_AS_FD_FD_FD_FD'},
    {id:'4',name:'text',avatarUrl:'https://pic2.zhimg.com/80/v2-a98aec34a8ee6c0b30c8c178696220be_1440w.jpg?source=1940ef5c',remark : 'remarkTest_as_as_as_As_AS_AS_AS_AS_AS_AS_FD_FD_FD_FD'},
    {id:'5',name:'text',avatarUrl:'https://pic2.zhimg.com/80/v2-a98aec34a8ee6c0b30c8c178696220be_1440w.jpg?source=1940ef5c',remark : 'remarkTest_as_as_as_As_AS_AS_AS_AS_AS_AS_FD_FD_FD_FD'},
    {id:'6',name:'text',avatarUrl:'https://pic2.zhimg.com/80/v2-a98aec34a8ee6c0b30c8c178696220be_1440w.jpg?source=1940ef5c',remark : 'remarkTest_as_as_as_As_AS_AS_AS_AS_AS_AS_FD_FD_FD_FD'},
    {id:'7',name:'text',avatarUrl:'https://pic2.zhimg.com/80/v2-a98aec34a8ee6c0b30c8c178696220be_1440w.jpg?source=1940ef5c',remark : 'remarkTest_as_as_as_As_AS_AS_AS_AS_AS_AS_FD_FD_FD_FD'},
    {id:'8',name:'text',avatarUrl:'https://pic2.zhimg.com/80/v2-a98aec34a8ee6c0b30c8c178696220be_1440w.jpg?source=1940ef5c',remark : 'remarkTest_as_as_as_As_AS_AS_AS_AS_AS_AS_FD_FD_FD_FD'},]
}

type State = {
  pictureUrl : string[],
  userInfo : UserInfo[]
}

export default class Index extends Component< {}, State> {

  componentWillMount () {
    this.setState({...date});
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Swiper pictureUrl={this.state.pictureUrl}/>
        <CharacterBar userInfo={this.state.userInfo}/>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
