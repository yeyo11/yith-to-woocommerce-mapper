# Yith to WooCommerce Subscriptions Mapping Project

This project is a tool that allows you to import subscriptions exported from the Yith plugin into a format compatible with the WooCommerce Subscriptions import plugin.

## Description

The [Yith WooCommerce Subscription](https://yithemes.com/themes/plugins/yith-woocommerce-subscription/) plugin is an excellent solution for managing subscriptions on your WooCommerce store. However, migrating subscriptions from another system or platform to WooCommerce can be challenging.

This Node.js project provides a solution to this problem by reading a CSV file containing subscriptions exported from the Yith plugin and mapping them to a format compatible with the [WooCommerce Subscriptions import plugin](https://github.com/woocommerce/woocommerce-subscriptions-importer-exporter).

## Features

- Reads CSV files exported from Yith WooCommerce Subscription.
- Performs mapping of data to make it compatible with the WooCommerce Subscriptions import format.
- Facilitates the migration of subscriptions from Yith to WooCommerce without data loss.

## Requirements

- Node.js
- The following environment variables are required:

  - `STRIPE_API_KEY='sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'`
  - `DB_HOST='localhost'`
  - `DB_PORT=3306`
  - `DB_DATABASE='database'`
  - `DB_USER='user'`
  - `DB_PASSWORD='password'`
  - `WOOCOMMERCE_SUBSCRIPTIONS_CSV_NAME='WooCommerce_Subscriptions.csv'`
  - `YITH_SUBSCRIPTIONS_CSV_NAME='Yith_Subscriptions.csv'`

## Usage

1. Make sure you have Node.js installed on your system.
2. Clone this repository or download the source code.
3. Place the CSV file exported from Yith in the project folder.
4. Install the dependencies: `npm install`
5. Run the mapping script: `npm run start`
6. The script will generate a CSV file compatible with WooCommerce Subscriptions in the same folder.

## Contributions

Contributions are welcome! If you want to improve this Node.js project, feel free to submit pull requests.

## License

This project is distributed under the [MIT License](LICENSE).

Thank you for using our Yith to WooCommerce subscriptions mapping tool!
