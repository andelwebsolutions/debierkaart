# De bierkaart

## Introduction
Deierkaart.nl is a website that allows visitors to find beer breweries in their area.

### Installation
Install all dependencies by running
```bash
composer install
npm install
```

and build the application by running
```bash
npm run build
```

### Database seeding
A JSON file was provided containing the data of some breweries. To automatically add these breweries to your database you can run the following command:
```bash
php bin/console app:seed-breweries
```
