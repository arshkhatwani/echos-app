install-requirements:
	pip install -r requirements.txt

freeze-requirements:
	pip freeze > requirements.txt

start-local-dev:
	PYTHONPATH=. fastapi dev run.py

lint:
	ruff check . --fix

format:
	ruff format .

type-check:
	mypy .
