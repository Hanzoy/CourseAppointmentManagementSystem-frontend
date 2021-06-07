import { PureComponent } from 'react';
import {View} from "@tarojs/components";
import './index.less'
import Calendar from "../../component/Calendar";
import Taro from '@tarojs/taro'
import {
  CheckToken,
  CourseTimetable,
  getMyCourseInfo,
  GetReservationCourseInfo,
  HasReservationCourse,
  login,
  CourseAndTimetableInfo
} from "../../utils/api"
import { AtTabs, AtTabsPane, AtSegmentedControl } from 'taro-ui'
import Course, {CourseInfo, Tab} from "../../component/Course"
import PubSub from 'pubsub-js'
import {format} from "../../utils/date";
import CourseItem from "../../component/CourseItem";
import Empty from "../../component/Empty"

export interface OwnProps {

}

type Props = OwnProps;

type State = Readonly<{
  date:Date,
  current: number,
  courseInfo:CourseInfo[],
  tabList:Tab[],
  courseTimetables:CourseTimetable[],
  hasReservationCourseInfo: CourseAndTimetableInfo[],
  current2: number,
}>;

class Index extends PureComponent<Props, State> {
  readonly state: State = {
    date: new Date(),
    current: 0,
    courseInfo:[],
    tabList:[],
    courseTimetables:[],
    hasReservationCourseInfo:[],
    current2: 0,
  };
  handleClick2 (value) {
    this.setState({
      current2: value
    })
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  componentWillMount () {

  }

  checkNeedRegister =async ()=>{
    const token = Taro.getStorageSync('token');
    if(token == undefined || token == ""){
      const {code} = await Taro.login();
      const result = await login({code: code});
      if(result.data.needRegister){
        Taro.navigateTo({
          url: '../Login/index'
        }).then();
        return;
      }else{
        Taro.setStorageSync('token', result.data.token);
      }
    }
    await this.checkTokenAndRefreshToken(token);
    this.showCourseInfo().then();
  }

  showCourseInfo = async ()=>{
    await Taro.showLoading();
    const token = Taro.getStorageSync('token');
    const result = await getMyCourseInfo({
      token:token
    });
    this.setState({
      courseInfo:result.data.courseInfo
    });
    Taro.hideLoading();

    PubSub.publish('tabList', this.state.courseInfo);
  }

  checkTokenAndRefreshToken = async (token:string)=>{
    const checkTokenResult = await CheckToken({
      token:token
    })
    if(checkTokenResult.code !== "00000"){
      const {code} = await Taro.login();
      const loginResult = await login({code: code});
      Taro.setStorageSync("token",loginResult.data.token)
      console.log("token已更新");
      token = loginResult.data.token;
    }
    return token
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  async componentDidShow(){
    this.checkNeedRegister().then();
    await this.handleCalendarChange(this.state.date,false);
    const result = await HasReservationCourse({token:Taro.getStorageSync("token")})
    console.log("Has",result);
    this.setState({hasReservationCourseInfo: result.data.courseInfos})
  }

  componentDidHide () { }

  // load = async (ldate: Date) => {
  // load = async () => {
  //   await Taro.showLoading();
  //   const res = await getRevs({
  //     year: ldate.getFullYear().toString(),
  //     month: (ldate.getMonth() + 1).toString()
  //   });
  //   setMonthData(res.data.day);
  //   setRoomData(res.data.meetingRoom);
  //   setDate(new Date());
  //   this.setState({
  //     date: new Date()
  //   })
  //   // console.log(res.data.day)
  //   Taro.hideLoading();
  // }

  handleCalendarChange = async (cdate: Date, inMonth: boolean) => {
    console.log(cdate);
    this.setState({date:cdate})
    if (!inMonth) {
      // await this.load();
    }
    const token = Taro.getStorageSync('token');
    let result;
    try{
      result = await GetReservationCourseInfo({
        date: format("yyyy-MM-dd", cdate),
        token: token
      })
      console.log(result)
      this.setState({
        courseTimetables: result.data.courseTimetables
      })
    }catch (e){
      console.log("catch");
      // const freshToken = Taro.getStorageSync("token");
      const {code} = await Taro.login();
      const loginResult = await login({code: code});
      setTimeout(async ()=>{
        result = await GetReservationCourseInfo({
          date: format("yyyy-MM-dd", cdate),
          token: loginResult.data.token
        })
        console.log(result)
        this.setState({
          courseTimetables: result.data.courseTimetables
        })
      },2000)
    }
  }

  render() {
    return (
      <View>
        <AtTabs
          animated={false}
          current={this.state.current}
          tabList={[
            { title: '课程预约' },
            { title: '我的预约' }
          ]}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View style={'padding: 0;background-color: #FAFBFC;height:100vh'}>
              <Calendar initDate={new Date()} date={this.state.date} onChange={this.handleCalendarChange}/>
              <Course selectTime={this.state.date} course={this.state.courseInfo} courseTimetables={this.state.courseTimetables}/>

            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 0;background-color: #FAFBFC;'>

              <View>

                <AtSegmentedControl
                  values={this.state.hasReservationCourseInfo.map(item => item.courseName)}
                  onClick={this.handleClick2.bind(this)}
                  current={this.state.current2}
                />
                {
                  this.state.hasReservationCourseInfo.map((item, index)=>{
                    if(index === this.state.current2){
                      return (
                        <View className="show">
                          {
                            item.timetableInfos.length === 0?
                              <Empty/>
                              :<View>

                              </View>
                          }
                          {
                            item.timetableInfos.map((item)=>{
                              return (
                                <CourseItem timetable={
                                  {
                                    id:item.timetableId,
                                    coachName:item.coachName,
                                    coachAvatarUrl: item.coachAvatarUrl,
                                    startTime:item.startTime,
                                    endTime:item.endTime,
                                    toplimit:item.toplimit,
                                    remark:item.remark,
                                    address:item.address,
                                    count:item.count,
                                    isReservation:item.isReservation
                                  }
                                } name={item.name} courseUrl={item.backgroundUrl} date={item.date}/>
                              )
                            })
                          }
                        </View>
                      )
                    }
                  })
                }
              </View>

            </View>
          </AtTabsPane>
        </AtTabs>

      </View>
    );
  }
}

export default Index;
