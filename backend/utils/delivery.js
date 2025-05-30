export function calculateEstimatedDelivery(orderDate = new Date(), daysToAdd = 3) {
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
  return deliveryDate;
}