import { PureComponent } from 'react';
import {Button, Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import './index.less'
import {AtAvatar} from "taro-ui";
import {register} from "../../utils/api";

export interface OwnProps {

}

type Props = OwnProps;

type State = Readonly<{

}>;

class Index extends PureComponent<Props, State> {
  readonly state: State = {

  };

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  auth = ()=>{
    Taro.getUserProfile({
      desc: "登陆授权",
      success: async (result) => {
        const {code} = await Taro.login();
        const res = await register({
          code: code,
          avatarUrl: result.userInfo.avatarUrl,
          nickName: result.userInfo.nickName,
          name: null,
          phone: null
        });
        console.log(res);
        if(res.code !== "00000"){
          Taro.showToast({
            title: "服务端异常",
            duration: 2000,
            icon: 'error'
          }).then()
        }else{
          Taro.setStorageSync("token", res.data.token);
          Taro.navigateBack().then(()=>{
            Taro.showToast({
              title: "登陆授权成功",
              duration: 2000,
              icon: 'success'
            }).then()
          });
        }
      },
      fail:()=>{
        Taro.switchTab({
          url: '../Home/index'
        }).then(()=>{
          Taro.showToast({
            title: "登陆授权失败",
            duration: 2000,
            icon: 'error'
          }).then()
        })
      },
    }).then()
  }

  back = ()=>{
    Taro.switchTab({
      url: '../Home/index'
    }).then(()=>{
      Taro.showToast({
        title: "登陆授权失败",
        duration: 2000,
        icon: 'error'
      }).then()
    })
  }

  render() {
    return (
      <View className="total">
        <View className="title">
          <View className="atAvatar">
            <AtAvatar circle size="large"/>
          </View>
          <View className="title-context">
            <Text>约课微</Text>
          </View>
        </View>
        <View className="login">
          <View className="context">
            <Text>申请获取你的公开信息(昵称、头像等)</Text>
          </View>
          <Button onClick={this.auth} style={{backgroundColor:"#04be02",color:"white"}}>
          {/*<Button onClick={this.auth}>*/}
            <Text>微信授权</Text>
          </Button>
          <Button onClick={this.back} style={{backgroundColor:"white",color:"#04be02"}}>
          {/*<Button>*/}
            <Text>取消</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Index
