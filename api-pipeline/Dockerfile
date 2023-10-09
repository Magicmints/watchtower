# Use an official Python runtime as the parent image
FROM python:3.8-slim-buster

# Set the working directory in the docker image
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .


# Create and activate a virtual environment
RUN python -m venv venv
ENV VIRTUAL_ENV=/usr/src/app/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Define environment variable for FastAPI to run in production mode
ENV UVICORN_HOST=0.0.0.0 UVICORN_PORT=8000

# Run `uvicorn` when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
