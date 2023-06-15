import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import { IOrderItem } from '../interfaces/interfaces';

export const deliveryDate = (hours: number) => {
  const currentHour = dayjs().hour();
  if (currentHour > 17) hours += 24;
  return dayjs().locale('sv').add(hours, 'hour').format('D MMMM');
};

export const formatOrderDate = (date: string) => {
  return dayjs(date).locale('sv').format('D MMMM HH:mm');
};

export const formatOrderDay = (date: string) => {
  return dayjs(date).locale('sv').format('DD MMM YYYY');
};

export const calcOrderTotal = (
  productPrice: () => number,
  shippingPrice: number
) => {
  return productPrice() + shippingPrice;
};

export const calcOrderItemTotal = (qty: number, price: number): number => {
  return qty * price;
};

export const calcOrderTotalProducts = (orderItems: IOrderItem[]): number => {
  const initialValue = 0;
  return orderItems.reduce(
    (accumulator, item) => accumulator + item.quantity,
    initialValue
  );
};

export const calcOrderProductTotal = (orderItems: IOrderItem[]): number => {
  const initialValue = 0;
  return orderItems.reduce(
    (accumulator, item) => accumulator + item.price,
    initialValue
  );
};
