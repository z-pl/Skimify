FROM python:3.10
EXPOSE 80
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt
COPY . .
CMD ["python3", "-m", "gunicorn", "--bind", "0.0.0.0:80", "--timeout", "80", "app:create_app()"]
