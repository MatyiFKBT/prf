# PRF Beadandó projekt

## Feladat

A feladat egy Full-Stack webalkalmazás elkészítése.

Használt technológiák:

- Backend: TypeScript, Node.js, Express.js, MongoDB (Mongoose)
- Frontend: TypeScript, Angular.js, Material Design

## Követelmények

### Backend (45 pont)

| Követelmény                                                                                                  | Megvalósítás | Pont |
| ------------------------------------------------------------------------------------------------------------ | ------------ | ---- |
| A backend statikusan hostolja a frontendet                                                                   |              | 5    |
| Az alkalmazás kapcsolódik egy mongodb instance-hoz                                                           |              | 2,5  |
| Az alkalmazás képes bootstrappelni, vagyis MongoDB-t alap userekkel feltölteni                               |              | 5    |
| A szerver megvalósít legalább két modellt, melyek sémája egyértelműen definiált                              |              | 5    |
| Adott legalább két olyan adatbázis hook, amelyek a modellek mentése vagy lekérése közben futnak le           |              | 5    |
| A szerver megvalósít egy lokális autentikációs stratégiát                                                    |              | 7,5  |
| A szerver kezeli a login sessiont                                                                            |              | 7,5  |
| A szerver rendelkezik a két kezelt modell CRUD interfészeivel, illetve egy login, logout, register route-tal |              | 7,5  |

### Frontend (45 pont)

| Követelmény                                                                                                                                                                                              | Megvalósítás | Pont |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---- |
| A frontend kommunikál a backenddel                                                                                                                                                                       |              | 6    |
| A frontend komponensei route-okkal érhetőek el, a navigáció megfelelően működik                                                                                                                          |              | 6    |
| A frontend rendelkezik legalább egy regisztráció, egy login, egy főoldal/terméklista, egy admin felület, egy termék részletező és egy egyéb komponenssel, melyek fel vannak töltve megfelelő tartalommal |              | 12   |
| A frontend a bejelentkezéshez a backend megfelelő végpontjait szólítja meg                                                                                                                               |              | 6    |
| A backenddel való kommunikáció elemei ki vannak szervezve service-ekbe                                                                                                                                   |              | 6    |
| Van authguard, amely védi a login, register utáni route-okat és az admin felületét                                                                                                                       |              | 9    |

### Dokumentáció (10 pont)

| Követelmény                                                                                                                                  | Megvalósítás | Pont |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---- |
| Tartalmazza a fejlesztési naplót, mely logokkal bemutatja a fejlesztés menetét                                                               |              | 2    |
| Mindkét komponens létrejött és nem csak órai kódok másolata / üres template, a logokból és a forráskódokból is látszódik a befektetett munka |              | 6    |
| Vannak képernyőképek és leírások, a dokumentációból egyértelmű a projekt célja, működése és használata                                       |              | 2    |


## Fejlesztési napló

### Backend


### Frontend

- Első lépésként létrehoztam a projektet.
- A frontend projektben futtatott `build` parancs segítségével létrehoztam a backend `public` mappáját, amelybe a frontend buildelt verziója kerül.
- Hozzáadtam az `@angular/material` csomagot, amely a Material Design komponenseket tartalmazza.