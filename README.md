# Technical Test - Readme

## 1. Local Development Guideline

### Prerequisites

- `Docker` & `Docker Compose`
- NodeJS (v10 or above), `npm` and `yarn`
- `Makefile`

### Setup Local Development Environment

1. Clone the project to local machine and go to the folder

```
git clone https://github.com/DaiThanh97/nft5.git
cd nft5
```

2. Run `make bootstrap` cli to bootstrap all the application

**OR**

1. Start local DB with Docker-CLI (Can change env values if you want)

```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=123123 -e MYSQL_DATABASE=media -p 3306:3306 -d mysql
```

2. Run the back-end in development mode (live-reload support). Change `.env.example` to `.env` to bootstrap correctly.

```
cd media-scraper-api && yarn start:dev
```

3. Run the front-end in development mode (live-reload support). Change `.env.example` to `.env` to bootstrap correctly.

```
cd media-scraper-ui && yarn start
```

4. The app should be accessible at http://localhost:3000. The API can be accessed at http://localhost:4000. **(Swagger UI for Documentation)**

**NOTE**: The local DB will use port **3306**. If the port is being used, please change it to a different port in `docker-compose.yml` and `media-scraper-api/.env.example`

**SAMPLE DATA FOR SHARING (FRONT-END)** :
`If you want to share multiple urls please add ';' between those url to separate them`.

```
https://www.youtube.com/watch?v=TLysAkFM4cA;
https://www.youtube.com/watch?v=5Q2Pc-e-8Qc;
https://www.youtube.com/watch?v=P8kFrqRMXQM;
https://www.youtube.com/watch?v=hhFl-ZMQHtA;
https://www.youtube.com/watch?v=DtLODDVegns;
```

<image src="./imgs/swagger-img.png" />
<image src="./imgs/app.png" />

### Useful commands

1. If you want to reset client or server separately, go to `media-scraper-ui`, `media-scraper-api` folders and run `yarn start`, `yarn start:dev` in each folder.
2. Back-end: To update schema, just update the model directly, then run `yarn typeorm:generate -n *MigrationName*`. The model will be generated automatically (See [TypeORM Migration](https://typeorm.io/#/migrations)).
3. Back-end: Run `yarn typeorm:run` to run the migration.

## 2. Other Notes

### What I have completed

### 1. Functionalities

<p align="center">
  <image src="./imgs/dbdesign.png"/>
</p>

1. Login: Feature to log user in when existed
2. Sign Up: Register user into the system, using JWT for authentication
3. Get videos: Get all videos that have been shared with `pagination and search filter`.
4. Share videos: Share youtube videos which receives array of youtube video urls `(Only logged in user can shared)`.

### 2. Others

1. Local Development Setup script (1 line setup with Docker)
2. Document with Swagger

### What can be improved

1. More unit tests for `back-end`.
2. Write some end-to-end tests.
3. Real-time sync for Main Page when new videos are being shared using `socket.io`.
4. We can create 1 more branch called `releases`. The CI should support deploying the app when code is merged to this branch.
