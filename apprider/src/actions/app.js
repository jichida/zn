/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const common_err = createAction('common_err');

export const notify_socket_connected = createAction('notify_socket_connected');
export const serverpush_restoreorder = createAction('serverpush_restoreorder');//恢复订单

export const getsystemconfig_result = createAction('getsystemconfig_result');
