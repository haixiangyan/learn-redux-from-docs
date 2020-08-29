/// <reference types="react-scripts" />

type TTodo = {
  text: string;
  state: TFilter;
}

type TFilter = 'done' | 'todo' | 'all'

type TStore = {
  todos: TTodo[];
  filter: TFilter;
}
