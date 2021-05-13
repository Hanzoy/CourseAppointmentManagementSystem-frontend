import {Component} from "react";
import Taro from "@tarojs/taro";
import {Image, Text, View} from '@tarojs/components'
import './index.less'
import IconFont from "../iconfont";
import {CoachInfo} from "../../utils/api";

type Props = {
  coachInfo : CoachInfo[]
}


export default class Index extends Component<Props, {}>  {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickItem = (Id)=>{
    return ()=>{
      Taro.navigateTo({
        url: `../../pages/CharacterInfo/index?id=${Id}`
      }).then((value)=>{
        console.log(Id);
        console.log(value);
      })
    }
  }
  clickLookMoreCharacter = ()=>{
    Taro.navigateTo({
      url : "../../pages/CharacterList/index"
    }).then((value)=>{
      console.log(value);
    })
  }
  render () {
    const {coachInfo} = this.props;
    return (
      <View className='total'>
        <View className='description'>
          <View className='title'>
            <IconFont name='tag' size={50} color="#4f8fff"/>
            <Text>教练团队</Text>
          </View>
          <View className='more' onClick={this.clickLookMoreCharacter}>
            <Text>查看更多</Text>
          </View>
        </View>
        <View className='bar'>
          {coachInfo.map(value => {
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
