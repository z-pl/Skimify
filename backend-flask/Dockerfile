FROM python:3.10.4
EXPOSE 80
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .
ENV DB_URL=${DB_URL}
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:80", "app:create_app()"]
