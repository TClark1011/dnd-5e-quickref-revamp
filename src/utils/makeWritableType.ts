const makeWritableType = <T>(val: readonly T[]) => val as T[];

export default makeWritableType;
