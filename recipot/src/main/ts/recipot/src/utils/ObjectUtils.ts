export function omitNull(obj:any) :any {
    Object.keys(obj).filter(k => obj[k] === null).forEach(k => delete(obj[k]))
    return obj
  }