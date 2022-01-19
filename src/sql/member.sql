

create table member( 		--유저 테이블
                       memberKey			bigint				not null 	auto_increment 		comment '유저 키',
                       memberId			varchar(50)			not null 	unique				comment '유저 아이디',
                       memberPwd			varchar(100)		not null						comment '유저 비번',
                       memberNickName		varchar(50)			not null	unique				comment '유저 이름',
                       memberEmail			varchar(200)		not null						comment '유저 이메일',
                       enabled 			bit 				not null,
                       primary key (memberKey)
);

drop table member;
drop table role;
drop table member_role;

create table role (		--권한 테이블
                      memberKey bigint(20) not null auto_increment,
                      id varchar(50) not null,
                      primary key(memberKey)
);

drop table role;

create table member_role (	--두개의 테이블을 연결하는 테이블
                             member_Key bigint(20),
                             role_Key bigint(20),
                             primary key(member_Key,role_Key),
                             foreign key(member_Key) references member(memberKey),
                             foreign key(role_Key) references role(memberKey)
);

select * from member;

insert into member(

    member_id,
    member_pwd,
    member_nickname,
    member_email,
    enabled
)values('12345', '12345', 'NickName10', 'Email10', true);

insert into role(
    id
)value('ROLE_USER');

select * from role;


select * from member;

drop table member;




commit;