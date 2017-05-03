import { createAction } from 'redux-act';

//需经过saga复杂处理的特殊消息
export const md_acceptrequest_result = createAction('md_acceptrequest_result');
export const md_loginsendauth_result = createAction('md_loginsendauth_result');
export const md_serverpush_triporder = createAction('md_serverpush_triporder');
export const md_serverpush_triprequestandorder = createAction('md_serverpush_triprequestandorder');
export const md_updaterequeststatus_result = createAction('md_updaterequeststatus_result');
export const md_canceltriprequestorder_result = createAction('md_canceltriprequestorder_result');
