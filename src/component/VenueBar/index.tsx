import {Component} from "react";
import {Image, Swiper, SwiperItem, Text, View} from '@tarojs/components'
import './index.less'
import IconFont from "../iconfont";
import {VenueInfo} from "../../utils/api";
import Taro from "@tarojs/taro";

type Props = {
  venueInfo : VenueInfo[]
}

export default class Index extends Component<Props, {}>  {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickImage = (value)=>{
    return ()=>{
      Taro.previewImage({
        urls:this.props.venueInfo.map(item => item.pictureUrl),
        current: value
      }).then()
    }
  }
  render () {
    return (
      <View className='total'>
        <View className='description'>
          <View className='title'>
            <IconFont name='tag' size={50} color="#4f8fff"/>
            <Text>场馆介绍</Text>
          </View>
          {/*<View className='more'>*/}
          {/*  <Text>查看更多</Text>*/}
          {/*</View>*/}
        </View>
        <View className='info'>
          <Swiper
            indicatorDots
            circular className="swiper">
            {this.props.venueInfo.map((value, index) => {
              return(
                <SwiperItem key={index} className="swiper-item">
                  <View>
                    <View className="name">
                      <Text>{value.name}</Text>
                    </View>
                    <View className="address">
                      <Text>地址：{value.address}</Text>
                    </View>
                    <View className="picture">
                      <Image src={value.pictureUrl} className={'swiper-item-picture'} onClick={this.clickImage(value.pictureUrl)}/>
                    </View>
                  </View>
                </SwiperItem>
              )
            })}
          </Swiper>
        </View>
      </View>
    )
  }
}
