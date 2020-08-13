# tsl.leaderboard

The Strenuous Life: Leaderboard for Class 052

## Data Capture

The webpage is built using a call to the The Strenuous Life API. To access the data, a secret named `TSL_COOKIE` has to be added to the repository. To generate the `TSL_COOKIE`,
copy the **cookie** request header from any request to `https://strenuouslife.co/wp-admin/admin-ajax.php`.

To run in development, create a `.env` file in the root of the project with a `TSL_COOKIE` value.

## Continuous Integration

A [GitHub action](https://docs.github.com/en/actions) manages publishing to a [GitHub Pages](https://pages.github.com/) webpage.
