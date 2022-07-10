import { formatThousandSeparator } from '@/utils/formatter';
import { OrderModel } from '@/models/OrderModel';

export const generateOrders = (data: any): OrderModel[] =>
  data.map((item: any) => ({
    quote: item[0],
    size: parseInt(item[1]),
    sizeDiff: 'none',
    total: 0,
    type: 'snapshot',
  }));

export const mutateOrders = (updateData: any, data: OrderModel[]): OrderModel[] => {
  if (updateData.length > 0) {
    updateData.forEach((item: any) => {
      const price = item[0];
      const size = parseInt(item[1]);

      const quoteIndex = data.findIndex((d: OrderModel) => d.quote === price);

      if (quoteIndex >= 0) {
        data[quoteIndex].type = 'update';
        data[quoteIndex].sizeDiff =
          size === 0 ? 'none' : data[quoteIndex].size > size ? 'decrease' : 'increase';
        data[quoteIndex].size = size;
      } else {
        data.push({
          quote: price,
          size,
          sizeDiff: 'none',
          total: 0,
          type: 'new',
        });
      }
    });
  }

  return data;
};

export const accumulateLastQuotes = (
  data: OrderModel[],
  length: number = 8,
  orderBy: string = 'asc',
): OrderModel[] => {
  data = data.filter((d: OrderModel) => d.size !== 0);
  data = data.sort((a: OrderModel, b: OrderModel) => (a.quote > b.quote ? -1 : 1)).slice(0, length);
  let sum = 0;
  let i = 0;

  while (i < data.length) {
    sum += orderBy === 'asc' ? data[i].size : data[data.length - i - 1].size;
    data[orderBy === 'asc' ? i : data.length - i - 1].total = sum;
    i++;
  }

  // data = data.map((item: OrderModel) => {
  //   return {
  //     ...item,
  //     quote: formatThousandSeparator(parseInt(item.quote)),
  //     size: formatThousandSeparator(item.size),
  //     total: formatThousandSeparator(item.total),
  //   };
  // });

  return data;
};
