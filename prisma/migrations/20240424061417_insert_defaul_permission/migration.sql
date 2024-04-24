-- This is an empty migration.
insert into Role ( name, Permissions)
values (
    'ADMIN',
    '["create","update","delete","fetch"]'
);

insert into Role ( name, Permissions)
values (
    'SELLER',
    '["create","update","fetch"]'
);

insert into Role ( name, Permissions)
values (
    'SUPPORTER',
    '["delete","fetch"]'
);

insert into Role ( name, Permissions)
values (
    'CUSTOMER',
    '["fetch"]'
);


