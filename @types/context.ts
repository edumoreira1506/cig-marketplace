export type ActionType<ActionGenerators extends { [key: string]: (...args: any[]) => any }> = ReturnType<
  ActionGenerators[keyof ActionGenerators]
>;
