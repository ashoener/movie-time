# Movie Time
![License Badge](https://img.shields.io/badge/license-MIT-green)  

## Description

Movie Time is an application designed for movie lovers. Users will be able to enter the site and log in. They will be able to see timelines of movies, based on the release date, and they can filter it by year and genre in order to see the timelines. Users will also be able to save the movies they want to their "watchlist" if interested.


## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation

To install Movie Time, you must first clone the repository.
```bash
git clone https://github.com/ashoener/movie-time.git
cd movie-time
```

Afterwards, run the following command:
```bash
npm install
```

Once everything is installed, you need to specify what database to connect to. Rename the `.env.example` file to `.env`, and fill in the connection information. Remove the SESSION_SECRET line if you wish to generate a random secret every time the application is started.

Next, download the movie dataset from [this page](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies). Make sure the file is called `TMDB_movie_dataset_v11.csv` and is located in the same directory as your `.env` file.

Run the following command to parse the dataset and import it in to your database:
```bash
npm run parse
```


## Usage

Once everything is connected, you may run npm run start to start up the server.


## How to Contribute

If you would like to contribute, create a pull request. Be sure to include information about what your changes do.


## Tests

Currently, there are no tests included with this project. They may be created in the future.


## Questions

If you have any questions, you may contact me via [GitHub](ashoener) or by [email](mailto:a.b.shoener@gmail.com).

## License

This project is covered under the MIT license. You may view it [here](/LICENSE).

