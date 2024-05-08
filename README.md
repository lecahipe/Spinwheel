Spin the wheel Repo

JS and Django Prototype

<b>To install</b>
After cloning the repository, make sure you are in "Spinwheel" folder
then run:

<code>docker build -t spinwheel .</code>


<b>To start the app (django runserver)</b>

<code>docker run -it -p 8000:8000 spinwheel</code>

then you can go to  http://127.0.0.1:8000/


<b>To run migrations</b>

<code>docker exec -it spinwheel python manage.py migrate</code>

<b>To create other user</b>

<code>docker exec -it spinwheel python manage.py createsuperuser</code>


<b> Links inside the app </b>
<ol>
	<li>Spin the wheel http://127.0.0.1:8000/wheel/spin/</li>
	<li>Django Admin http://127.0.0.1:8000/admin/</li>
	<li>Spin wheel user API:http://127.0.0.1:8000/wheel/spin/create/</li>
</ol>
