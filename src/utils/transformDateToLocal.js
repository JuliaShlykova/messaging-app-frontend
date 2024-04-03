const transforDateToLocal = (str) => {
  let d = new Date(str+' UTC');
  return d.toLocaleString();
}

export default transforDateToLocal;