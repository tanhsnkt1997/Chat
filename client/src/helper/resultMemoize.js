import { createSelectorCreator } from "reselect";
import { shallowEqualArrays, shallowEqualObjects } from "shallow-equal";

const resultMemoize = (func) => {
  let lastArgs = null;
  let lastResult = null;

  return (...args) => {
    if (!shallowEqualArrays(lastArgs, args)) {
      // faster with apply, this might get called a lot
      // https://medium.com/@pouyae/what-is-the-es6-spread-operator-and-why-you-shouldnt-use-it-57c056078ed9
      // eslint-disable-next-line prefer-spread
      const nextResult = func.apply(null, args);
      if (Array.isArray(nextResult) && shallowEqualArrays(nextResult, lastResult)) {
        console.log("vao caching array");
        // keep the last result
      } else if (typeof nextResult === "object" && shallowEqualObjects(nextResult, lastResult)) {
        console.log("vao caching object");
        // keep the last result
      } else {
        lastResult = nextResult;
      }
    }

    lastArgs = args;
    return lastResult;
  };
};

export default createSelectorCreator(resultMemoize);
