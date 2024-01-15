# Use an official Python runtime as a parent image
FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

RUN pip install --upgrade pip

COPY ./requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]

# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]