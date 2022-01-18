package com.sesac.Search.service;

import com.sesac.Search.model.Member;
import com.sesac.Search.model.Role;
import com.sesac.Search.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service //비즈니스 로직이나 respository layer 호출하는 함수에 사용된다
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;



    public Member save(Member member){
        member.setMemberid(member.getMemberid());
        member.setMemberpwd(member.getMemberpwd());
        member.setMembernickname(member.getMembernickname());
        member.setMemberemail(member.getMemberemail());
        Role role = new Role();
        role.setMemberkey(1l);
        member.getRoles().add(role);
        return memberRepository.save(member);
    }
}
