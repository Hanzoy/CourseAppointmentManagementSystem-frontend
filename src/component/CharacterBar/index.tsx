import {Component} from "react";
import Taro from "@tarojs/taro";
import {Image, Text, View} from '@tarojs/components'
import './index.less'
import IconFont from "../iconfont";

export type UserInfo = {
  id : string,
  name : string,
  avatarUrl : string,
  remark : string
}

type Props = {
  userInfo : UserInfo[]
}


export default class Index extends Component<Props, {}>  {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickItem(id) {
    return ()=>{
      Taro.navigateTo({
        url: `../../pages/CharacterInfo/index?id=${id}`
      }).then(r =>{
        console.log(r);
      })
    }
  }

  render () {
    const {userInfo} = this.props;
    return (
      <View className='total'>
        <View className='description'>
          <View className='title'>
            <IconFont name='tag' size={50} color="#4f8fff"/>
            <Text>教练团队</Text>
          </View>
          <View className='more'>
            <Text>查看更多</Text>
          </View>
        </View>
        <View className='bar'>
          {userInfo.map(value => {
            return(
              <View key={value.id} className='bar-item' onClick={this.clickItem(value.id)}>
                <View className='bar-item-image'>
                  <Image src={value.avatarUrl}/>
                </View>
                <View className='bar-item-name'>
                  <Text>{value.name}</Text>
                </View>
                <View className='bar-item-remark'>
                  <Text>{value.remark}</Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  };
}
