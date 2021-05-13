import { Component } from 'react'
import {View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import Swiper from '../../component/Swiper'
import CharacterBar from '../../component/CharacterBar'
import VenueBar from '../../component/VenueBar'
import {State} from "@tarojs/components/dist/types/stencil-public-runtime";
import {CoachInfo, VenueInfo, getCoach, getSwiperPicture, getVenue} from "../../utils/api";

type State = {
  pictureUrl : string[],
  coachInfo : CoachInfo[],
  venueInfo : VenueInfo[],
}

export default class Index extends Component< {}, State> {
  state = {
    pictureUrl : [],
    coachInfo : [],
    venueInfo : [],
  }
  componentWillMount () {
    const SwiperPictureStorage:[] = Taro.getStorageSync("SwiperPicture");
    const CoachInfoStorage:[] = Taro.getStorageSync("CoachInfo");
    const VenueInfoStorage:[] = Taro.getStorageSync("VenueInfo");
    if(SwiperPictureStorage == undefined || SwiperPictureStorage.length == 0){
      this.refreshSwiperPicture().then();
    }else{
      this.setState({pictureUrl:SwiperPictureStorage});
    }
    if(CoachInfoStorage == undefined || CoachInfoStorage.length == 0){
      this.refreshCoach().then();
    }else{
      this.setState({coachInfo:CoachInfoStorage});
    }
    if(VenueInfoStorage == undefined || VenueInfoStorage.length == 0){
      this.refreshVenue().then();
    }else{
      this.setState({venueInfo:VenueInfoStorage});
    }
  }

  refreshSwiperPicture = async ()=>{
    const result = await getSwiperPicture();
    Taro.setStorageSync("SwiperPicture", result.data.pictureUrl);
    this.setState({pictureUrl:result.data.pictureUrl});
  }

  refreshCoach = async ()=>{
    const result = await getCoach();
    Taro.setStorageSync("CoachInfo", result.data.coachInfo);
    this.setState({coachInfo:result.data.coachInfo});
  }

  refreshVenue = async ()=>{
    const result = await getVenue();
    Taro.setStorageSync("VenueInfo", result.data.venueInfo);
    this.setState({venueInfo:result.data.venueInfo})
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  async onPullDownRefresh () {
    Taro.showNavigationBarLoading()
    Taro.stopPullDownRefresh();
    await this.refreshSwiperPicture();
    await this.refreshCoach();
    await this.refreshVenue();
    setTimeout(()=>{
      Taro.hideNavigationBarLoading();
    },500)
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Swiper pictureUrl={this.state.pictureUrl}/>
        <CharacterBar coachInfo={this.state.coachInfo}/>
        <VenueBar venueInfo={this.state.venueInfo}/>
      </View>
    )
  }
}
