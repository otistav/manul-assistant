type InputParams = {
  actionName: string;
  params: string[];
}
// eslint-disable-next-line import/prefer-default-export
export const parseInput = ([actionName, ...params]): InputParams => ({ actionName, params });
