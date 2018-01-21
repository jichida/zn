export const STATONE = 'STATONE';
export const STATONE_LOADING = 'STATONE_LOADING';
export const STATONE_FAILURE = 'STATONE_FAILURE';
export const STATONE_SUCCESS = 'STATONE_SUCCESS';

export const statOneAction = (values,dispatch) =>{
  console.log(`findOneAction==>${JSON.stringify(values)}`);
  dispatch({type:STATONE,payload:values});
}
