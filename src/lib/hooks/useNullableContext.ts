import {Context, useContext} from "react";

const useNullableContext = <T>(targetCtx: Context<T | null>): T => {
  const ctx = useContext(targetCtx);
  if (!ctx) throw Error(`Context hasn't been initialised yet [${targetCtx.displayName}]`);
  return ctx;
}

export default useNullableContext;