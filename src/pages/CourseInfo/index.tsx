import { PureComponent } from 'react';
import {Image, Text, View} from "@tarojs/components";
import './index.less'
import {AtAvatar, AtNoticebar} from "taro-ui";
import Taro from "@tarojs/taro";
import {CourseInfo, getCourseInfo} from "../../utils/api";
import IconFont from "../../component/iconfont";

export interface OwnProps {

}

type Props = OwnProps;

type State = Readonly<{
  data:CourseInfo
}>;

class Index extends PureComponent<Props, State> {
  readonly state: State = {
    data:{
      courseId:0,
      name:'',
      backgroundUrl:'',
      surplusCount:0,
      timetableId:0,
      coachName:'',
      coachAvatarUrl:'',
      date:'',
      startTime:'',
      endTime:'',
      toplimit:0,
      remark:'',
      address:'',
      count:0,
      isReservation:false
    }
  };

  $instance = Taro.getCurrentInstance();

  async componentWillMount () {
    const id = this.$instance.router?.params.id || '';
    const token = Taro.getStorageSync("token");
    const result = await getCourseInfo({
      token:token,
      id:parseInt(id)
    })
    this.setState({
      data:result.data
    })
    console.log(result)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render() {
    return (
      <View className='index'>
        <View className='background'>
          <Image src={this.state.data.backgroundUrl} className='background-image' mode="aspectFill"/>
        </View>
        <View className="info">
          <View className="value">
            <View className="changePosition">
              <AtAvatar circle image={this.state.data.coachAvatarUrl} size="large" className="atAvatar"/>
              <View className="coachName">
                <Text>{this.state.data.coachName}</Text>
              </View>
            </View>
            <View className="context">
              <View className="courseName">
                {this.state.data.name}
              </View>
              <View className="surplusCount">
                <IconFont name="renshu" size={35} color="#aaaaaa"/>
                <Text className="surplusCount-context">
                  预约人数{this.state.data.count}/{this.state.data.toplimit}
                </Text>
              </View>
              <View className="time">
                <IconFont name="shijian" size={35} color="#aaaaaa"/>
                <Text className="time-context">
                  {this.state.data.date} {this.state.data.startTime}~{this.state.data.endTime}
                </Text>
              </View>
              <View className="address">
                <IconFont name="dizhi" size={35} color="#aaaaaa"/>
                <Text className="address-context">
                  {this.state.data.address}
                </Text>
              </View>
              <View className="remark">
                <IconFont name="mulu" size={35} color="#aaaaaa"/>
                <Text className="remark-context">
                  课程介绍 {this.state.data.remark}
                </Text>
              </View>
            </View>
          </View>
          <View className="count">
            <View className="count-context">
              <Text>
                当前剩余课时数量：{this.state.data.surplusCount}
              </Text>
            </View>
          </View>
          <View className="showTips">
            <AtNoticebar>注意：上课前两小时内不能取消课程预约</AtNoticebar>
          </View>
        </View>
        <View className="click">
        {this.state.data.isReservation?
          <View className="click-hasReservation">
            <Text>
              取消预约
            </Text>
          </View>
          :<View className="click-noReservation">
            <Text>
              预约
            </Text>
          </View>}
        </View>
      </View>
    );
  }
}

export default Index
