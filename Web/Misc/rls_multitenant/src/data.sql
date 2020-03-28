SET search_path TO app;

SET app.tenant_id = 'foo';
INSERT INTO tenant(tenant_id, name)
VALUES ('foo', 'Foo Ltd.');
INSERT INTO employee(tenant_id, employee_id, first_name, last_name, email, birthday)
VALUES ('foo', '1', 'Alice', 'Smith', 'smith@foo.example.com', '1987-6-5');
INSERT INTO employee(tenant_id, employee_id, first_name, last_name, email, birthday)
VALUES ('foo', '2', 'Bob', 'Johnson', 'bob@foo.example.com', '1943-2-10');

SET app.tenant_id = 'bar';
INSERT INTO tenant(tenant_id, name, description)
VALUES ('bar', 'Bar Corporation', 'Stunning new');
INSERT INTO employee(tenant_id, employee_id, first_name, last_name, email, birthday)
VALUES ('bar', '1', 'Charlie', 'Williams', 'williams@bar.example.com', '2000-2-20');
INSERT INTO employee(tenant_id, employee_id, first_name, last_name, email, birthday)
VALUES ('bar', '2', 'Dave', 'Brown', 'brown@bar.example.com', '1999-9-9');

SET app.tenant_id = DEFAULT;

INSERT INTO news(announced_by, text)
VALUES ('foo', 'Happy holidays!');
INSERT INTO news(announced_by, text)
VALUES ('bar', 'We made a new phone.');
