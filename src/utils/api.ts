import Request from './request'
import {CourseInfo} from "../component/Course";

/*========================================================*/
// 查询轮播图图片
export interface BaseResult<T> {
  code: string;
  message: string;
  data: T;
}

export type GetSwiperResult = BaseResult<{
  pictureUrl:string[]
}>

export const getSwiperPicture = async ()=>{
  return await Request<null, GetSwiperResult>({
    url:'/getSwiper',
    method: 'GET',
    data: null
  })
}
/*========================================================*/


/*========================================================*/
// 获取教练信息
export type GetCoachResult = BaseResult<{
  coachInfo : CoachInfo[]
}>

export type CoachInfo = {
  id:number,
  name:string,
  remark:string,
  content:string,
  avatarUrl:string,
  backgroundUrl:string
}

export const getCoach = async ()=>{
  return await Request<null, GetCoachResult>({
    url:'/getCoach',
    method:'GET',
    data:null
  })
}
/*========================================================*/


/*========================================================*/
// 获取场馆信息
export type GetVenueResult = BaseResult<{
  venueInfo:VenueInfo[]
}>

export type VenueInfo = {
  id : number,
  name : string,
  address : string,
  pictureUrl : string
}

export const getVenue = async ()=>{
  return await Request<null, GetVenueResult>({
    url:'/getVenue',
    method:'GET',
    data:null
  })
}
/*========================================================*/


/*========================================================*/
// 登陆
export type LoginResult = BaseResult<{
  needRegister: boolean,
  token: string
}>

export type LoginParam = {
  code: string
}

export const login = async (data: LoginParam)=>{
  return await Request<LoginParam, LoginResult>({
    url: '/user/login',
    method: 'POST',
    data: data
  })
}
/*========================================================*/


/*========================================================*/
//注册
export type RegisterResult = BaseResult<{
  token: string
}>

export type RegisterParam = {
  avatarUrl: string,
  code: string,
  name: string | null,
  nickName: string,
  phone: string | null
}

export const register = async (data: RegisterParam)=>{
  return await Request<RegisterParam, RegisterResult>({
    url: '/user/register',
    method: 'POST',
    data: data
  })
}

/*========================================================*/


/*========================================================*/
//获取用户拥有的课程信息
export type GetMyCourseInfoResult = BaseResult<{
  courseInfo:CourseInfo[]
}>

export type GetMyCourseInfoParam = {
  token: string
}

export const getMyCourseInfo = async (data:GetMyCourseInfoParam)=>{
  return await Request<GetMyCourseInfoParam, GetMyCourseInfoResult>({
    url: '/course/getMyCourseInfo',
    method: 'POST',
    data: data
  })
}
/*========================================================*/


/*========================================================*/
//查询选定时间当前用户能预约的课程安排
export type GetReservationCourseInfoResult = BaseResult<{
  courseTimetables:CourseTimetable[]
}>

export type CourseTimetable = {
  id:number,
  timetables:Timetable[]
}

export type Timetable = {
  id:number,
  coachName:string,
  coachAvatarUrl:string,
  startTime:string,
  endTime:string,
  toplimit:number,
  remark:string,
  address:string,
  count:number,
  isReservation:boolean
}

export type GetReservationCourseInfoParam = {
  date:string,
  token:string,
}

export const GetReservationCourseInfo = async (data:GetReservationCourseInfoParam)=>{
  return await Request<GetReservationCourseInfoParam, GetReservationCourseInfoResult>({
    url: '/course/getReservationCourseInfo',
    method: 'POST',
    data: data
  })
}

/*========================================================*/


