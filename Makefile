install-requirements:
	pip install -r requirements.txt

freeze-requirements:
	pip freeze > requirements.txt

start-local-dev:
	PYTHONPATH=. fastapi dev run.py

lint:
	ruff check --fix **/

format:
	ruff format **/

type-check:
	mypy .

quality-check:
	make lint
	make format
	make type-check

create-model:
	PYTHONPATH=. python app/services/ai/ollama/create_model.py
