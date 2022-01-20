package crud.board.service;


import crud.board.domain.repository.MemberRepository;
import crud.board.web.dto.Member;
import crud.board.web.dto.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service //비즈니스 로직이나 respository layer 호출하는 함수에 사용된다
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    public Optional<Long> findByAccountValidationCheck(String id) {//해당하는 아이디가 있는지 검색
        return memberRepository.findByAccountMember(id);
    }

    public Optional<Member> findOneValidation(Member member) {
        return memberRepository.findByMember(member);
    }

    public Member save(Member member){
        member.setEnabled(true);
        Role role = new Role();
        role.setRoleKey(1l);
        member.getRoles().add(role);

        return memberRepository.save(member);
    }
}
