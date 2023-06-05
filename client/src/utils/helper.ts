import dayjs from "dayjs";
import "dayjs/locale/sv";

export const deliveryDate = (hours: number) => {
  //const todaysDate = new Date();

  const currentHour = dayjs().hour();
  if (currentHour > 17) hours += 24;
  return dayjs().locale("sv").add(hours, "hour").format("D MMMM");
};

export const calcOrderTotal = (
  productPrice: () => number,
  shippingPrice: number
) => {
  return productPrice() + shippingPrice;
};
