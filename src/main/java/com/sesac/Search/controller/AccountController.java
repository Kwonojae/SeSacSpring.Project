package com.sesac.Search.controller;

import com.sesac.Search.model.Member;
import com.sesac.Search.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/account/*")
public class AccountController {

    @Autowired
    private MemberService memberService;

//    @Autowired
//    private MemberRepository memberRepository;


    @GetMapping("login")
     public String login(){
        return "account/login";
    }

    @GetMapping("register")
    public String register(){
        return "account/register";
    }
    @PostMapping("register")
    public String register(Member member){
        memberService.save(member);
        return "redirect:/"; //로그인이 완료되면 홈으로 이동
    }
//    @GetMapping( "/register")       //전체 회원 조회
//    public List<Member> all() {
//        return memberRepository.findAll();
//    }
}
