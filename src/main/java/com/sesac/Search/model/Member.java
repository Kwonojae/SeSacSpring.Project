package com.sesac.Search.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberkey;

    @NotNull
    @Size(min=5, max=10, message = "아이디는 5자 이상 10자 이하입니다")
    private String memberid;

    @NotNull
    @Size(min=5, max=10, message = "패스워드는 8자 이상 15자 이하입니다")
    private String memberpwd;

    @NotNull
    @Size(max=10, message = "닉네임은 10자 이하")
    private String membernickname;

    private String memberemail;

    @JsonIgnore//
    @ManyToMany//양방향 맵핑
    @JoinTable(
            name = "member_role",   //조인 테이블 명
            joinColumns = @JoinColumn(name = "member_key"),//현재 엔티티를 참조하는 외래키
            inverseJoinColumns = @JoinColumn(name = "role_key"))//반대방향 엔티티를 참조하는 외래키
    private List<Role> roles = new ArrayList<>();//roles컬럼이름이됨 기본값이 널이되게되면 불필요한 널포인터 가 자주 발생함

}
