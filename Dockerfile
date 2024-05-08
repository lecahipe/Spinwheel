FROM python:3.11

WORKDIR Spinwheel

COPY django_spinwheel/requirements.txt django_spinwheel/requirements.txt

RUN pip install --no-cache-dir -r django_spinwheel/requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "django_spinwheel/manage.py", "runserver", "0.0.0.0:8000"]