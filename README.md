# Climate Games Database

## IGDA Climate SIG

### Installation

#### Configuration

Fields that are required in your `.env` or in a deploy's secrets are:

[Google Cloud API Service Account](https://console.cloud.google.com/apis/credentials?folder=&organizationId=&project=climate-games-database) credentials with Sheets API enabled

- **GOOGLE_SHEETS_CLIENT_EMAIL**
- **GOOGLE_SHEETS_PRIVATE_KEY**

Our [Climate Games Database](https://docs.google.com/spreadsheets/d/1qdGB8W5FOUQKS_hlhHSInHqFZX75Ok2VXk-rURVFHBA/edit#gid=835115957)

- **SPREADSHEET_ID**

[Rollbar](https://rollbar.com/yoiang/climate_games_database/?environment=) credentials

- **API_ROLLBAR_ACCESS_TOKEN**

Fields that are required in your `next.config.js` or in a deploy's secret `next.config.js` are:

[Rollbar](https://rollbar.com/yoiang/climate_games_database/?environment=) credentials

- **FRONTEND_ROLLBAR_ACCESS_TOKEN**

### Maintanance

We use [Rollbar](https://rollbar.com/yoiang/climate_games_database/?environment=) for error reporting, please talk to a member of the website team (such as [@yoiang](github.com/yoiang)) if you need access!
