/// <reference types="react-scripts" />

type TTodo = {
  id: string;
  text: string;
  state: TFilter;
}

type TTodoEntities = {[key: string]: TTodo};

type TTodoStore = {
  ids: string[];
  entities: TTodoEntities;
}

type TFilter = 'done' | 'todo' | 'all'

type TLoading = {
  status: boolean;
  tip: string;
}

type TStore = {
  todos: TTodoStore;
  filter: TFilter;
  loading: TLoading;
}
