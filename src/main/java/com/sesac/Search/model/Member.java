package com.sesac.Search.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.authentication.AbstractAuthenticationToken;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "member")
public class Member {

    public Member() {
    }

    public Member(String memberId, String memberPwd) {
        this.memberId = memberId;
        this.memberPwd = memberPwd;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberKey;

    @NotNull
    @Size(min=5, max=10, message = "아이디는 5자 이상 10자 이하입니다")
    private String memberId;

    @NotNull
    @Size(min=5, max=10, message = "패스워드는 5자 이상 10자 이하입니다")
    private String memberPwd;

    @NotNull
    @Size(max=10, message = "닉네임은 10자 이하")
    private String memberNickname;

    private String memberEmail;
    private boolean enabled;

    @JsonIgnore//
    @ManyToMany//양방향 맵핑
    @JoinTable(
            name = "member_role",   //조인 테이블 명
            joinColumns = @JoinColumn(name = "member_key"),//현재 엔티티를 참조하는 외래키
            inverseJoinColumns = @JoinColumn(name = "role_key"))//반대방향 엔티티를 참조하는 외래키
    private List<Role> roles = new ArrayList<>();//roles컬럼이름이됨 기본값이 널이되게되면 불필요한 널포인터 가 자주 발생함
}
