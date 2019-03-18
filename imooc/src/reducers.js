/**
 * Created by fengyingxiao on 2018/3/30.
 */
//合并所有reducer，并且返回
import {combineReducers} from 'redux'
import { user } from './redux/user.redux'

export default combineReducers({user})