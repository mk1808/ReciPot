INSERT INTO
	public.category(id, parent_category_id, image, name)
VALUES
	('076781f1-977e-461d-8a02-c1ae6ca00000', null, '/assets/images/categories/desserts.png', 'Desery'),
		('076781f1-977e-461d-8a02-c1ae6ca00001', '076781f1-977e-461d-8a02-c1ae6ca00000', '/assets/images/categories/baked_desserts.png', 'Pieczone'),
			('076781f1-977e-461d-8a02-c1ae6ca00002', '076781f1-977e-461d-8a02-c1ae6ca00001', '', 'Ciasta'),
				('076781f1-977e-461d-8a02-c1ae6ca00003', '076781f1-977e-461d-8a02-c1ae6ca00002', '', 'Serniki'),
				('076781f1-977e-461d-8a02-c1ae6ca00004', '076781f1-977e-461d-8a02-c1ae6ca00002', '', 'Kruche'),
				('076781f1-977e-461d-8a02-c1ae6ca00005', '076781f1-977e-461d-8a02-c1ae6ca00002', '', 'Drożdżowe'),
			('076781f1-977e-461d-8a02-c1ae6ca00006', '076781f1-977e-461d-8a02-c1ae6ca00001', '', 'Torty'),
			('076781f1-977e-461d-8a02-c1ae6ca00007', '076781f1-977e-461d-8a02-c1ae6ca00001', '', 'Ciasteczka'),
			('076781f1-977e-461d-8a02-c1ae6ca00008', '076781f1-977e-461d-8a02-c1ae6ca00001', '', 'Babeczki'),
		('076781f1-977e-461d-8a02-c1ae6ca00009', '076781f1-977e-461d-8a02-c1ae6ca00000', '/assets/images/categories/fryed_desserts.png', 'Smażone'),
			('076781f1-977e-461d-8a02-c1ae6ca00010', '076781f1-977e-461d-8a02-c1ae6ca00009', '', 'Pączki'),
			('076781f1-977e-461d-8a02-c1ae6ca00011', '076781f1-977e-461d-8a02-c1ae6ca00009', '', 'Oponki'),
			('076781f1-977e-461d-8a02-c1ae6ca00012', '076781f1-977e-461d-8a02-c1ae6ca00009', '', 'Naleśniki'),
		('076781f1-977e-461d-8a02-c1ae6ca00013', '076781f1-977e-461d-8a02-c1ae6ca00000', '/assets/images/categories/ice_creams_desserts.png', 'Lody'),
			('076781f1-977e-461d-8a02-c1ae6ca00014', '076781f1-977e-461d-8a02-c1ae6ca00013', '', 'Tradycyjne'),
			('076781f1-977e-461d-8a02-c1ae6ca00015', '076781f1-977e-461d-8a02-c1ae6ca00013', '', 'Sorbety'),
		('076781f1-977e-461d-8a02-c1ae6ca00016', '076781f1-977e-461d-8a02-c1ae6ca00000', '/assets/images/categories/cream_desserts.png', 'Kremy'),
		('076781f1-977e-461d-8a02-c1ae6ca00017', '076781f1-977e-461d-8a02-c1ae6ca00000', '/assets/images/categories/fruit_desserts.png', 'Owocowe'),
			('076781f1-977e-461d-8a02-c1ae6ca00018', '076781f1-977e-461d-8a02-c1ae6ca00017', '', 'Galaretki'),
			('076781f1-977e-461d-8a02-c1ae6ca00019', '076781f1-977e-461d-8a02-c1ae6ca00017', '', 'Kompoty'),
			('076781f1-977e-461d-8a02-c1ae6ca00020', '076781f1-977e-461d-8a02-c1ae6ca00017', '', 'Sałatki owocowe'),
		('076781f1-977e-461d-8a02-c1ae6ca00021', '076781f1-977e-461d-8a02-c1ae6ca00000', '/assets/images/categories/milk_desserts.png', 'Mleczne'),
			('076781f1-977e-461d-8a02-c1ae6ca00022', '076781f1-977e-461d-8a02-c1ae6ca00021', '', 'Jogurty'),
			('076781f1-977e-461d-8a02-c1ae6ca00023', '076781f1-977e-461d-8a02-c1ae6ca00021', '', 'Serki'),
			('076781f1-977e-461d-8a02-c1ae6ca00024', '076781f1-977e-461d-8a02-c1ae6ca00021', '', 'Budynie');

INSERT INTO
	public.category(id, parent_category_id, image, name)
VALUES
	('076781f1-977e-461d-8a02-c1ae6ca00100', null, '/assets/images/categories/breads.png', 'Pieczywo'),
		('076781f1-977e-461d-8a02-c1ae6ca00101', '076781f1-977e-461d-8a02-c1ae6ca00100', '/assets/images/categories/breads_breads.png', 'Chleby'),
		('076781f1-977e-461d-8a02-c1ae6ca00102', '076781f1-977e-461d-8a02-c1ae6ca00100', '/assets/images/categories/buns_breads.png', 'Bułki'),
		('076781f1-977e-461d-8a02-c1ae6ca00103', '076781f1-977e-461d-8a02-c1ae6ca00100', '/assets/images/categories/salt_breads.png', 'Słone'),
		('076781f1-977e-461d-8a02-c1ae6ca00104', '076781f1-977e-461d-8a02-c1ae6ca00100', '/assets/images/categories/orient_breads.png', 'Orientalne');

INSERT INTO
	public.category(id, parent_category_id, image, name)
VALUES
	('076781f1-977e-461d-8a02-c1ae6ca00200', null, '/assets/images/categories/breakfast.png', 'Śniadania'),
		('076781f1-977e-461d-8a02-c1ae6ca00201', '076781f1-977e-461d-8a02-c1ae6ca00200', '/assets/images/categories/sweet_breakfast.png', 'Słodkie'),
		('076781f1-977e-461d-8a02-c1ae6ca00202', '076781f1-977e-461d-8a02-c1ae6ca00200', '/assets/images/categories/dry_breakfast.png', 'Wytrawne'),
		('076781f1-977e-461d-8a02-c1ae6ca00203', '076781f1-977e-461d-8a02-c1ae6ca00200', '/assets/images/categories/fit_breakfast.png', 'Fit');

INSERT INTO
	public.category(id, parent_category_id, image, name)
VALUES
	('076781f1-977e-461d-8a02-c1ae6ca00300', null, '/assets/images/categories/lunch.png', 'Obiady'),
		('076781f1-977e-461d-8a02-c1ae6ca00301', '076781f1-977e-461d-8a02-c1ae6ca00300', '/assets/images/categories/main_lunch.png', 'Dania główne'),
			('076781f1-977e-461d-8a02-c1ae6ca00302', '076781f1-977e-461d-8a02-c1ae6ca00301', '', 'Galaretki'),
			('076781f1-977e-461d-8a02-c1ae6ca00303', '076781f1-977e-461d-8a02-c1ae6ca00301', '', 'Kompoty'),
			('076781f1-977e-461d-8a02-c1ae6ca00304', '076781f1-977e-461d-8a02-c1ae6ca00301', '', 'Sałatki owocowe'),
		('076781f1-977e-461d-8a02-c1ae6ca00305', '076781f1-977e-461d-8a02-c1ae6ca00300', '/assets/images/categories/soups_lunch.png', 'Zupy'),
			('076781f1-977e-461d-8a02-c1ae6ca00306', '076781f1-977e-461d-8a02-c1ae6ca00305', '', 'Galaretki'),
			('076781f1-977e-461d-8a02-c1ae6ca00307', '076781f1-977e-461d-8a02-c1ae6ca00305', '', 'Kompoty'),
		('076781f1-977e-461d-8a02-c1ae6ca00308', '076781f1-977e-461d-8a02-c1ae6ca00300', '/assets/images/categories/salads_lunch.png', 'Sałatki'),
			('076781f1-977e-461d-8a02-c1ae6ca00309', '076781f1-977e-461d-8a02-c1ae6ca00308', '', 'Galaretki'),
		('076781f1-977e-461d-8a02-c1ae6ca00310', '076781f1-977e-461d-8a02-c1ae6ca00300', '/assets/images/categories/pasta_lunch.png', 'Makarony'),
		('076781f1-977e-461d-8a02-c1ae6ca00311', '076781f1-977e-461d-8a02-c1ae6ca00300', '/assets/images/categories/rice_lunch.png', 'Ryżowe'),
		('076781f1-977e-461d-8a02-c1ae6ca00312', '076781f1-977e-461d-8a02-c1ae6ca00300', '/assets/images/categories/potato_lunch.png', 'Ziemniaczane');

INSERT INTO
	public.category(id, parent_category_id, image, name)
VALUES
	('076781f1-977e-461d-8a02-c1ae6ca00400', null, '/assets/images/categories/snacks.png', 'Przekąski'),
		('076781f1-977e-461d-8a02-c1ae6ca00401', '076781f1-977e-461d-8a02-c1ae6ca00400', '/assets/images/categories/sweet_snacks.png', 'Słodkie'),
		('076781f1-977e-461d-8a02-c1ae6ca00402', '076781f1-977e-461d-8a02-c1ae6ca00400', '/assets/images/categories/dry_snacks.png', 'Wytrawne'),
		('076781f1-977e-461d-8a02-c1ae6ca00403', '076781f1-977e-461d-8a02-c1ae6ca00400', '/assets/images/categories/party_snacks.png', 'Imprezowe');
	
INSERT INTO
	public.category(id, parent_category_id, image, name)
VALUES
	('076781f1-977e-461d-8a02-c1ae6ca00500', null, '/assets/images/categories/drinks.png', 'Napoje'),
		('076781f1-977e-461d-8a02-c1ae6ca00501', '076781f1-977e-461d-8a02-c1ae6ca00500', '/assets/images/categories/hot_drinks.png', 'Ciepłe'),
			('076781f1-977e-461d-8a02-c1ae6ca00502', '076781f1-977e-461d-8a02-c1ae6ca00501', '', 'Kawy'),
			('076781f1-977e-461d-8a02-c1ae6ca00503', '076781f1-977e-461d-8a02-c1ae6ca00501', '', 'Herbaty'),
			('076781f1-977e-461d-8a02-c1ae6ca00504', '076781f1-977e-461d-8a02-c1ae6ca00501', '', 'Nalewki'),
		('076781f1-977e-461d-8a02-c1ae6ca00505', '076781f1-977e-461d-8a02-c1ae6ca00500', '/assets/images/categories/juice_drinks.png', 'Soki'),
		('076781f1-977e-461d-8a02-c1ae6ca00506', '076781f1-977e-461d-8a02-c1ae6ca00500', '/assets/images/categories/milk_drinks.png', 'Mleczne'),
		('076781f1-977e-461d-8a02-c1ae6ca00507', '076781f1-977e-461d-8a02-c1ae6ca00500', '/assets/images/categories/no_alk_drinks.png', 'Bezalkoholowe'),
		('076781f1-977e-461d-8a02-c1ae6ca00508', '076781f1-977e-461d-8a02-c1ae6ca00500', '/assets/images/categories/alk_drinks.png', 'Alkoholowe'),
			('076781f1-977e-461d-8a02-c1ae6ca00509', '076781f1-977e-461d-8a02-c1ae6ca00508', '', 'Drinki'),
			('076781f1-977e-461d-8a02-c1ae6ca00510', '076781f1-977e-461d-8a02-c1ae6ca00508', '', 'Koktajle'),
			('076781f1-977e-461d-8a02-c1ae6ca00511', '076781f1-977e-461d-8a02-c1ae6ca00508', '', 'Nalewki');

	