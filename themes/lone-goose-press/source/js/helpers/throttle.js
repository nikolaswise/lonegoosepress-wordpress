/**
 * A throttle execution of a function that fires a message
 * every 250ms by default
 *
 * https://remysharp.com/2010/07/21/throttling-function-calls
 */

export default function (fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  let last,
      deferTimer;
  return function () {
    const context = scope || this;

    const now = +new Date,
          args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        let last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      let last = now;
      fn.apply(context, args);
    }
  };
}
