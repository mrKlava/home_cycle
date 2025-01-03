CREATE VIEW user_data AS
SELECT 
	u.user_id as userId
    ,u.name as firstname
    ,u.surname as lastname
    ,u.email
    ,u.city_id as cityId
    ,ci.name as city
    ,ci.country_id as countryId
    ,co.name as country
    ,u.address_one as addressOne
    ,u.address_two as addressTwo
    ,u.zip_code as zip
FROM users AS u
LEFT JOIN cities AS ci
	ON u.city_id = ci.city_id
LEFT JOIN countries as co
	ON ci.country_id = co.country_id;