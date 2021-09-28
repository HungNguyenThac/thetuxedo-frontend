const convertListAnhtoArray = (list) => {
  const listAnhLength = list.length;
  let newArray = [];
  for (let i = 0; i < listAnhLength; i++) {
    let object = {
      id: i,
      url: list[i],
    };
    newArray.push(object);
  }
  return newArray;
};

export default convertListAnhtoArray;
