import { createAction } from 'redux-act';

//需经过saga复杂处理的特殊消息
export const md_serverpush_triporder = createAction('md_serverpush_triporder');
export const md_loginsendauth_result = createAction('md_loginsendauth_result');
export const md_serverpush_triprequestandorder = createAction('md_serverpush_triprequestandorder');
export const md_starttriprequestorder_result = createAction('md_starttriprequestorder_result');
export const md_canceltriprequestorder_result = createAction('md_canceltriprequestorder_result');
export const md_queryuserbalance_result = createAction('md_queryuserbalance_result');
