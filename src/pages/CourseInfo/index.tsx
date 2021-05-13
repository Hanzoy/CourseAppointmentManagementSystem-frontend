import { PureComponent } from 'react';
import {View} from "@tarojs/components";
import './index.less'

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

  render() {
    return (
      <View>

      </View>
    );
  }
}

export default Index
