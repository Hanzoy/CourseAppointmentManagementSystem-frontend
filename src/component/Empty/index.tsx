import {PureComponent} from 'react';
import {Text, View} from "@tarojs/components";
import './index.less'
import IconFont from "../iconfont";

export interface OwnProps {

}

type Props = OwnProps;

type State = Readonly<{}>;

class Index extends PureComponent<Props, State> {
  readonly state: State = {};

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className="box">
        <Text className="text">当前暂无课程安排</Text>
        <IconFont name={"kong"} size={490} color={"rgba(0,0,0,0.3)"}/>
      </View>
    );
  }
}

export default Index
