import nonStrictEvalUrl from 'file-loader!./eval.js'

importScripts(nonStrictEvalUrl)
declare function nonStrictEval (code: string): any

// Worker.ts
const ctx: Worker = self as any;

// Post data to parent thread
ctx.postMessage(nonStrictEval('b=3; b'));

// Respond to message from parent thread
ctx.addEventListener("message", (event) => console.log(event));
