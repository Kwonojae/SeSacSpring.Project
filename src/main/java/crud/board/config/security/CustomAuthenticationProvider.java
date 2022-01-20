package crud.board.config.security;


import crud.board.service.MemberService;
import crud.board.web.dto.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private MemberService memberService;

    @Override//Authentication  접근대상이 누구인지 인증   AuthenticationException :인증이 실패한경우
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Collection<? extends GrantedAuthority> authorities;
        String userId = authentication.getName();
        String userPwd = (String) authentication.getCredentials(); // getCredentials :사용자 인증에 이용하는 정보(일반적이라면 로그인 비밀번호)를 반환한다.

        if (userId == null || userPwd == null) {
            return authentication;
        }
        //Optional : null이 올수 있는 값을 감싸는 Wrapper클래스로, 참조하더라도 NPE가 발생하지 않도록 도와준다.
        Optional<Long> findId = memberService.findByAccountValidationCheck(userId); //아이디검색
        Long memberKey = findId.orElseThrow(() -> new IllegalArgumentException("아이디가 존재하지 않습니다."));

        Optional<Member> findMember = memberService.findOneValidation(new Member(userId, userPwd));
        Member member = findMember.orElseThrow(() -> new IllegalArgumentException("비밀번호가 틀렸습니다."));

        //TODO: 유저 권한 리스트 수정해야함
        //Role테이블에서 Select 이 유저랑 맞는 롤을 가져온다음에
        List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority("ROLE_USER"));
        authorities = list;

        return new UsernamePasswordAuthenticationToken(member, member.getMemberPwd(), authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}
