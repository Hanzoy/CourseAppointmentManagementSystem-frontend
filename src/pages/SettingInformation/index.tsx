import { PureComponent } from 'react';
import {View} from "@tarojs/components";
import './index.less'
import {AtButton, AtForm, AtInput, AtMessage} from "taro-ui";
import {ChangeInformation} from "../../utils/api";
import Taro from '@tarojs/taro'

export interface OwnProps {

}

type Props = OwnProps;

type State = Readonly<{
  value1: string,
  value2: string
}>;

class Index extends PureComponent<Props, State> {
  readonly state: State = {
    value1:"",
    value2:""
  };
  handleChange1 (value) {
    this.setState({
      value1:value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  handleChange2 (value) {
    this.setState({
      value2:value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickBaoCun = async ()=>{
    console.log(this.state.value1,this.state.value2);
    const result = await ChangeInformation({token: Taro.getStorageSync("token"), name: this.state.value1, phone: this.state.value2})
    console.log(result)
    if(result.code !== "00000"){
      Taro.atMessage({
        'message': result.message,
        'type': 'error',
        'duration': 1000
      })
    }else{
      Taro.atMessage({
        'message': '保存成功',
        'type': 'success',
        'duration': 1000
      })
      setTimeout(()=>{
        Taro.navigateBack()
      },1000)
    }
  }

  render() {
    return (
      <View className="total">
        <AtMessage />
        <View className="but1">
          <AtForm>
            <AtInput
              name='value1'
              title='姓名'
              type='text'
              placeholder='请输入姓名'
              value={this.state.value1}
              onChange={this.handleChange1.bind(this)}
            />
            <AtInput
              name='value2'
              title='手机号码'
              type='number'
              placeholder='手机号码'
              value={this.state.value2}
              onChange={this.handleChange2.bind(this)}
            />
          </AtForm>
        </View>
        <View className="but2">
          <AtButton type={"secondary"} onClick={this.clickBaoCun}>保存</AtButton>
        </View>
      </View>
    );
  }
}

export default Index
