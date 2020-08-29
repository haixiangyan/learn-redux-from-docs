/// <reference types="react-scripts" />

type TTodo = {
  id: string;
  text: string;
  state: TFilter;
}

type TFilter = 'done' | 'todo' | 'all'

type TStore = {
  todos: TTodo[];
  filter: TFilter;
  loading: boolean;
}
