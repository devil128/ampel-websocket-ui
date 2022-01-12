[![Docker Image CI](https://github.com/devil128/ampel-websocket-ui/actions/workflows/docker-image.yml/badge.svg?branch=main)](https://github.com/devil128/ampel-websocket-ui/actions/workflows/docker-image.yml)

# AmpelGraphqlWebsite

## Frontend
Enthält Source Code für Ampel UI Frontend. Für Development Zwecke kann der Code lokal gestartet und getestet werden. Für das deployment wird mithilfe von Github CI 
ein Dockerimage aus der Dockerfile erstellt. Die Dockerfile wird daraufhin in den Kubernetes Cluster deployt. Hierfür werden die Files aus dem kubernetes Ordner genutzt.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## CI / CD
Nach einem Deployment wird automatisch eine Instanz dieser App generiert und unter der URL ``ampel-tracker.projectdw.de`` verfügbar gemacht.

## GraphQL 
Um den GraphQL Endpoint zu ändern muss in der File ``graphql.module.ts`` die URI geändert werden. Standardmäßig ist die URI ``https://ampel.projectdw.de/graphql`` definiert.

