# Usa una imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm cache clean --force
RUN npm install --legacy-peer-deps



# Copia el resto del código de la aplicación
COPY . .

# Construye tanto la aplicación Angular como la de NestJS
RUN npx nx build mifiware-tfm --base-href /mifiware-tfm/ --configuration=dev && npx nx build api --base-href /api/ --configuration=dev

# Expone los puertos en los que corren los servidores de Angular y NestJS
EXPOSE 4600 3000

# Comando para arrancar los servidores de Angular y NestJS
CMD ["npm", "run", "start:all"]
