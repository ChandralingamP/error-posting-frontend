import { Teams } from "./team.model"
export interface Questions {
  userId : string
  userName : string
  title : string
  description : string
  code : string
  expectation : string
  tags : Array<string>
  votes : Array<string>
  views : Number
}
export interface Question {
  _id : string
  userId : string
  userName : string
  title : string
  description : string
  code : string
  expectation : string
  answers : Array<Answer>
  tags : Array<string>
  votes : Array<string>
  views : Number
  createdAt : Date
}
export interface Answer{
  userId : string
  userName: string
  description: string
  code : string
}
export interface User {
  _id: string
  userName : string
  email: string
  photoURL: string
  reputation : Number
  teams : Array<Teams>
}

export interface Tags {
  tag : string,
  qCount : number
}

export interface EmailFormat{
  to_name: string,
  link_to: string,
  email_to: string,
}
