import { PureComponent } from 'react';
import {Text, View} from "@tarojs/components";
import './index.less'
import {GetUserInfo, UserInfo} from "../../utils/api";
import Taro from "@tarojs/taro";
import {AtAvatar, AtButton} from "taro-ui";
import IconFont from "../../component/iconfont";

export interface OwnProps {

}

type Props = OwnProps;

type State = Readonly<{
  userInfo: UserInfo
}>;

class Index extends PureComponent<Props, State> {
  readonly state: State = {
    userInfo: {
      name: "",
      nickName: "",
      avatarUrl: "",
      phone: "",
    }
  };

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  async componentDidShow () {
    const result = await GetUserInfo({token:Taro.getStorageSync("token"), openid:"x"})
    console.log(result)
    this.setState({userInfo: result.data.userInfo})
  }

  componentDidHide () { }

  clickSetting = ()=>{
    Taro.navigateTo({
      url: '../SettingInformation/index'
    }).then();
  }

  clickReservation = ()=>{
    Taro.switchTab({
      url: '../Reservation/index'
    }).then()
  }

  render() {
    return (
      <View className="total">
        <View className="bar">
          <AtAvatar image={this.state.userInfo.avatarUrl} size={"large"} circle={true}/>
          <View className="bar-name">
            <View className="bar-nickName-text">
              昵称：{this.state.userInfo.nickName}
            </View>
            <View className="bar-name-text">
              姓名：{this.state.userInfo.name == null?"尚未完善信息":this.state.userInfo.name}
            </View>
          </View>
          <View className="bar-setting" onClick={this.clickSetting}>
            <IconFont name={"shezhi"} size={60} color={"#60b1e4"}/>
            <View className="bar-setting-text">
              <Text>
                设置
              </Text>
            </View>
          </View>
        </View>
        <View className="bun">
          <View className="bun-button">
            <AtButton  type={"primary"} onClick={this.clickSetting}>完善个人信息</AtButton>
          </View>
          <View className="bun-button">
            <AtButton  type={"secondary"} onClick={this.clickReservation}>课程预约</AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default Index
