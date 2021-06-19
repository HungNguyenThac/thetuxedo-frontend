export const themDauChamVaoGiaTien = (gia) => {
  const stringGia = gia.toString();
  const arrayGia = [];
  let Gia = "";
  for (let i = 0; i < stringGia.length / 3; i++) {
    if (stringGia.length - 3 * (i + 1) > 0) {
      arrayGia.push(
        stringGia.slice(
          stringGia.length - 3 * (i + 1),
          stringGia.length - 3 * i
        )
      );
    } else {
      arrayGia.push(stringGia.slice(0, stringGia.length - 3 * i));
    }
  }
  Gia = arrayGia.reverse().join(".");
  return Gia;
};
