/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createReducer } from 'redux-act';
import {
    ui_setnotifymessageinited,
    getnotifymessage_result,
    notifymessages_addone
} from '../actions';
import {normalizr_notifymessageslist} from './normalizr';

const initial = {
    notifymessage: {
        remoteRowCount:0,
        inited:true,
        mynotifymessages:{
            result:{
                list:[]
            },
            entities:{
                notifymessages:{

                }
            }
        }
    },
};

const notifymessage = createReducer({
    [ui_setnotifymessageinited]:(state, inited) => {
        return  {...state,inited};
    },
    [getnotifymessage_result]:(state, {result}) => {
        // docs {Array} - Array of documents
        // total {Number} - Total number of documents in collection that match a query
        // limit {Number} - Limit that was used
        //     [page] {Number} - Only if specified or default page/offset values were used
        //     [pages] {Number} - Only if page specified or default page/offset values were used
        //     [offset] {Number} - Only if specified or default page/offset values were used
        let list = result.docs;
        let remoteRowCount = result.total;
        let mynotifymessages = normalizr_notifymessageslist({list});

        if(state.inited){
            //替换
            return { ...state,mynotifymessages,inited:false,remoteRowCount};
        }
        //追加记录
        return {
            ...state,
            mynotifymessages:{
                result:{
                    list:[...state.mynotifymessages.result.list,...mynotifymessages.result.list]
                },
                entities:{
                    notifymessages:{
                        ...state.mynotifymessages.entities.notifymessages,
                        ...mynotifymessages.entities.notifymessages

                    }
                }
            }
        };

    },
    [notifymessages_addone]:(state, payload) => {
        let list = [payload._id,...state.mynotifymessages.result.list];
        let entities = state.mynotifymessages.entities.notifymessages;
        entities[payload._id] = payload;
        return { ...state,mynotifymessages:{
            result:{
                list:[...list]
            },
            entities:{
                notifymessages:{
                    ...entities
                }
            }
        }
        };
    },

}, initial.notifymessage);

export default notifymessage;