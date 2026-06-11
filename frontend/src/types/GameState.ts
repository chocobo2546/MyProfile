export interface PlayerState {
  x: number;
  y: number;
  velocityY: number;
  isGrounded: boolean;
}

export interface RenderState {
  x: number;
  y: number;
}

export type WorldId =
  | "lava-world"
  | "ice-world";