
/* DROP DATABASE restaurant;
CREATE DATABASE restaurant;
 */
use sql11497812;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
-- - Create a table called users in the database

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    phoneNumber VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
-- - Create a table called foodCategories in the database
CREATE TABLE foodCategories(
    id INT AUTO_INCREMENT NOT NULL,
    category_title VARCHAR(255),
    category_img VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
-- - Create a table called typeOfFood
--  in the database
CREATE TABLE typeOfFood(
    id INT AUTO_INCREMENT NOT NULL,
    type VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
-- Create a table called products in the database

CREATE TABLE products
(
id INT AUTO_INCREMENT NOT NULL,
productName VARCHAR(255),
img VARCHAR(255),
description VARCHAR(255),
price INT,
type_id INT,
category_id INT,
FOREIGN KEY (category_id) REFERENCES foodCategories(id),
FOREIGN KEY (type_id) REFERENCES typeOfFood(id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);

CREATE TABLE permissions(
    id int auto_increment  NOT NULL,
    permission varchar (255)  NOT NULL,
    is_deleted TINYINT DEFAULT 0,

    primary key (id)
);

CREATE TABLE roles_permissions(
id int auto_increment NOT NULL,
permission_id INT,
role_id INT,
foreign key (role_id) references roles(id),
foreign key (permission_id) references permissions(id),
is_deleted TINYINT DEFAULT 0,
primary key (id)
);

CREATE TABLE basket(
id int auto_increment NOT NULL,
product_id INT,
user_id INT,
amount INT DEFAULT 1,
foreign key (product_id) references products(id),
foreign key (user_id) references users(id),
is_deleted TINYINT DEFAULT 0,
primary key (id)
);



CREATE TABLE ORDERHISTORY (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    foreign key (user_id) references users(id),
    ORDERhisory VARCHAR(255),
    primary key (id)
);