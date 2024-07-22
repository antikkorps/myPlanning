# myPlanning

## Description

This is a family management tool in order to ease life. You can create tasks, add notifications, and furthermore to manage your family life.

## Installation Instructions

1. Clone the repository
2. run

```bash
docker compose up -d
```

if you encounter a port error on the compose up, you can use the following command

```bash
sudo systemctl restart docker
```

3. run

```bash
npx prisma db push
```

## generate a secret key

```bash
openssl rand -base64 24
```
