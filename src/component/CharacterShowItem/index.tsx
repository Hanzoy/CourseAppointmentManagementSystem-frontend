import { PureComponent } from 'react';
import {Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.less'
import {AtAvatar} from "taro-ui";
import {CoachInfo} from "../../utils/api";

export interface OwnProps {
  coachInfo : CoachInfo
}

type Props = OwnProps;

type State = Readonly<{
}>;

class Index extends PureComponent<Props, State> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickItem = ()=>{
    Taro.navigateTo({
      url: `../../pages/CharacterInfo/index?id=${this.props.coachInfo.id}`
    }).then((value)=>{
      console.log(this.props.coachInfo.id);
      console.log(value);
    })
  }

  render() {
    const {coachInfo} = this.props;
    return (
      <View className="total">
        <View className="avatar">
          <AtAvatar circle image={coachInfo.avatarUrl} size="large"/>
        </View>
        <View className="description">
          <View className="description-name">
            <Text>
              {coachInfo.name}
            </Text>
          </View>
          <View className="description-remark">
            <Text>
              {coachInfo.remark}
            </Text>
          </View>
        </View>
        <View className="lookAt">
          <View className="lookAtBorder" onClick={this.clickItem}>
            <Text>查看</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Index
