If you have any inquiries about this repository or the Domain Platzhalter.io, please contact the compose.us team. This repository is not maintained right now.

# The problem 🤯

Sporteln, Essen gehen, in den Urlaub fahren, Ausflüge machen und generell unter Menschen sein - das erfordert aktuell alles etwas mehr Planung. Das Ganze muss außerdem unter Wahrung des Datenschutzes stattfinden.

platzhalter.io wurde von uns erstellt um Gewerbetreibenden und Kommunen dabei zu helfen, die neue Realität zu bewältigen.

# The solution 💡

Anwendungsfall - Gastronomie
Sie haben bereits ein funktionierendes Buchungssystem, aber Sie müssen Personendaten fürs Gesundheitsamt vorhalten. Sie erledigen das aktuell mit Zettel und Stift. Das ist unangenehm für Ihre Besucher und für Sie.

Bieten Sie einfach die kostenlose, datensparsame digitale Gästeliste von platzhalter.io an. Die Personendaten werden vier Wochen vorgehalten und dann automatisch gelöscht.

Anwendungsfall - Camping Platz
Sie haben bereits ein funktionierendes Buchungssystem, aber Sie müssen Personendaten fürs Gesundheitsamt vorhalten. Außerdem ist Ihr Platz aktuell sehr gefragt - Sie müssen ständig am Telefon sein. Vor Ihrem Platz herrscht das Chaos weil dieses Jahr der Campingsommer ist.

Tragen Sie ihre Verfügbarkeiten in die Camping Karte von platzhalter.io ein und Ihre Besucher können sich selbst informieren, ob noch Platz ist. Außerdem werden die Personendaten Ihrer Besucher vier Wochen vorgehalten und dann automatisch gelöscht.

Anwendungsfall - öffentliche Stell- und Parkplätze der Kommune
Sie sind eine Kommune, die einen Badesee verwaltet. Dort gibt es nur begrenzt Parkplätze. Es staut sich und Chaos entsteht. Tragen Sie ihre Verfügbarkeiten in die Stellplatz Karte von platzhalter.io ein und Ihre Besucher können sich selbst informieren und sich so einen Alternativplan zurechtlegen. Die Personendaten derer, die kommen können, werden vier Wochen vorgehalten und dann automatisch gelöscht.

Anwendungsfall - Körpernahe Dienstleistungen, zum Beispiel Frisör
Durch die Covid19 Auflagen werden bei Ihnen alle Termine nur noch per Telefon gebucht. Dazu müssen alle personenbezogenen Daten abgefragt werden und bei Nachfrage dem Gesundheitsamt übermittelt werden. Das führt zu Zettelwirtschaft und Koordinations-overhead.

Mit platzhalter.io hinterlegen Sie Ihre Kapazitäten in der Web App. Ihr Besucher wiederum surft auf Ihre Website, gibt seinen Buchungswunsch ein und erhält ein QR Ticket auf sein Mobilgerät. Die Personendaten des Kunden werden - nach seinem Einverständnis - automatisch per Mobilgerät in Ihre Datenbank übertragen. Sollte ein Covid19 Fall auftreten, können Sie per Knopfdruck die Daten an das Gesundheitsamt übermitteln. Die Daten werden nach vier Wochen automatisch gelöscht.

# What it does 🎫

Wie funktioniert das?
Sie brauchen kein Technik-KnowHow. Wer Whatsapp bedienen kann, kann auch die WebApp bedienen. Es ist kein Download nötig - das gilt sowohl für Sie als auch für Ihre Besucher. Ihnen wird von uns eine individuelle Internetadresse (Url) zugewiesen. Diese können Sie dann in Ihre Website einpflegen. Ihr Besucher surft auf diese Url, trägt sich ein und gibt gegebenenfalls noch an wann er kommen möchte. Er oder sie bekommt die von Ihnen hinterlegten Verfügbarkeiten angezeigt. Die Buchung und/oder der Check-in per funktioniert über einen QR Code.

Wie ist das mit dem Datenschutz?
Die WebApp wurde von vornherein datensparsam programmiert - sie fragt nur ab, was unbedingt sein muss. Unser Ziel ist dezentrale Speicherung der Daten. Unser Code ist open source, also einsehbar und weiterverwendbar.

Was kostet das?
Die Basisversion stellen wir kostenfrei zur Verfügung. Wem die WebApp hilft, der kann dafür spenden. Entstanden ist die WebApp weil wir unseren Beitrag zur Erleichterung der Umstände leisten wollen.

Soll die Webapp spezielle Funktionalitäten haben, ist der Preis vernünftig und fallabhängig. Sprechen Sie uns einfach an.

# Technology used 💻

In general Javascript, Typescript

# Team 🧝🏻‍♀️🧝🏻‍♀️🧝🏻🧝🏻

Platzhalter.io is a project started at ITC1's digital hackathon.

- Stefanie Susser, UX/UI & Product Design
- Thomas Bergwinkl, Backend
- Jörn Bernhardt, Frontend
- Kristina Juse, Marketing & Project Management

# Building / setup 🛠

To start the backend server, run:

```
docker-compose up
```

If you need to rebuild the code, run `docker-compose build`.

## Deployment

To initialize the server, run `server-install.sh`. It will setup the (Ubuntu)
server by creating a user to work with and install docker if its not installed
yet.

When running `server-update.sh`, a new version of the docker file will be
built, the image uploaded and the uploaded image loaded into the hosts docker
system. It will then restart the service and run it.

## Development

Running everything in development is possible by using the
`dev-docker-compose.yml` file with `docker-compose`. Open three terminals, run
these commands in them:

1. `docker-compose -f dev-docker-compose.yml up platzhalterio-db`
2. `docker-compose -f dev-docker-compose.yml run --service-ports --rm platzhalterio bash` - runs the
   backend container: In the shell change into the `/app/backend` directory to
   install all necessary packages (`npm ci`). In this directory, `npm start` can
   be used to run the server. If anything in the backend changes, press `CTRL+C`
   to stop it and restart it again with `npm start`.
3. `docker-compose -f dev-docker-compose.yml run --service-ports --rm frontend bash` -
   runs the frontend container: In the shell, have a look into `/app/frontend`
   and run one of the frontend scripts after installing the dependencies
   (`npm ci`). `npm run storybook` starts Storybook and allows you to change the
   various components with hot module reload. `npm run start` starts a
   development server to see changes live in the app. Since the live backend
   will send you the URL of the backend service when selecting a shop, the URL
   might change and as a result changes might not be visible. Use the local URL
   to check this. With `npm run build`, a static version of the page will be
   built and the live backend is going to use that.
