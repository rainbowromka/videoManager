@echo off
IF exist "D:\Programming\videoManager\database\tmp" ( echo "tmp dir exists" ) ELSE ( mkdir "D:\Programming\videoManager\database\tmp" && echo "tmp dir created")

"C:\Program Files\PostgreSQL\9.5\bin\postgres.exe"  -D "D":\Programming\videoManager\dataBase\db\" -p 65432 -i