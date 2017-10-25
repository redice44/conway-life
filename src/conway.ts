export enum CONWAY_STATE {
  DEAD = 0,
  ALIVE
}

export interface Conway {
  state: CONWAY_STATE,
  neighbors: number[]
}