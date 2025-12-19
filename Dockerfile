FROM node:18-bullseye-slim

# Install Python3 and system deps required by Chromium (Puppeteer)
RUN apt-get update && apt-get install -y --no-install-recommends \
	python3 \
	python3-pip \
	ca-certificates \
	fonts-liberation \
	libnss3 \
	libatk1.0-0 \
	libatk-bridge2.0-0 \
	libcups2 \
	libx11-xcb1 \
	libxcomposite1 \
	libxdamage1 \
	libxrandr2 \
	libgbm1 \
	libasound2 \
	libgtk-3-0 \
	libxss1 \
	libpangocairo-1.0-0 \
	libpango-1.0-0 \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json* ./

# Install node dev deps (includes puppeteer)
RUN npm install --no-audit --no-fund

# Copy rest of the app
COPY . /app

EXPOSE 8000
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=0
CMD ["python3", "dev_server.py", "8000"]
