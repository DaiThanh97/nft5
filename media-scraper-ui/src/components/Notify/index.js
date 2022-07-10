import React, { Fragment, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { STATUS_CODE } from '../../configs/constant';

export default function Notify() {
    const { enqueueSnackbar } = useSnackbar();
    const { noti } = useSelector(state => state.notiReducer);

    useEffect(() => {
        const { status, message } = noti;
        if (status !== 0) {
            let variant = 'error';
            if (status === STATUS_CODE.SUCCESS || status === STATUS_CODE.CREATED) {
                variant = 'success';
            }
            else {
                variant = 'error';
            }
            enqueueSnackbar(message, { variant });
        }
    }, [noti, enqueueSnackbar]);

    return (
        <Fragment>
        </Fragment>
    );
}