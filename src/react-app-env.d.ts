/// <reference types="react-scripts" />

type TTodo = {
  id: string;
  text: string;
  state: TFilter;
}

type TFilter = 'done' | 'todo' | 'all'

type TLoading = {
  status: boolean;
  tip: string;
}

type TStore = {
  todos: TTodo[];
  filter: TFilter;
  loading: TLoading;
}
