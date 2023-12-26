USE modu_chat;

# member 테이블의 전체(*) 데이터 조회
SELECT * FROM member;

# CREATE DATA - 데이터 등록 / IINSERT 구문
# INSERT INTO member(컬럼1, 컬럼2ㅡ ,,,) VALUES(V1, V2);
INSERT INTO member(email, member_password, name, profile_img_path, telephone, entry_type_code, use_state_code, birth_data, reg_date, reg_member_id)
VALUES('test1@test.co.kr', '1234', '이효원', '', '010-1234-5678', 1, 1, '971206', now(), 1);

INSERT INTO member(email, member_password, name, profile_img_path, telephone, entry_type_code, use_state_code, birth_data, reg_date, reg_member_id)
VALUES('test2@test.co.kr', '1234', 'Juan', '', '010-1234-5278', 1, 1, '860512', now(), 1);

INSERT INTO member(email, member_password, name, profile_img_path, telephone, entry_type_code, use_state_code, birth_data, reg_date, reg_member_id)
VALUES('test3@test.co.kr', '1234', 'Carlos', '', '010-1234-5623', 1, 1, '581214', now(), 1);
# READ DATA - 데이터 조회/SELECT 구문

# READ DATA - 데이터 저회 / SELECT 구문
SELECT * FROM member;
SELECT * FROM member WHERE email='test1@test.co.kr';
SELECT * FROM member WHERE entry_type_code=1 and name='이효원';
SELECT * FROM member WHERE entry_type_code=1 or use_state_code=0;
SELECT member_id, email, name, telephone FROM member WHERE member_id >=3;
select * from member where name in('Juan','Carlos');
select * from member where name like '%이%'; # 패턴매칭
SELECT * FROM member order by member_id desc;
SELECT * FROM member order by member_id asc;

# UPDATE DATA - 데이터 수정 
update member set name = '이효원0', profile_img_path='http://naver.com/images/test.png' where member_id=1;
update member set use_state_code = 0 where member_id < 2;

# DELETE DATA - 삭제
delete from member where member_id=2;
SELECT * FROM member;
INSERT INTO member(email, member_password, name, profile_img_path, telephone, entry_type_code, use_state_code, birth_data, reg_date, reg_member_id)
VALUES('test4@test.co.kr', '1234', 'Juan4', '', '010-1234-5228', 1, 1, '810512', now(), 1);