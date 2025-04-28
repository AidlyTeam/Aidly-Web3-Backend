.PHONY: help dev dev-build prod prod-build

dev:
	@echo "[i] Project is starting in development mode...\n"
	@docker compose -f ./deployment/dev.docker-compose.yml up 

dev-build:
	@echo "[i] Building project in development mode...\n"
	@docker compose -f ./deployment/dev.docker-compose.yml up --build 

prod:
	@echo "[i] Project is starting in production mode...\n"
	@docker compose -f ./deployment/prod.docker-compose.yml up -d

prod-build:
	@echo "[i] Building project in production mode...\n"
	@docker compose -f ./deployment/prod.docker-compose.yml up --build -d

help:
	@echo "[i] Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  dev         Start project in development mode"
	@echo "  dev-build   Build project in development mode"
	@echo "  prod        Start project in production mode"
	@echo "  prod-build  Build project in production mode"
	@echo "  help        Show this help"