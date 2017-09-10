-- use chuckitdb;

use heroku_d97e12e6d4f9baa;


drop view if exists vw_ItemMessages;

create view vw_ItemMessages 
as

select i.id as ItemId, sum(case when m.id is not null then 1 else 0 end) as message_cnt, sum(case when m.read_ind=0 then 1 else 0 end) as unread_cnt
	from items i
	left join messages m
		on i.id=m.ItemId
where i.deleted_flag=0
	and ifnull(m.deleted_flag,0)=0
group by i.id ;

drop view if exists vw_ItemOffers;

create view vw_ItemOffers
as

select i.id as ItemId, sum(case when o.id is not null then 1 else 0 end) as offer_cnt, max(case when o.offer_accepted_ind=1 then 1 else 0 end) as offer_accepted_ind
	from items i
	inner join offers o
		on i.id=o.ItemId
where i.deleted_flag=0
	and ifnull(o.deleted_flag,0)=0
group by i.id ;

drop view if exists vw_UserRating;

create view vw_UserRating 
as

select u.id, avg(seller_rating) as avg_rating
	from users u
    inner join items i 
		on u.id=i.UserId
where u.deleted_flag=0
	and i.deleted_flag=0
    and i.buyer_sale_confirm=1 and i.seller_sale_confirm=1
    and i.seller_rating is not null
group by u.id ;

drop procedure if exists usp_GetNewListings;
 

DELIMITER //
create procedure usp_GetNewListings()
Begin
	select i.*, u.username, u.zip, u.email, u.phone, u.fname, u.lname, u.user_image_url, ur.avg_rating as seller_avg_rating, o.offer_cnt, o.offer_accepted_ind
		from items i
		inner join users u
			on i.UserId=u.id
		left join vw_Itemoffers o
			on i.id=o.ItemId 
		left join vw_UserRating ur
			on u.id=ur.id
	where ifnull(o.offer_accepted_ind,0)=0
		and i.buyer_sale_confirm<>1 and i.seller_sale_confirm<>1
		and u.deleted_flag=0
        and i.deleted_flag=0
	order by i.createdAt desc
	Limit 10
   ;
End //
DELIMITER ;

drop procedure if exists usp_GetRandomListings;
 

DELIMITER //
create procedure usp_GetRandomListings()
Begin
	select i.*, u.username, u.zip, u.email, u.phone, u.fname, u.lname, u.user_image_url, ur.avg_rating as seller_avg_rating, o.offer_cnt, o.offer_accepted_ind
		from items i
        inner join (SELECT i.id
			FROM items i
            inner join users u 
				on i.userid=u.id
		     left join vw_ItemOffers o
				on i.id=o.itemid
            where i.deleted_flag=0
				and i.buyer_sale_confirm<>1 and i.seller_sale_confirm<>1
                and ifnull(offer_accepted_ind,0)=0
                and u.deleted_flag=0
			ORDER BY RAND()
			LIMIT 10) t 
			on i.id=t.id
		inner join users u
			on i.UserId=u.id
		left join vw_Itemoffers o
			on i.id=o.ItemId 
		left join vw_UserRating ur
			on u.id=ur.id
   ;
End //
DELIMITER ;


drop procedure if exists usp_GetMyListings;
 
DELIMITER //
create procedure usp_GetMyListings(paramUserId int) 
Begin
	select u.username, u.zip, u.email, u.phone, u.fname, u.lname, u.user_image_url, i.*, o.offer_accepted_ind, o.offer_cnt, m.message_cnt, m.unread_cnt
		from users u 
		inner join items i
			on u.id=i.UserId
		left join vw_itemoffers o
          on i.id=o.ItemId
		left join vw_ItemMessages m
			on i.id=m.ItemId
	where u.id=paramUserId
		and i.deleted_flag=0
        and u.deleted_flag=0
	order by case when i.buyer_sale_confirm=1 and i.seller_sale_confirm=1 then 1 else 0 end, i.createdAt;
End //
DELIMITER ;

 drop procedure if exists usp_GetMyPurchases;
 

DELIMITER //
create procedure usp_GetMyPurchases(paramUserId int) 
Begin
	select u.id as UserId, u.username, u.zip, u.email, u.phone, u.fname, u.lname, u.user_image_url, ur.avg_rating as seller_avg_rating, i.id as ItemId, i.title, i.description, i.category, i.item_image_url, i.quantity
	,i.price, i.unit_type, i.barter_ind, i. buyer_sale_confirm, i.seller_sale_confirm,i.seller_rating, u2.username as seller_name, o.offer_amt
    ,o.barter_ItemId, i2.price as barter_item_price, i2.title as barter_item_title, o.offer_accepted_ind
    ,offer_accepted_dtm, o.createdAt, o.updatedAt,m.message_cnt
		from offers o
		inner join items i 
			on o.ItemId=i.Id
        inner join users u
			on o.UserId=u.id
		left join items i2
            on o.barter_ItemId=i2.id
		left join users u2 
			on i.UserId=u2.id
		left join vw_ItemMessages m
			on o.ItemId=m.ItemId
		left join vw_UserRating ur
            on o.UserId=ur.id
	where o.UserId=paramUserId
		and i.buyer_sale_confirm=1 and i.seller_sale_confirm=1
		and u.deleted_flag=0
        and ifnull(o.deleted_flag,0)=0
        and i.deleted_flag=0
        and ifnull(i2.deleted_flag,0)=0
	order by o.offer_accepted_dtm;
End //
DELIMITER ;

 drop procedure if exists usp_GetMyOffers;
 

DELIMITER //
create procedure usp_GetMyOffers(paramUserId int) 
Begin
	select u.id as UserId, u.username, u.zip, u.email, u.phone, u.fname, u.lname, u.user_image_url, i.title,i.description,i.category,i.item_image_url,i.quantity,i.price,i.unit_type,i.barter_ind
    ,i.buyer_sale_confirm, i.seller_sale_confirm, u2.username as seller_name, u2.zip as seller_zip, ur.avg_rating as seller_avg_rating
    , o.*, m.message_cnt, m.unread_cnt
		from offers o
		inner join users u
			on o.UserId=u.id
		inner join items i
			on o.ItemId=i.id
		left join users u2
			on i.UserId=u2.id
		left join vw_UserRating ur
			on u.id=ur.id
		left join vw_ItemMessages m
			on i.id=m.ItemId
	where o.Userid=paramUserId
		and (i.buyer_sale_confirm=0 or i.seller_sale_confirm=0)
		and u.deleted_flag=0
		and o.deleted_flag=0
		and i.deleted_flag=0
	order by o.createdAt desc;
End //
DELIMITER ;

drop procedure if exists usp_GetSearchResults;
 

DELIMITER //
create procedure usp_GetSearchResults(paramTerm varchar(255), paramCategory varchar(255), paramZip varchar(1000))
Begin

 set paramZip=replace(paramZip,'"','');
 set paramZip=replace(paramZip,'{','');
 set paramZip=replace(paramZip,'zip_codes:','');
 set paramZip=replace(paramZip,' ','');
 set paramTerm=trim(paramTerm);
 set paramTerm=replace(paramTerm,' ','%');
  set paramTerm=replace(paramTerm,'20%','%');


	select i.*, u.username, u.zip, u.email, u.phone, u.fname, u.lname, u.user_image_url, ur.avg_rating as seller_avg_rating, o.offer_cnt, o.offer_accepted_ind
		from items i
		inner join users u
			on i.UserId=u.id
		left join vw_Itemoffers o
			on i.id=o.ItemId 
		left join vw_UserRating ur
			on u.id=ur.id
	where ifnull(o.offer_accepted_ind,0) =0
		and case when ifnull(paramTerm,'')<>'' then case when i.title like CONCAT('%',paramTerm, '%') then 1 else 0 end else 1 end =1
		and case when ifnull(paramCategory,'')<>'' then case when i.category like paramCategory then 1 else 0 end else 1 end=1
		and case when ifnull(paramZip,'')<>'' then case when FIND_IN_SET(u.zip,paramZip)>0 then 1 else 0 end else 1 end=1
		and i.buyer_sale_confirm<>1 and i.seller_sale_confirm<>1
		and u.deleted_flag=0
        and i.deleted_flag=0
		
	order by i.title, i.price;
End //
DELIMITER ;


drop procedure if exists usp_GetItem;
 
DELIMITER //
create procedure usp_GetItem(paramItemId int) 
Begin
	select u.username, u.zip, u.email, u.phone, u.fname, u.lname, u.user_image_url, i.*,o.offer_cnt, o.offer_accepted_ind, m.message_cnt, m.unread_cnt, ur.avg_rating as seller_avg_rating
		from items i
		left join users u 
			on i.Userid=u.id
		left join vw_Itemoffers o 
			on i.id=o.ItemId
		left join vw_ItemMessages m
			on i.id=m.ItemId
		left join vw_userrating ur
			on i.userid=ur.id
	where i.id=paramItemId
		and i.deleted_flag=0
		and u.deleted_flag=0
	order by i.createdAt;
End //
DELIMITER ;

drop procedure if exists usp_PostItem;
 

DELIMITER //
create procedure usp_PostItem(paramUserId int, paramTitle varchar(255), paramDesc varchar(255), paramCategory varchar(255)
							, paramImageUrl varchar(255), paramQuantity integer, paramPrice decimal(11,2), paramUnitType varchar(255)
                            ,paramBarterInd integer)
Begin
	insert into items (UserId, title, description, category, item_image_url, quantity, price, unit_type, barter_ind, createdAt, updatedAt)
	values(paramUserId, paramTitle, paramDesc, paramCategory, paramImageUrl, paramQuantity, paramPrice, paramUnitType, paramBarterInd, now(), now()) ;
End //
DELIMITER ;


 drop procedure if exists usp_GetOffer;
 

DELIMITER //
create procedure usp_GetOffer(paramOfferId int) 
Begin
	select u.id as UserId, u.username, i.title,i.description,i.category,i.item_image_url,i.quantity,i.price,i.unit_type,i.barter_ind
    ,i.buyer_sale_confirm, i.seller_sale_confirm, u2.username as seller_name, u2.zip as seller_zip, ur.avg_rating as seller_avg_rating
    , o.*, m.message_cnt, m.unread_cnt
		from offers o	 
		inner join users u
			on o.UserId=u.id
		inner join items i
			on o.ItemId=i.id
		left join users u2
			on i.UserId=u2.id
		left join vw_UserRating ur
			on u.id=ur.id
		left join vw_ItemMessages m
			on o.ItemId=m.ItemId
	where o.OfferId=paramOfferId
		and i.buyer_sale_confirm<>1 and i.seller_sale_confirm<>1
		and u.deleted_flag=0
		and o.deleted_flag=0
		and i.deleted_flag=0
	order by o.createdAt;
End //
DELIMITER ;


 drop procedure if exists usp_GetItemOffers;
 
DELIMITER //
create procedure usp_GetItemOffers(paramUserId int, paramItemId int) 
Begin
	select u.username as offer_by, i.id as ItemId, i.title,i.description,i.category,i.item_image_url,i.quantity,i.price,i.unit_type,i.barter_ind
    ,i.buyer_sale_confirm, i.seller_sale_confirm, o.*, vo.offer_accepted_ind as offer_accepted_cnt, m.message_cnt, m.unread_cnt
		from items i
        inner join offers o	 
			on i.id=o.itemid
		inner join users u
			on o.UserId=u.id
		left join users u2
			on i.UserId=u2.id
		left join vw_ItemMessages m
			on o.ItemId=m.ItemId
        left join vw_ItemOffers vo
			on i.id=vo.itemid
	where i.id=paramItemId and u2.id=paramUserId
		and i.buyer_sale_confirm<>1 and i.seller_sale_confirm<>1
		and u.deleted_flag=0
		and o.deleted_flag=0
		and i.deleted_flag=0
	order by o.createdAt;
End //
DELIMITER ;


drop procedure if exists usp_PostOffer;
 

DELIMITER //
create procedure usp_PostOffer(paramUserId int, paramItemId int, paramOfferAmt decimal(11,2), paramBarterItemId int)
Begin
	insert into offers (UserId, ItemId, offer_amt, barter_ItemId, createdAt, updatedAt)
	values(paramUserId, paramItemId, paramOfferAmt, paramBarterItemId, now(), now()) ;
End //
DELIMITER ;

drop procedure if exists usp_PutOffer;
 
DELIMITER //
create procedure usp_PutOffer(paramOfferId int, paramOfferAmt decimal(11,2), paramBarterItemId int)
Begin
	update offers
	set offer_amt=paramOfferAmt, BarterItemd=paramBarterId, updatedAt=now()
    where id=paramOfferId;
End //
DELIMITER ;

drop procedure if exists usp_PutAcceptOffer;
 
DELIMITER //
create procedure usp_PutAcceptOffer(paramUserId int, paramOfferId int)
Begin
 declare paramItemId int;
 set paramItemId=(Select itemid from offers where id=paramOfferId and deleted_flag=0);
 
	update offers 
    inner join items i on offers.ItemId=i.id
	set offer_accepted_ind=case when offers.offer_accepted_ind=0  and offers.id=paramOfferId then 1 else 0 end, offer_accepted_dtm=now(), offers.updatedAt=now()
    where offers.Itemid=paramItemId and i.Userid=paramUserId
    and i.buyer_sale_confirm=0 and i.seller_sale_confirm=0;
End //
DELIMITER ;

drop procedure if exists usp_PutEditItem;

DELIMITER //
create procedure usp_PutEditItem(paramItemId int, paramTitle varchar(255), paramDesc varchar(255), paramCategory varchar(255)
							, paramImageUrl varchar(255), paramQuantity integer, paramPrice decimal(11,2), paramUnitType varchar(255)
                            ,paramBarterInd int)
                            update items
                            set title=paramTitle, description=paramDescription, category=paramCategory, item_image_url=paramImageUrl, 
								quantity=paramQuantity, price=paramPrice, unit_type=paramUnitType, barter_ind=paramBarterInd
                                ,updatedAt=now()
                            where id=paramItemId and deleted_flag=0;
 DELIMITER ;
 

drop procedure if exists usp_PutBuyerConfirmSale;
DELIMITER //
create procedure usp_PutBuyerConfirmSale(paramUserId int, paramItemId int)
Begin
	update items
    inner join offers o
		on items.id=o.itemid
	set buyer_sale_confirm=case when buyer_sale_confirm=1 then 0 else 1 end, items.updatedAt=now()
    where items.id=paramItemId and o.UserId=paramUserId and o.offer_accepted_ind=1;
End //
DELIMITER ;

drop procedure if exists usp_PutSellerConfirmSale;
DELIMITER //
create procedure usp_PutSellerConfirmSale(paramUserId int, paramItemId int)
Begin
	update items
    inner join offers o
		on items.id=o.itemid
	set seller_sale_confirm= case when seller_sale_confirm=1 then 0 else 1 end, items.updatedAt=now()
    where items.id=paramItemId and items.UserId=paramUserId and o.offer_accepted_ind=1;
End //
DELIMITER ;

drop procedure if exists usp_PutEditOffer;
 

DELIMITER //
create procedure usp_PutEditOffer(paramOfferId int, paramOfferAmt decimal(11,2), paramBarterItemId int)
Begin
	update offers
    set offer_amt=paramOfferAmt, barter_ItemId=paramBarterItemId, updatedAt=now()
	where UserId=paramOfferId;
End //
DELIMITER ;

drop procedure if exists usp_PutEditSellerRating;
 

DELIMITER //
create procedure usp_PutEditSellerRating(paramItemId int, paramRating decimal(2,1), paramUserId int)
Begin
	update items i
    inner join offers o
    on i.id=o.itemid
    set i.seller_rating=paramRating, i.updatedAt=now()
	where i.id=paramItemId and o.userid=paramUserId and 
    o.offer_accepted_ind=1 and i.deleted_flag=0 and o.deleted_flag=0
    and i.buyer_sale_confirm=1 and i.seller_sale_confirm=1;
End //
DELIMITER ;

drop procedure if exists usp_GetUser;
 

DELIMITER //
create procedure usp_GetUser(paramUserId int)
Begin
	select u.*, avg_rating as seller_avg_rating
    from users u
    left join vw_userrating ur
		on u.id=ur.id
	where id=paramUserId
    and u.delete_flag=0;
End //
DELIMITER ;

drop procedure if exists usp_PutEditUser;
 

DELIMITER //
create procedure usp_PutEditUser(paramUserId int, paramEmail varchar(255), paramAge integer, paramFname varchar(255), paramLname varchar(255), paramZip varchar(255), paramPhone varchar(255), paramImageUrl varchar(255))
Begin

	Declare emailIsUnique bit;
    Declare phoneIsUnique bit;
    Declare currentEmail varchar(255);
    Declare currentPhone varchar(255);
		Declare dbEmail varchar(255);
    Declare dbPhone varchar(255);   
    Declare emailPhoneChanged bit;
    
    set currentEmail=(select email from users where id=paramUserId and deleted_flag=0);
    set currentPhone=(select phone from users where id=paramUserId and deleted_flag=0);
    
    set emailPhoneChanged=case when paramEmail<>ifnull(currentEmail,'') or paramPhone<>ifnull(currentPhone,'') then 1 else 0 end;
    
    if emailPhoneChanged=1 then
        set dbEmail=ifnull((select email from users where email=paramEmail),'');
        set dbPhone=ifnull((select phone from users where phone=paramPhone),'');
        
        if dbEmail<>'' then
        	select 'Error: email not unique';
        elseif dbPhone<>'' then
        	select 'Error: phone not unique';
        else     
			update users
			set email=paramEmail, age=paramAge, fname=paramFname, lname=paramLname, zip=paramZip, phone=paramPhone, user_image_url=paramImageUrl, updatedAt=now()
			where id=paramUserId;
             select 'success';
		end if;
     else
		update users
			set email=paramEmail, age=paramAge, fname=paramFname, lname=paramLname, zip=paramZip, phone=paramPhone, user_image_url=paramImageUrl, updatedAt=now()
			where id=paramUserId;
             select 'success';
	 end if;		
        
End //
DELIMITER ;

drop procedure if exists usp_PutVerifyUser;
 

DELIMITER //
create procedure usp_PutVerifyUser(paramUserId int, paramCode integer)
Begin
    Declare verificationCode varchar(255);
    
    set verificationCode=(select verification_code from users where id=paramUserId);
    
    if verificationCode=paramCode then
	
		update users
		set verified_seller_ind=1, updatedAt=now()
		where id=paramUserId and verification_code=paramCode;
    
		select 'valid' as results;
    
	else
		
		select 'invalid' as results;
    
    end if;
    
    
End //
DELIMITER ;

drop procedure if exists usp_GetMessage;
 
DELIMITER //
create procedure usp_GetMessage(paramMessageId int)
Begin
	(select m.FromId, u.username as from_username, m.ToId, u2.username as to_username, m.ItemId, i.title, m.message_text, m.read_ind, m.createdAt
		from messages m 
		inner join users u
			on m.FromId=u.id
		inner join items i
			on m.ItemId=i.id
		left join users u2
			on m.toid=u2.id
		where m.id=paramMessageId
			and u.deleted_flag=0 and m.deleted_flag=0 and i.deleted_flag=0);
End //
DELIMITER ;

drop procedure if exists usp_GetItemMessages;
 
DELIMITER //
create procedure usp_GetItemMessages(paramItemId int)
Begin
	(select m.FromId, u.username as from_username, m.ToId, u2.username as to_username, m.ItemId, i.title, m.message_text, m.read_ind, m.createdAt
		from messages m 
		inner join users u
			on m.FromId=u.id
		inner join items i
			on m.ItemId=i.id
		left join users u2
			on m.toid=u2.id
		where i.id=paramItemId
			and u.deleted_flag=0 and m.deleted_flag=0 and i.deleted_flag=0);
End //
DELIMITER ;

drop procedure if exists usp_GetItemUserMessages;
 
DELIMITER //
create procedure usp_GetItemUserMessages(paramLoginUserId int, paramUserId int, paramItemId int)
Begin
	select m.FromId, u.username as from_username, u.user_image_url as from_user_image_url, m.ToId, u2.username as to_username
     ,case when m.fromId=paramLoginUserId then m.ToId else m.FromId end as chat_with_UserId
     ,case when m.fromId=paramLoginUserId then u2.username else u.username end as chat_with_username 
     ,u2.user_image_url as to_user_image_url, m.ItemId, i.title, m.message_text, m.read_ind, m.createdAt
		from messages m 
		left join users u
			on m.FromId=u.id
		inner join items i
			on m.ItemId=i.id
		left join users u2
			on m.toid=u2.id
		where (m.fromid=paramUserId or m.toid=paramUserId) and i.id=paramItemId
        and (i.UserId=paramLoginUserId or i.userid=paramUserId) and u.deleted_flag=0 and m.deleted_flag=0 and i.deleted_flag=0
        order by m.createdAt;
        
End //
DELIMITER ;


drop procedure if exists usp_PostMessage;
 

DELIMITER //
create procedure usp_PostMessage(paramItemId int, paramFromId int, paramToId int, paramMessage varchar(255))
Begin
	insert into messages(ItemId, FromId, ToId, read_ind, message_text, createdAt, updatedAt)
    values(paramItemId,paramFromId, paramToId, 0, paramMessage, now(),now());
End //
DELIMITER ;

drop procedure if exists usp_PutMessageRead;
 
DELIMITER //
create procedure usp_PutMessageRead(paramMessageId int)
Begin
	update messages
    set read_ind=1, updatedAt=now()
	where id=paramMessageId;
End //
DELIMITER ;

drop procedure if exists usp_PutEditMessage;
 
DELIMITER //
create procedure usp_PutEditMessage(paramMessageId int, paramMessage varchar(255))
Begin
	update messages
    set message_text=paramMessage, updatedAt=now()
	where id=paramMessageId;
End //
DELIMITER ;

drop procedure if exists usp_GetInbox;
 
DELIMITER //
create procedure usp_GetInbox(paramUserId int)
Begin
    select m.id as MessageId, case when m.FromId=paramUserId then m.ToId else m.FromId end as UserId, case when m.FromId=paramUserId then u2.username else u.username end as username
    , m.FromId, u.username as from_username, m.ToId, u2.username as to_username, m.ItemId, i.Title, m.message_text, m.read_ind, m.updatedAt
    from (
    select UserId, ItemId, max(Last_MessageId) as LastMessageId
    from (select m.ToId as UserId, i.id as ItemId, max(m.id) as Last_MessageId
		from users u
		inner join messages m 
			on u.id=m.FromId
		inner join items i
			on m.ItemId=i.id
		left join users u2
			on m.toid=u2.id
		where u.id=paramUserId
			and u.deleted_flag=0 and m.deleted_flag=0 and i.deleted_flag=0
        group by m.ToId, m.itemId
        union select m.FromId as UserId, i.id as ItemId, max(m.id) as Last_MessageId
		from users u
		 inner join messages m 
			 on u.id=m.ToId
		 inner join items i
			 on m.ItemId=i.id
		 left join users u2
			 on m.fromid=u2.id
		 where u.id=paramUserId
			 and u.deleted_flag=0 and m.deleted_flag=0 and i.deleted_flag=0
	     group by m.fromId, m.itemid) t
         group by t.userid, t.itemid) t2
    inner join messages m on t2.lastmessageid=m.id
    left join users u on m.fromid=u.id
    inner join items i on m.itemid=i.id
    left join users u2 on m.toid=u2.id
    where u.deleted_flag=0 and m.deleted_flag=0 and i.deleted_flag=0 and u2.deleted_flag=0
    order by updatedAt desc;
End //
DELIMITER ;

drop procedure if exists usp_DeleteMessage;
 
DELIMITER //
create procedure usp_DeleteMessage(paramMessageId int)
Begin
	update messages
    set deleted_flag=1, updatedAt=now()
	where id=paramMessageId;
End //
DELIMITER ;

drop procedure if exists usp_DeleteOffer;
 
DELIMITER //
create procedure usp_DeleteOffer(paramOfferId int)
Begin
	update offers
    set deleted_flag=1, updatedAt=now()
	where id=paramOfferId;
End //
DELIMITER ;

drop procedure if exists usp_DeleteItem;
 
DELIMITER //
create procedure usp_DeleteItem(paramItemId int)
Begin
	
	update messages
	set deleted_flag=1, updatedAt=now()
	where ItemId=paramItemId;
    
    update offers
	set deleted_flag=1, updatedAt=now()
	where ItemId=paramItemId;
        
    update items
    set deleted_flag=1, updatedAt=now()
	where Id=paramItemId;
    
End //
DELIMITER ;

drop procedure if exists usp_DeleteUser;
 
DELIMITER //
create procedure usp_DeleteUser(paramUserId int)
Begin
	
	update messages
	set deleted_flag=1, updatedAt=now()
	where FromId=paramUserId or ToId=paramUserId;
    
    update offers o
    inner join (select o.Itemid from offers o
    inner join items i
    on o.ItemId=i.id
    where i.UserId=paramUserId) t
	on o.ItemId=t.ItemId
	set deleted_flag=1, updatedAt=now();
    
        
    update items
    set deleted_flag=1, updatedAt=now()
	where UserId=paramUserId;
    
    update users
    set deleted_flag=1, updatedAt=now()
	where id=paramUserId;
    
End //
DELIMITER ;

drop procedure if exists usp_PutUserVerificationCode;
 
DELIMITER //
create procedure usp_PutUserVerificationCode(paramUserId int)
Begin
update users
set verification_code= (select LPAD(FLOOR(RAND() * 999999.99), 6, '0')), updatedAt=now()
where id=paramUserId;

select verification_code from users
where id=paramUserId
and deleted_flag=0;
End //
DELIMITER ;

drop procedure if exists usp_PutResetPassword;

DELIMITER //
create procedure usp_PutResetPassword(paramEmail varchar(255), paramPassword varchar(255))
Begin

    Declare currentPassword varchar(255);
    Declare dbPassword varchar(255);
    Declare passwordChanged bit;
    
    set currentPassword=(select password from users where email=paramEmail and deleted_flag=0);
    
    
    set passwordChanged=case when paramPassword<>ifnull(currentPassword,'') then 1 else 0 end;
    
    if passwordChanged=1 then
		update users
		set password=paramPassword, updatedAt=now()
		where email=paramEmail;
		
        select 'success' as 'results';
     else
		select 'error: password has been used' as 'results';
	 end if;		
        
End //
DELIMITER ;

drop procedure if exists usp_PutChangePassword;
DELIMITER //
create procedure usp_PutChangePassword(paramUserId int, paramPassword varchar(255))
Begin

    Declare currentPassword varchar(255);
    Declare dbPassword varchar(255);
    Declare passwordChanged bit;
    
    set currentPassword=(select password from users where id=paramUserId and deleted_flag=0);
    
    
    set passwordChanged=case when paramPassword<>ifnull(currentPassword,'') then 1 else 0 end;
    
    if passwordChanged=1 then
		update users
		set password=paramPassword, updatedAt=now()
		where id=paramUserId;
		
        select 'success' as 'results';
     else
		select 'error: password has been used' as 'results';
	 end if;		
        
End //
DELIMITER ;
-- call usp_GetMyListings(1);
-- call usp_GetMyPurchases(1);
-- call usp_GetMyOffers(1);
-- call usp_GetSearchResults('iphone',null,null);
-- call usp_GetNewListings();
-- call usp_GetRandomListings;
-- call usp_GetItem(1);
-- call usp_PostItem(1, 'couch','10ft leather couch good condition','furniture',null,1,350,'flat per item',0);
-- call usp_PostOffer(1, 1,300,null);
-- call usp_PutOffer(1,300,null);
-- call usp_PutAcceptOffer(1);
-- call usp_PutEditItem(1, 'couch','10ft leather couch good condition','furniture',null,1,350,'flat per item',0);
-- call usp_PutBuyerConfirmSale(1);
-- call usp_PutSellerConfirmSale(1);
-- call usp_PutEditOffer(1, 1,325,null);
-- call usp_PutEditSellerRating(1,3);
-- call usp_PutEditUser(1,19,90803,123-456-7890,);
-- call usp_PutVerifyUser(1,12345);
-- call usp_PostMessage(1,1,2,'test');
-- call usp_PutMessageRead(1);
-- call usp_GetInbox(1);
--  call usp_DeleteMessage(1);
--  call usp_DeleteOffer(1);
--  call usp_DeleteItem(1);
--  call usp_DeleteUser(999);