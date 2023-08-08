CREATE
DATABASE IF NOT EXISTS database_rp;
USE
database_rp;

create table user
(
    id        int auto_increment primary key,
    name      varchar(30)  default '' not null,
    otype     varchar(150) default '' not null,
    oid       varchar(150) default '' not null,
    create_at timestamp               not null default current_timestamp,
    update_at timestamp               not null default current_timestamp on update current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TRIGGER default_values_user
    BEFORE INSERT
    ON user
    FOR EACH ROW
BEGIN
    SET NEW.otype = 'user';
    SET NEW.oid = CONCAT('user', NEW.id);
END;

-- Дамп данных таблицы `user`

INSERT INTO `user` (`id`, `name`, `oid`, `create_at`, `update_at`)
VALUES (1, 'Том Харди', 'user', 'user1'),
       (2, 'Джордж Клуни', 'user', 'user1'),
       (3, 'Дэвид Бекхэм', 'user', 'user1');

-- --------------------------------------------------------


create table pet
(
    id        int auto_increment primary key,
    name      varchar(30)  default '' not null,
    otype     varchar(150) default '' not null,
    oid       varchar(150) default '' not null,
    home      tinyint(1) default 0 not null,
    user_id   int                     not null,
    birthday  int                     not null,
    create_at timestamp               not null default current_timestamp,
    update_at timestamp               not null default current_timestamp on update current_timestamp,
    constraint fk_pet__user_id
        foreign key (user_id) references user (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TRIGGER default_values_pet
    BEFORE INSERT
    ON pet
    FOR EACH ROW
BEGIN
    SET NEW.otype = 'pet';
    SET NEW.oid = CONCAT('pet', NEW.id);
END;

create index user_id
    on pet (user_id);

-- Дамп данных таблицы `user`

INSERT INTO `user` (`id`, `name`, `otype`, `oid`, `home`, `user_id`, `birthday`, `create_at`, `update_at`)
VALUES (1, 'Вуди', 'pet', 'pet1', 1, 1, 1628467199),
       (2, 'Макс', 'pet', 'pet2', 1, 2, 1628467199),
       (3, 'Дэвид', 'pet', 'pet3', 1, 3, 1628467199),

-- --------------------------------------------------------