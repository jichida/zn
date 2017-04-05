/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createAction } from 'redux-act';
export const getnotifymessage_request = createAction('getnotifymessage_request');
export const getnotifymessage_result = createAction('getnotifymessage_result');
export const ui_setnotifymessageinited = createAction('ui_setnotifymessageinited');
export const notifymessages_addone = createAction('notifymessages_addone');