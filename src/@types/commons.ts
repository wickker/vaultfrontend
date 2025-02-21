import { Location } from 'react-router'

export type AppLocation<T = undefined> = {
  props: T
  previousLocation?: Location
}

export type AppError = {
  message: string
}

export type OptionItem<T = string> = {
  text: JSX.Element | string
  value: T
}
