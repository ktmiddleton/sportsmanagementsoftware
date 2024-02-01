# Start your image with a python base image
FROM python:3.12

# Show any output straight to terminal
ENV PYTHONUNBUFFERED=1

# RUN apt-get update \
# 	&& apt-get install -y --no-install-recommends \
# 		postgresql-client \
# 	&& rm -rf /var/lib/apt/lists/*

# The /backend directory should act as the main application directory
WORKDIR /usr/src/backend
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]