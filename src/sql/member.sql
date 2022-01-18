create table member( --유저 테이블
                       memberKey	int			not nuoll auto_increment 		comment '유저 키',
                       memberId	varchar(50)		not null unique			comment '유저 아이디',
                       memberPwd	varchar(20)		not null				comment '유저 비번',
                       memberNickName		varchar(50)	not null	unique			comment '유저 이름',
                       memberEmail		varchar(100)	not null				comment '유저 이메일',
                       memberDate		datetime		not null				comment '가입 일시'
                           primary key (memberKey)
);

create table role (		--권한 테이블
                               id bigint(20) not null auto_increment,
                           name varchar(50) not null,
                           primary key(id)
);

create table user_role (	--두개의 테이블을 연결하는 테이블
                                user_id bigint(20),
                            role_id bigint(20),
                            primary key(user_id,role_id),
                            foreign key(user_id) references user(id),
                            foreign key(role_id) references role(id)
);

insert into role(		--테스트 권한 하나 생성
	name
)value('ROLE_USER');

