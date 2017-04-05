/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const showpopmessage = createAction('showpopmessage');
export const hidepopmessage = createAction('hidepopmessage');

export const common_err = createAction('common_err');

export const notify_socket_connected = createAction('notify_socket_connected');
export const notify_exit_app = createAction('notify_exit_app');
export const serverpush_restoreorder = createAction('serverpush_restoreorder');//恢复订单
