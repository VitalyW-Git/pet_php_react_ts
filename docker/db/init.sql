CREATE
DATABASE IF NOT EXISTS database_rp;
USE
database_rp;

CREATE TABLE IF NOT EXISTS user
(
    id        int auto_increment primary key,
    name      varchar(30)  default '' not null, -- Имя пользователя
    otype     varchar(150) default '' not null, -- Тип сущности
    oid       varchar(150) default '' not null, -- Идентификатор сущности
    create_at timestamp               not null default current_timestamp, -- Дата создания
    update_at timestamp               not null default current_timestamp on update current_timestamp -- Дата обновления
) ENGINE=InnoDB;

-- Добавляем комментарии к столбцам таблицы user
ALTER TABLE user
    MODIFY name varchar(30) not null comment 'Имя пользователя';

-- Триггер для установки значений по умолчанию в таблице user
CREATE TRIGGER default_values_user
    BEFORE INSERT
    ON user
    FOR EACH ROW
BEGIN
    SET NEW.otype = 'user';
    SET NEW.oid = CONCAT('user', LAST_INSERT_ID() + 1);
END;

-- Заполняем данные таблицы user
-- INSERT INTO user (name)
-- VALUES ('Том Харди'), ('Джордж Клуни'), ('Дэвид Бекхэм');

-- --------------------------------------------------------


create table pet
(
    id        int auto_increment primary key,
    name      varchar(30)  default '' not null, -- Имя домашнего животного
    otype     varchar(150) default '' not null, -- Тип сущности
    oid       varchar(150) default '' not null, -- Идентификатор сущности
    home      tinyint(1) default 0 not null, -- Домшнее или нет
    user_id   int                     not null, -- id пользака
    birthday  int                not null, -- День рождение животного
    create_at timestamp               not null default current_timestamp,
    update_at timestamp               not null default current_timestamp on update current_timestamp,
    constraint fk_pet__user_id
        foreign key (user_id) references user (id)
) ENGINE=InnoDB;

-- Добавялем комментарии к столбцам таблицы pet
ALTER TABLE pet
    MODIFY name varchar(30) not null comment 'Имя питомца',
    MODIFY birthday datetime not null comment 'Дата рождения',
    MODIFY user_id int not null comment 'Идентификатор владельца';

CREATE TRIGGER default_values_pet
    BEFORE INSERT
    ON pet
    FOR EACH ROW
BEGIN
    SET NEW.otype = 'pet';
    SET NEW.oid = CONCAT('pet', NEW.id);
END;

-- Создаем индекс для столбца user_id в таблице pet
ALTER TABLE pet add index idx_user_id (user_id);

-- Заполняем данные таблицы pet
-- INSERT INTO `user` (name, home, user_id, birthday)
-- VALUES ('Вуди', 1, 1, 1628467199),
--        ('Макс', 1, 2, 1628467199),
--        ('Дэвид', 1, 3, 1628467199);

-- --------------------------------------------------------