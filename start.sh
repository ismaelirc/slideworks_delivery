#!/bin/bash

# Cria a rede compartilhada se não existir
NETWORK_NAME="shared-network"

if ! docker network ls --format '{{.Name}}' | grep -q "^${NETWORK_NAME}$"; then
  echo "🔧 Criando a rede Docker: $NETWORK_NAME"
  docker network create $NETWORK_NAME
else
  echo "🌐 Rede Docker '$NETWORK_NAME' já existe."
fi

# Lista de diretórios dos serviços
directories=("establishmentservice" "productservice" "couponservice")

# Subindo os containers em cada diretório
for dir in "${directories[@]}"; do
  echo "🚀 Iniciando docker-compose em ./$dir"
  (
    cd "$dir" && docker compose up -d --build
  )
done

echo "✅ Todos os serviços foram iniciados."

