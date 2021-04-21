import {Component} from "react";
// 引入 Swiper, SwiperItem 组件
import {Swiper, SwiperItem, Image} from '@tarojs/components'
import './index.less'


type Props = {
  pictureUrl : string[]
}

export default class Index extends Component<Props, {}>  {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay>
        {this.props.pictureUrl.map((value, index) => {
          return(
            <SwiperItem key={index}>
              <Image src={value} className={'Swiper-Item-picture'}/>
            </SwiperItem>
          )
        })}
      </Swiper>
    )
  }
}
