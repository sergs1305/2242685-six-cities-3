import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

const REDIRECT_TYPE = 'redirectToRoute';

export const redirect: Middleware<unknown, Reducer> =
   () =>
     (next) =>
       (action: PayloadAction<string>) => {
         if (action.type === REDIRECT_TYPE) {
           browserHistory.push(action.payload);
         }

         return next(action);
       };
