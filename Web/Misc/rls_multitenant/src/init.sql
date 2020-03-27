CREATE SCHEMA app;

SET search_path TO app;

CREATE TABLE tenant
(
    tenant_id   varchar(16) NOT NULL PRIMARY KEY,
    name        varchar(64) NOT NULL,
    description text
);

CREATE TABLE employee
(
    tenant_id   varchar(16) NOT NULL REFERENCES tenant (tenant_id),
    employee_id varchar(16) NOT NULL,
    first_name  varchar(16) NOT NULL,
    last_name   varchar(16) NOT NULL,
    email       varchar(256),
    birthday    date,
    PRIMARY KEY (tenant_id, employee_id)
);

CREATE TABLE news
(
    news_id      serial      NOT NULL PRIMARY KEY,
    announced_by varchar(16) NOT NULL REFERENCES tenant (tenant_id),
    text         text
);

ALTER TABLE employee
    ENABLE ROW LEVEL SECURITY;

CREATE ROLE app_server WITH password 'hoge' LOGIN;
GRANT ALL ON ALL TABLES IN SCHEMA app TO app_server;
GRANT ALL ON ALL SEQUENCES IN SCHEMA app TO app_server;
GRANT USAGE ON SCHEMA app TO app_server;

CREATE POLICY employee_rls ON employee TO app_server USING (tenant_id = current_setting('app.tenant_id'));
