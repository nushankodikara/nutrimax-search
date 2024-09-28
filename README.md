# BETH Stack Project
- B for Bun
- E for Elysia
- T for Turso
- H for HTMX

## Project Description
This project is a simple CRUD application that allows users to search and track their daily caloric intake using the USDA FoodData Central API. Users can search for food items, add them to their daily intake, and view their daily intake. The project uses the BETH stack, which includes Bun, Elysia, Turso, and HTMX. As an ORM, this application uses Drizzle. JWT is used for authentication.

## Docker Container
Publicly available on Docker Hub: [nutrimax-search](https://hub.docker.com/r/nushankodi/nutrimax-search)

To run the application, use the following command:
```bash
$ docker run -d -p 3000:3000 nushankodi/nutrimax-search:latest \
    -e USDA_API_KEY=<your-usda-api-key> \
    -e DB_URL=<your-db-url> \
    -e DB_AUTH_TOKEN=<your-db-auth-token> \
    -e SALT_ROUNDS=<your-salt-rounds> \
    -e JWT_SECRET=<your-jwt-secret>
```

-OR-

clone the repo and run through docker compose:

### Clone the repo
```bash
$ git clone https://github.com/nushankodi/nutrimax-search.git
```

### Run through docker compose
```bash
$ docker compose up -d
```

## Project Features
- [x] Search for food items
- [x] View food items
- [x] Sign up for an account
- [x] Log in to an account
- [ ] Log out of an account
- [ ] Delete an account
- [ ] Profile page
- [ ] Edit profile
- [ ] Change password
- [ ] Forgot password
- [ ] Landing Page
- [x] Overview Dashboard
- [x] Search for food items
- [x] View food items
- [ ] Add food items to daily intake
- [ ] View daily intake
- [ ] Delete food items from daily intake
- [ ] App Tour
