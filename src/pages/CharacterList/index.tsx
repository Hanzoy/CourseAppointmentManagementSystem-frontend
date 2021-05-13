import { PureComponent } from 'react';
import {View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import './index.less'
import {CoachInfo} from "../../utils/api";
import CharacterShowItem from "../../component/CharacterShowItem"

export interface OwnProps {

}

type Props = OwnProps;

type State = Readonly<{
  coachInfo : CoachInfo[];
}>;

class Index extends PureComponent<Props, State> {
  readonly state: State = {
    coachInfo : Taro.getStorageSync("CoachInfo")
  };

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render() {
    return (
      <View className="body">
        {this.state.coachInfo.map( value =>{
          return(
            <CharacterShowItem coachInfo={value} key={value.id}/>
          )
        })}
      </View>
    );
  }
}

export default Index
