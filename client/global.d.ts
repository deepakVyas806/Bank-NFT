declare module '*.js' {
  const content: any;
  export default content;
}

declare module '*.jsx' {
  const content: any;
  export default content;
}
// global.d.ts
interface Window {
  Razorpay: any;
}
