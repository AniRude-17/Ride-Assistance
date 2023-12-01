import mysql.connector;

db = mysql.connector.connect(
    host="localhost",
    user='root',
    password="password",
    database="assist"
)


cursor=db.cursor()

# ADD ENTRIES INTO USER TRAVLER

q='insert into travler(travler_name) values(%s);'
values=('Raj',)
cursor.execute(q,values)
db.commit()



