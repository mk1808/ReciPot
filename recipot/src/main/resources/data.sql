INSERT INTO role (id, name)
SELECT (SELECT gen_random_uuid()), 'USER' 
WHERE NOT EXISTS (
        SELECT id FROM role WHERE name = 'USER'
    )
LIMIT 1;

INSERT INTO role (id, name)
SELECT (SELECT gen_random_uuid()), 'ADMIN' 
WHERE NOT EXISTS (
        SELECT id FROM role WHERE name = 'ADMIN'
    )
LIMIT 1;
