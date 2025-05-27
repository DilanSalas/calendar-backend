# Usa la imagen oficial de Node.js con Alpine para una imagen ligera
FROM node:20-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --production

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto que utiliza la aplicación (ajusta si usas otro)
EXPOSE 4000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "start"]
