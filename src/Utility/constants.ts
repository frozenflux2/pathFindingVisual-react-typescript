/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
export const ALGORITHM = {
  DIJKSTRA: "Dijkstra",
  BFS: "Bfs",
  DFS: "Dfs",
};
export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export class DefaultValues {
  static DefaultRows: number = 13;
  static DefaultColumns: number = 35;
  static DEFAULT_START = [6, 5];
  static DEFAULT_END = [6, 29];

  static setRoworColumn(value: number, type: string) {
    if (type === "rows") DefaultValues.DefaultRows = value;
    if (type === "columns") DefaultValues.DefaultColumns = value;
  }

  static setStartOrEnd(value: Array<number>, type: string) {
    if (type === "start") DefaultValues.DEFAULT_START = value;
    if (type === "end") DefaultValues.DEFAULT_END = value;
  }
}
