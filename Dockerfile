FROM python:3.11-slim
WORKDIR /app
ENV PYTHONUNBUFFERED=1
COPY . /app
EXPOSE 8000
CMD ["python3", "dev_server.py", "8000"]
