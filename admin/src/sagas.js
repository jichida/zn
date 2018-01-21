import customSaga from './customSaga';
import buscarpoolcopyrecordSaga from './components/pinche/mycopybuttonsaga';
import reviewSaga0 from './components/userdrivers/saga';
import singleDoucmentPageSaga from './components/singledocumentpage/saga.js';
import statPlatformSaga from './components/platform/stat/saga.js';

export default [
    statPlatformSaga,
    singleDoucmentPageSaga,
    buscarpoolcopyrecordSaga,
    reviewSaga0
];
