Generic single-database configuration with an async dbapi.

To create a revision:

```bash
alembic revision --autogenerate -m "Add some feature"
```

To upgrade to the latest revision:

```bash
alembic upgrade head
```
