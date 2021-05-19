import { Component } from 'react';
import {Text, View} from "@tarojs/components";
import './index.less'
import { AtTabs, AtTabsPane } from 'taro-ui'
import {eventCenter, getCurrentInstance} from '@tarojs/taro'
import PubSub from 'pubsub-js'
import {CourseTimetable} from "../../utils/api";
import CourseItem from "../CourseItem"

export interface OwnProps {
  course:CourseInfo[],
  selectTime:Date,
  courseTimetables:CourseTimetable[],
}

export type CourseInfo = {
  id:number,
  name:string,
  backgroundUrl:string,
  count:number,
}

export type Tab = {
  title:string
}

type Props = OwnProps;

type State = Readonly<{
  current:number,
  tabList:Tab[],
}>;

class Index extends Component<Props, State> {

  readonly state: State = {
    current: 0,
    tabList:[{title:''}],
  };
  handleClick (value) {
    this.setState({
      current: value
    })
  }


  componentDidMount () { }


  tabListPubSub
  $instance = getCurrentInstance()

  componentWillMount () {
    const onShowEventId = this.$instance.router?.onShow || ''
    // 监听
    eventCenter.on(onShowEventId, this.onShow)

    this.tabListPubSub = PubSub.subscribe('tabList', (_,data) => {
      let tempList:Tab[] = [];
      data.map((value)=>{
        tempList.push({title:value.name})
      })
      this.setState({
        tabList:tempList
      })
    })
  }

  componentWillUnmount () {
    const onShowEventId = this.$instance.router?.onShow || ''
    // 卸载
    eventCenter.off(onShowEventId, this.onShow)
    PubSub.unsubscribe(this.tabListPubSub);
  }

  onShow = async () => {

    console.log('onShow')
    console.log("props",this.props)
    console.log("state",this.state)
    // if(tempList.length == 0){
    //   setTimeout(()=>{
    //     let tempList:Tab[] = [];
    //     this.props.course.map((value)=>{
    //       tempList.push({title:value.name})
    //     })
    //     this.setState({
    //       tabList:tempList
    //     })
    //   },1000)
    // }
  }

  componentDidShow () {

  }

  componentDidHide () { }

  render() {
    return (
      <View className="total">
        {this.state.tabList.length == 0?
          (<View>
            您当前还有没可以预约的课程
          </View>)
          :
          (<AtTabs
            animated={false}
            current={this.state.current}
            scroll
            height={"100vh"}
            tabDirection='vertical'
            tabList={this.state.tabList}
            onClick={this.handleClick.bind(this)}>
            {this.props.course.map((value, index)=>{
              const timetable = this.props.courseTimetables.find((values)=>{
                return  values.id === value.id
              })
              let height:number;
              if(timetable == undefined || timetable.timetables.length <= 3){
                height = 100;
              }else{
                height = timetable.timetables.length * 40
              }
              return(
                <AtTabsPane tabDirection='vertical' current={this.state.current} index={index}>
                  <View style={'font-size:18px;width:80vw;height:'+height+'vh;'} className="pages">
                    <View className="count">
                      <Text>
                        当前用户剩余课时数量：{value.count}
                      </Text>
                    </View>
                    <View>
                      {this.props.courseTimetables?.map((values)=>{
                        if(values.id === value.id){
                          return(
                            <View>
                              <View>
                                {
                                  values.timetables?.map((val)=>{
                                    return(
                                      <CourseItem timetable={val} name={value.name} courseUrl={value.backgroundUrl}/>
                                    )
                                  })
                                }
                              </View>
                            </View>
                          )
                        }
                      })}
                    </View>
                  </View>
                </AtTabsPane>
              )
            })}
          </AtTabs>)
        }
      </View>
    );
  }
}

export default Index;
