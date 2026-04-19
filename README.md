# TravelTech MultiCloud

## Descripció

Aplicació web de planificació de viatges basada en una arquitectura de microserveis desplegada en un entorn multi-cloud. Permet cercar informació de països i gestionar dades com favorits, comentaris i països visitats.

---

## Arquitectura

El sistema està format pels següents components:

- Frontend web
- Favorites Service
- Comments Service
- Visited Service

Cada component funciona de manera independent i està desplegat en un operador cloud diferent.

---

## Estructura del projecte

traveltech-multicloud/
├── frontend/
├── favorites-service/
├── comments-service/
└── visited-service/

---

## Tecnologies utilitzades

- Node.js
- Express
- CORS
- Fetch API

---

## API externa

S’utilitza la API REST Countries per obtenir informació dels països:

https://restcountries.com/v3.1/name/{country}

---

## Execució en local

Cada microservei disposa del seu propi fitxer principal (server.js).

Exemple d’execució:

cd favorites-service  
npm install  
npm start  

---

## Endpoints

### Favorites Service
- GET /favorites
- POST /favorites
- DELETE /favorites/:name

### Comments Service
- GET /comments
- GET /comments/:country
- POST /comments

### Visited Service
- GET /visited
- POST /visited
- DELETE /visited/:country

---

## Desplegament

Frontend: https://traveltech-multicloud.netlify.app/  
Favorites Service: https://favorite-services.onrender.com/  
Comments Service: https://traveltech-multicloud.onrender.com/  
Visited Service: https://visited-service.onrender.com/  

---

## Proves

S’han realitzat proves amb Postman i navegador per verificar el funcionament dels endpoints (GET, POST i DELETE).

---

## Dificultats

- Configuració del CORS
- Connexió entre serveis en diferents dominis
- Desplegament en plataformes cloud gratuïtes

---

## Conclusions

El projecte implementa una arquitectura basada en microserveis amb separació de responsabilitats i desplegament independent dels components.
