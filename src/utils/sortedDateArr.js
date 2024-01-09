const sortedArr = (arr) => {
  let roomsSorted = arr;
  roomsSorted.sort((a,b) => {
    let t1 = Date.parse(a.lastTimestamp);
    let t2 = Date.parse(b.lastTimestamp);
    return t2-t1;
  })
  return roomsSorted;
}

export default sortedArr;