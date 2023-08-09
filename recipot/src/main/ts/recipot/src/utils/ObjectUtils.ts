export function omitNull(obj: any): any {
  Object.keys(obj).filter(k => obj[k] === null).forEach(k => delete (obj[k]))
  return obj
}

export function initAs<T>(initValue?: any): T {
  return initValue || null;
}

export function initFcn<T>(): (parameter: T) => any {
  return (parameter: T) => null;
}