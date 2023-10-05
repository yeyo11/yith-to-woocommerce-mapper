import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { HEADERS_YITH } from '../constants/index.js';

export const buildCsvService = () => {
  const filesDir = `${path.dirname(
    new URL(import.meta.url).pathname
  )}/../../subscriptions`;

  const getColumnValue = (value) => {
    if (!value) return '';
    const number = Number(value);
    if (!isNaN(number)) return number;
    return value.replace(/"/g, '');
  };

  const readCsv = async () => {
    const yithSubscriptionsPath = path.join(
      filesDir,
      process.env.YITH_SUBSCRIPTIONS_CSV_NAME
    );
    const data = await fs.promises.readFile(yithSubscriptionsPath, 'utf-8');
    const rows = data.split('\n');
    return rows.map((row) => {
      const columns = row.split(';');
      return HEADERS_YITH.reduce((acc, header, index) => {
        acc[header] = getColumnValue(columns[index]);
        return acc;
      }, {});
    });
  };

  const generateCsv = async (data) => {
    const wooCommerceSubscriptionsPath = path.join(
      filesDir,
      process.env.WOOCOMMERCE_SUBSCRIPTIONS_CSV_NAME
    );
    const csv = Papa.unparse(data, {
      header: true,
      delimiter: ',',
    });
    fs.writeFileSync(wooCommerceSubscriptionsPath, csv, 'utf-8');
  };

  return {
    readCsv,
    generateCsv,
  };
};
