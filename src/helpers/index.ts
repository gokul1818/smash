export const utf8ToBase64 = (str: any) => {
  return btoa(unescape(encodeURIComponent(str)));
};
export const base64ToUtf8 = (base64Str: any) => {
  return decodeURIComponent(escape(atob(base64Str)));
};
