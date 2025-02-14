import { Location } from 'react-router'

export type AppLocation<T = undefined> = {
  props: T
  previousLocation?: Location
}
