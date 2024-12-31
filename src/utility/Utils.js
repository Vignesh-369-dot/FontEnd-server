export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

export const isValidArray = (val) => Array.isArray(val) && val.length > 0;

export const isValidObject = (val) =>
  !Array.isArray(val) && typeof val === "object" && !!val;

export const isValidString = (val) => typeof val === "string" && val.length > 0;
