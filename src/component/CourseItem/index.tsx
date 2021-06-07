import { PureComponent } from 'react';
import {Image, Text, View} from "@tarojs/components";
import './index.less'
import {AtAvatar} from "taro-ui";
import {Timetable} from "../../utils/api";
import Taro from "@tarojs/taro";

export interface OwnProps {
  timetable:Timetable,
  name:string,
  courseUrl:string,
  date:string
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

  click = ()=>{
    console.log(this.props.timetable.id)
    Taro.navigateTo({
      url : `../../pages/CourseInfo/index?id=${this.props.timetable.id}`
    }).then((value)=>{
      console.log(value);
    })
  }

  render() {
    return (
      <View className="total">
        <View className="item">
          <View className="item-init" onClick={this.click}>
            <View className="mask"/>
            <View className="background">
              <Image src={this.props.courseUrl} mode="aspectFill" style="width:100%;height:100%;"/>
            </View>
            <View className="value">
              <View className="coach">
                <AtAvatar circle image={this.props.timetable.coachAvatarUrl} size={"small"}/>
                <View className="coach-name">
                  <Text>
                    {this.props.timetable.coachName}
                  </Text>
                </View>
              </View>
              <View className="line"/>
              <View className="course">
                <View className="course-name">
                  <Text>
                    {this.props.name}
                  </Text>
                </View>
                <View className="time">
                  <Text>
                    {this.props.date+" "+this.props.timetable.startTime + "-" + this.props.timetable.endTime}
                  </Text>
                </View>
                <View className="last-bottom">
                  <View className="toplimit">
                    <Text>
                      预约人数：{this.props.timetable.count}/{this.props.timetable.toplimit}
                    </Text>
                  </View>
                  <View className={this.props.timetable.isReservation?"hasReservation":"noReservation"}>
                    <Text>
                      {this.props.timetable.isReservation?"已预约":"去预约"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index
