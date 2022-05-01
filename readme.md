Реализованные endpoints:

    - /add (загрузить файл)
    - /delete/id (пометить файл на удаление)
    - /files?limit=5&skip=0 (вывод списока файлов не помеченных на удаление)


                            Тестовое задание

Требуется реализовать серверную часть приложения для работы с файлами, хранящимися на сервере.
Серверное приложение REST API реализуется на базе NodeJS c фреймворком Express, (для загрузки файлов рекомендуется использовать Multer) и должно при запуске разбиваться на 3 кластера ( instance ).
Функции приложения:
    • Вывод списка файлов на сервере, по 5 файлов.
            ▪ Список файлов сортируется по дате создания файлов.
            ▪ Выводятся реквизиты файла: наименование, размер, дата создания.
    • Загрузка файлов на сервер предприятия
    • Загрузку файлов необходимо ограничить по размеру 5 мб и по типу, jpg, png, xlsx.
            ▪ После загрузки файла на сервер в базу данных вносится новая запись о загруженном файле, со всеми известными в процессе загрузки атрибутами.
    • Удаление файла из списка (физически файлы не удаляются, только помечаются удаленными в базе данных).
                • При добавлении и удалении файла должно происходить логирование (коллекция log), в логе должны быть следующие поля:
                • stamp, ObjectID файла, тип (удаление \ добавление), номер кластера
    • По расписанию один раз в день в 23:30, должно происходить физическое удаление и удаление из коллекции, файлов, помеченных как «deleted»
Для реализации вышеперечисленного, должен быть разработан функционал на серверной стороне (backend), необходимо реализовать маршруты для загрузки файла,  получения списка, удаления файла.
Взаимодействие с сервером производится через интерфейс REST API посредством CRUD операций. 
Для взаимодействия с разрабатываемым REST API, вместо фронтенда можно использовать программу наподобие как «Postman», однако к моменту сдачи задания на REST API должна быть настроена грамотная CORS политика.
Информация о файлах хранится в базе данных на сервере MongoDB, подключение к которой настраивается через .env
Результаты задачи необходимо представить на GitHub.com, в профиле соискателя. Клонированный репозиторий должен запускаться командой npm start, и взаимодействовать с базой данных предприятия.