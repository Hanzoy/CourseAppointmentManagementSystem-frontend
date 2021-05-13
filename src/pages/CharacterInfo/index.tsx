import {PureComponent} from 'react'
import Taro from "@tarojs/taro";
import {View, Image, Text} from '@tarojs/components';
import './index.less';
import {AtAvatar, AtRate} from 'taro-ui'
import {CoachInfo} from "../../utils/api";

export interface OwnProps {

}

type Props = OwnProps;

type State = Readonly<{
  id:number,
  name:string,
  remark:string,
  content:string,
  avatarUrl:string,
  backgroundUrl:string
}>;

class Index extends PureComponent<Props, State> {

  $instance = Taro.getCurrentInstance();

  componentWillMount () {
    const id = this.$instance.router?.params.id || '';
    // this.avatarUrl = 'https://img2.baidu.com/it/u=3355464299,584008140&fm=26&fmt=auto&gp=0.jpg';
    // this.backgroundUrl = 'https://img2.baidu.com/it/u=3770079857,1976943421&fm=26&fmt=auto&gp=0.jpg';
    // this.name = "蜘蛛侠";
    // this.remark = "能力越大，责任越大,测试1,测试2,测试3,测试4,测试5,测试6,测试7,测试8,测试9,测试10";
    // this.content = "能力越大，责任越大,测试1,测试2,测试3,测试4,测试5,测试6,测试7,测试8,测试9,测试10";
    const coachInfo:CoachInfo[] = Taro.getStorageSync("CoachInfo");
    const res = coachInfo.find((item)=>{
      return parseInt(id) == item.id;
    })||{}
    this.setState(res)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='background'>
          <Image src={this.state.backgroundUrl} className='background-image' mode="aspectFill"/>
        </View>
        <View className="info">
          <View className="name">
            <View className="changePosition">
              <AtAvatar circle image={this.state.avatarUrl} size="large" className="atAvatar"/>
              <View className="setStar">
                <View className="text">
                  <Text>{this.state.name}</Text>
                </View>
                <AtRate size={15} value={4} max={4} className="star"/>
              </View>
            </View>
          </View>
          <View className="content">
            <View className="text">
              <Text>{this.state.remark}</Text>
            </View>
          </View>
          <View className="specialty">
            <View className="title">
              <Text>专长&资质</Text>
            </View>
            <View className="text">
              <Text>{this.state.content}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
