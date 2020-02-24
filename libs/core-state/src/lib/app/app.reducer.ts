import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { addLoad, appInit, removeLoad } from './app.actions';
import { AppState } from '../index';

export interface IAppState {
  initialized: boolean;
  loads: string[];
}

const initialState: IAppState = {
  initialized: false,
  loads: []
};

const reducer = createReducer(
  initialState,
  on(appInit, (state) => ({
    ...state,
    initialized: true,
  })),
  on(addLoad, (state, {type, loadId}) => ({
    ...state,
    loads: [...state.loads, loadId]
  })),
  on(removeLoad, (state, {type, loadId}) => ({
    ...state,
    loads: state.loads.filter(x => x !== loadId)
  }))
);

export function appReducer(state = initialState, action: Action): IAppState {
  return reducer(state, action);
}

export const getAppState = (state: AppState) => state.app;
export const mapToIsInitialized = (state: IAppState) => state.initialized === true;
export const mapToIsLoading = (state: IAppState) => !!state.loads.length;

export const isLoading = createSelector(
  getAppState,
  mapToIsLoading
);

export const isInitialized = createSelector(
  getAppState,
  mapToIsInitialized
);
