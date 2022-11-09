--- Apaga a Schema Existente
DROP SCHEMA IF EXISTS crm CASCADE;

--- Cria nova Schema
CREATE SCHEMA IF NOT EXISTS crm;

--- Cria Tabelas
CREATE TABLE crm.users(
	id 					SERIAL,
	email 				VARCHAR(50),
	password 			VARCHAR(255),
	displayname 		VARCHAR(50),
	status 				BOOLEAN,
	date_modified		TIMESTAMP(0) 	DEFAULT NOW(),
	date_created		TIMESTAMP(0) 	DEFAULT NOW(),
	CONSTRAINT users_pk PRIMARY KEY(id),
	CONSTRAINT users_uk UNIQUE(email)
);

CREATE TABLE crm.post_categories(
	id 		SERIAL,
	name 	VARCHAR(50),
	CONSTRAINT categories_pk PRIMARY KEY(id)
);

CREATE TABLE crm.posts(
	id 				SERIAL,
	author 			INT,
	category		INT,
	date			TIMESTAMP(0),
	title			TEXT,
	excerpt			TEXT,
	content 		TEXT,
	status 			VARCHAR(20),
	featured		BOOLEAN,
	date_modified 	TIMESTAMP(0) 	DEFAULT NOW(),
	CONSTRAINT posts_pk PRIMARY KEY(id)
);

--- Cria Relações
ALTER TABLE crm.posts ADD CONSTRAINT user_fk FOREIGN KEY(author) REFERENCES crm.posts(id);
ALTER TABLE crm.posts ADD CONSTRAINT category_fk FOREIGN KEY(category) REFERENCES crm.post_categories(id);

--- Insere dados na 
INSERT INTO crm.users(email, password) VALUES ('teste@braintech.pt', '--hide--');

--- Insere dados nas categorias
INSERT INTO crm.post_categories(id, name) VALUES (1, 'Sem Categoria');

--- Insere dados nos Posts
INSERT INTO crm.posts(author, category, date, title, excerpt, content, status, featured, date_modified) VALUES
(1, 2, '2019-06-08 17:28:19', 'Teste', 'Teste', 'Teste', 'publish', 'false', '2021-10-06 00:42:31');