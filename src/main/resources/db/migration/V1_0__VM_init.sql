/**
 * Предварительно нужно создать в БД съему video_manager
 */

/**
 * Необходимо что бы заработал Hibernate.
 */
create sequence video_manager.hibernate_sequence;


CREATE TABLE video_manager.employee (
id BIGINT PRIMARY KEY,
first_name VARCHAR,
last_name VARCHAR,
description VARCHAR,
version BIGINT,
manager_id BIGINT
);

CREATE TABLE video_manager.manager (
id BIGINT PRIMARY KEY,
name VARCHAR,
password VARCHAR,
roles VARCHAR
);



CREATE SEQUENCE video_manager.employee_sequence START WITH 1;
CREATE SEQUENCE video_manager.manager_sequence START WITH 1;
