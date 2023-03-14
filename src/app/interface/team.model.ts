import { User, Question } from "./interface.model"

export interface newTeam {
  name: String
  member: User
}

export interface Team {
  _id: String
  name: String
  leader: String
  member: Array<Member>
  question: Array<Question>
}
export interface Member {
  _id: String,
  userName: String,
  email: String,
  photoURL: String
}

// {
//   "_id": "xxxx",
//   "userName" : "chn",
//   "email":"kjdn",
//   "photoURL" : "kndkad",
//   "reputation" : 0
// }


export interface Teams {
  _id: String
  name: String
}

export interface newQuestion {
  _id: String
  userId: String
  title: String
  description: String
  code: String
  expectation: String
  tags: Array<String>
  createAt : String
}
