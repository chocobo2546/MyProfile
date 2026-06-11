// import type {
//   Npc,
// } from "../types/game.types";

// export const getNearbyNpc = (
//   playerX: number,
//   playerY: number,
//   playerWidth: number,
//   playerHeight: number,
//   npcs: Npc[]
// ) => {
//   for (const npc of npcs) {
//     const hit =
//       playerX + playerWidth > npc.x &&
//       playerX < npc.x + npc.width &&
//       playerY + playerHeight > npc.y &&
//       playerY < npc.y + npc.height;

//     if (hit) {
//       return npc;
//     }
//   }

//   return null;
// };