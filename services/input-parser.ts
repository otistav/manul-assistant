type InputParams = {
  actionName: string;
  dash: '-';
  params: string[];
}
// eslint-disable-next-line import/prefer-default-export
export const parseInput = ([actionName, dash, ...params]): InputParams => ({ actionName, dash, params });
